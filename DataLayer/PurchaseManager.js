import {Platform} from 'react-native'
import {ITUNES_CONNECT_SHARED_SECRET} from 'react-native-dotenv'
import RNIap, {
  purchaseErrorListener,
  purchaseUpdatedListener,
  type ProductPurchase,
  type PurchaseError,
} from 'react-native-iap'

class PurchaseManager {
  itemSkus = Platform.select({
    ios: [
      'FitQuest_Subscription_1_Year',
      'FitQuest_Subscription_1_Month',
      'FitQuest_Subscription_3_Month',
    ],
    android: [
      'subscription_1_year',
      'subscription_1_month',
      'subscription_3_month',
    ],
  })

  deliverInAppPurchase = transactionReceipt => {
    return new Promise((resolve, reject) => {
      resolve(true)
    })
  }

  requestPurchase = async (sku: string) => {
    try {
      await RNIap.requestPurchase(sku, false)
    } catch (err) {
      console.warn(err.code, err.message)
    }
  }

  requestSubscription = async (sku: string) => {
    try {
      await RNIap.requestSubscription(sku, false)
    } catch (err) {
      console.warn(err.code, err.message)
    }
  }

  getProducts = async () => {
    const products = await RNIap.getProducts(this.itemSkus)
    return products
  }

  getSubs = async () => {
    const products = await RNIap.getSubscriptions(this.itemSkus)
    return products
  }

  checkSubscription = async () => {
    if (Platform.OS === 'ios') {
      try {
        const purchases = await RNIap.getAvailablePurchases()
        const sortedPurchases = purchases.sort(
          (a, b) => b.transactionDate - a.transactionDate,
        )
        const latestAvailableReceipt = sortedPurchases[0].transactionReceipt
        const isTestEnvironment = __DEV__
        const decodedReceipt = await RNIap.validateReceiptIos(
          {
            'receipt-data': latestAvailableReceipt,
            password: ITUNES_CONNECT_SHARED_SECRET,
          },
          isTestEnvironment,
        )

        const {latest_receipt_info: latestReceiptInfo} = decodedReceipt
        const isSubValid = !!latestReceiptInfo.find(receipt => {
          const expirationInMilliseconds = Number(receipt.expires_date_ms)
          const nowInMilliseconds = Date.now()
          return expirationInMilliseconds > nowInMilliseconds
        })
        return isSubValid
      } catch (err) {
        console.warn(err)
      }
    }
    if (Platform.OS === 'android') {
      // When an active subscription expires, it does not show up in
      // available purchases anymore, therefore we can use the length
      // of the availablePurchases array to determine whether or not
      // they have an active subscription.
      const availablePurchases = await RNIap.getAvailablePurchases()

      for (let i = 0; i < availablePurchases.length; i++) {
        if (this.itemSkus.includes(availablePurchases[i].productId)) {
          return true
        }
      }
      return false
    }
  }

  getPurchases = async () => {
    try {
      const purchases = await RNIap.getAvailablePurchases()
      const sortedPurchases = purchases.sort(
        (a, b) => b.transactionDate - a.transactionDate,
      )
      const latestAvailableReceipt = sortedPurchases[0].transactionReceipt
      const isTestEnvironment = __DEV__
      const decodedReceipt = await RNIap.validateReceiptIos(
        {
          'receipt-data': latestAvailableReceipt,
          password: ITUNES_CONNECT_SHARED_SECRET,
        },
        isTestEnvironment,
      )

      const {latest_receipt_info: latestReceiptInfo} = decodedReceipt
      const isSubValid = !!latestReceiptInfo.find(receipt => {
        const expirationInMilliseconds = Number(receipt.expires_date_ms)
        const nowInMilliseconds = Date.now()
        return expirationInMilliseconds > nowInMilliseconds
      })
      return isSubValid

    } catch (err) {
      console.warn(err)
    }
  }

  getSubscriptions = async () => {
    try {
      const subscriptions = await RNIap.getSubscriptions(this.itemSkus)
      const newState = {subscription: null}
      let restoredTitles = []

      subscriptions.forEach(subscription => {
        const t = new Date(subscription.transactionDate)

        switch (subscription.productId) {
          case 'FitQuest_Subscription_1_Year':
            newState.subscription = 'FitQuest_Subscription_1_Year'
            restoredTitles.push('FitQuest_Subscription_1_Year')
            break

          case 'FitQuest_Subscription_3_Month':
            newState.subscription = 'FitQuest_Subscription_3_Month'
            restoredTitles.push('FitQuest_Subscription_3_Month')
            break

          case 'FitQuest_Subscription_1_Month':
            newState.subscription = 'FitQuest_Subscription_1_Month'
            restoredTitles.push('FitQuest_Subscription_1_Month')
            break
        }
      })

    } catch (err) {
      console.warn(err)
    }
  }

  purchaseUpdateSubscription = purchaseUpdatedListener(
    (purchase: InAppPurchase | SubscriptionPurchase | ProductPurchase) => {
      const receipt = purchase.transactionReceipt
      if (receipt) {
        this.deliverInAppPurchase(receipt).then(deliveryResult => {
          if (deliveryResult) {
            try {
              RNIap.finishTransaction(purchase)
            } catch (error) {
            }
          } else {
            // Retry / conclude the purchase is fraudulent, etc...
          }
        })
      }
    },
  )
}

export default PurchaseManager
