import React from 'react'
import {
  Text,
  ImageBackground,
  View,
  StatusBar,
  ScrollView,
  Image,
  TouchableHighlight,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
} from 'react-native'
import RNIap, {
  purchaseErrorListener,
  purchaseUpdatedListener,
  type ProductPurchase,
  type PurchaseError,
} from 'react-native-iap'
import Button from '../components/Button'
import {connect} from 'react-redux'
import {withFitquestService} from '../components/hoc'
import DeviceInfo from 'react-native-device-info'
import {profileLoaded, subscriptionLoaded} from '../store/actions'

import LicenseModal from '../components/Purchase/LicenseModal'

import styles from './style'

class PurchaseScreen extends React.Component {
  state = {
    selectedTariff: Platform.select({
      ios: 'FitQuest_Subscription_1_Month',
      android: 'subscription_1_month',
    }),
    tariffs: {},
    isButtonDisabled: true,
    activeModal: null,
  }

  constructor(props) {
    super(props)
    this.action = this.props.navigation.getParam('action', 'registration')
  }
  componentDidMount() {
    const {fitquestService} = this.props
    this.purchaseUpdateSubscription = purchaseUpdatedListener(
      (purchase: InAppPurchase | SubscriptionPurchase | ProductPurchase) => {
        const receipt = purchase.transactionReceipt
        if (receipt) {
          this.props.subscriptionLoaded(true)
          this.setState({isButtonDisabled: false})
          this.closePurchaseWindow()
        } else {
                 errorManager(
                   'Else во время покупки подписки',
                 )
               }
      },
    )

    this.purchaseErrorSubscription = purchaseErrorListener(
      (error: PurchaseError) => {
        this.setState({isButtonDisabled: false})
      },
    )

    const data = this.props.tariffs.tariffs
    if (!data) {
      return
    }
    let tariffs = {}
    data.forEach(element => {
      tariffs[element.productId] = element.price
    })
    this.setState({
      tariffs: tariffs,
      isButtonDisabled: false,
    })
  }

  componentWillUnmount() {
    if (this.purchaseUpdateSubscription) {
      this.purchaseUpdateSubscription.remove()
      this.purchaseUpdateSubscription = null
    }
    if (this.purchaseErrorSubscription) {
      this.purchaseErrorSubscription.remove()
      this.purchaseErrorSubscription = null
    }
  }

  setActiveModal = activeModal => {
    this.setState({
      activeModal: activeModal,
    })
  }

  closePurchaseWindow = () => {
    const {navigation, credentials} = this.props
    if (this.state.isButtonDisabled) {
      return
    }
    
    if (this.action === 'training') {
      navigation.navigate('App')
    } else {
      navigation.navigate('AllSet')
    }
  }

  selectTariff = value => {
    this.setState({
      selectedTariff: value,
    })
  }

  requestPurchase = selectedTariff => {
    this.setState({isButtonDisabled: true})
    this.props.fitquestService.purchaseManager.requestSubscription(
      selectedTariff,
    )
  }

  restoreSubscription = async () => {
    this.setState({isButtonDisabled: true})
    const {fitquestService} = this.props
    DeviceInfo.isEmulator()
      .then(isEmulator => {
        if (isEmulator) {
          this.props.subscriptionLoaded(true)
          this.setState({isButtonDisabled: false})
          this.closePurchaseWindow()
        } else {
          fitquestService.purchaseManager.checkSubscription().then(result => {
            if (result) {
              this.props.subscriptionLoaded(true)
              this.setState({isButtonDisabled: false})
              this.closePurchaseWindow()
            } else {
              this.setState({isButtonDisabled: false})
            }
          })
        }
      })
      .catch(error => {
                        errorManager(error)
                      })
  }

  render() {
    const {fitquestService, navigation} = this.props
    const {selectedTariff, isButtonDisabled, tariffs} = this.state
    const {profile, credentials} = this.props
    const sex = profile.profile.sex
    const bgImage =
      sex === 'm'
        ? require('../components/images/start1.png')
        : require('../components/images/start1.png')
    const mainText =
      sex === 'm'
        ? 'Сформируй привычку, стань сильным и мускулистым за 28 дней!'
        : 'Сформируй привычку, стань стройной и подтянутой за 28 дней!'
    return (
      <View style={[styles.base]}>
        <ScrollView>
          <StatusBar barStyle="light-content" />
          <ImageBackground source={bgImage} style={[styles.saleimg]}>
            <TouchableOpacity onPress={this.closePurchaseWindow}>
              <View
                style={{
                  height: 30,
                  width: 30,
                  marginLeft: 20,
                  marginTop: 30,
                  padding: 5,
                }}>
                <Image
                  style={{flex: 1, opacity: 0.2, width: 20, height: 20}}
                  source={require('../components/images/cancel.png')}
                />
              </View>
            </TouchableOpacity>
          </ImageBackground>
          <View
            style={{paddingHorizontal: 20, paddingTop: 30, paddingBottom: 10}}>
            <Text
              style={{textAlign: 'center', fontSize: 20, fontWeight: '600'}}>
              {mainText}
            </Text>
          </View>
          <View style={[styles.prise_items]}>
            <Price
              tariff={Platform.select({
                ios: 'FitQuest_Subscription_1_Month',
                android: 'subscription_1_month',
              })}
              selectedTariff={selectedTariff}
              onPress={this.selectTariff}
              day="30"
              price={
                tariffs[
                  Platform.select({
                    ios: 'FitQuest_Subscription_1_Month',
                    android: 'subscription_1_month',
                  })
                ]
              }
              period="1 месяц"
              style={[styles.price_item, styles.price_item_active]}
            />
            <Price
              tariff={Platform.select({
                ios: 'FitQuest_Subscription_3_Month',
                android: 'subscription_3_month',
              })}
              selectedTariff={selectedTariff}
              onPress={this.selectTariff}
              day="90"
              price={
                tariffs[
                  Platform.select({
                    ios: 'FitQuest_Subscription_3_Month',
                    android: 'subscription_3_month',
                  })
                ]
              }
              period="3 месяца"
              style={[styles.price_item]}
            />
            <Price
              tariff={Platform.select({
                ios: 'FitQuest_Subscription_1_Year',
                android: 'subscription_1_year',
              })}
              selectedTariff={selectedTariff}
              onPress={this.selectTariff}
              day="365"
              price={
                tariffs[
                  Platform.select({
                    ios: 'FitQuest_Subscription_1_Year',
                    android: 'subscription_1_year',
                  })
                ]
              }
              period="год"
              style={[styles.price_item]}
            />
          </View>
          <View
            style={{paddingHorizontal: 20, paddingBottom: 20, paddingTop: 20}}>
            <Button
              text={'Продолжить'}
              elem={
                isButtonDisabled ? (
                  <ActivityIndicator color="#fff" style={{marginRight: 10}} />
                ) : null
              }
              theme="success"
              disabled={isButtonDisabled}
              onPress={() => this.requestPurchase(selectedTariff)}
            />
          </View>
          <View style={{}}>
            {!isButtonDisabled && (
              <Button
                text={'Восстановить покупки'}
                theme="inline"
                onPress={() => this.restoreSubscription()}
              />
            )}
          </View>
          <View style={{padding: 20, alignItems: 'center'}}>
            <Text style={{textAlign: 'center', color: '#747E9D'}}>
              Совершая покупку, вы соглашаетесь с{' '}
              <Text
                style={{textDecorationLine: 'underline'}}
                onPress={() => this.setActiveModal('privacy')}>
                Политикой конфиденциальности
              </Text>
              ,{' '}
              <Text
                style={{textDecorationLine: 'underline'}}
                onPress={() => this.setActiveModal('rules')}>
                Правилами сервиса
              </Text>{' '}
              и{' '}
              <Text
                style={{textDecorationLine: 'underline'}}
                onPress={() => this.setActiveModal('terms')}>
                Условиями приобретения
              </Text>
            </Text>
          </View>
        </ScrollView>
        <LicenseModal
          activeModal={this.state.activeModal}
          setActiveModal={this.setActiveModal}
        />
      </View>
    )
  }
}

const mapStateToProps = state => {
  return {
    credentials: state.credentials,
    profile: state.profile,
    subscription: state.subscription,
    tariffs: state.tariffs,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    profileLoaded: profile => {
      dispatch(profileLoaded(profile))
    },
    subscriptionLoaded: subscription => {
      dispatch(subscriptionLoaded(subscription))
    },
  }
}

export default withFitquestService()(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(PurchaseScreen),
)

const Price = ({day, period, price, onPress, tariff, selectedTariff}) => {
  const style = tariff === selectedTariff ? [styles.price_item, styles.price_item_active,] : [styles.price_item,]
  return (
    <TouchableOpacity onPress={() => onPress(tariff)}>
      <View style={style}>
        {tariff === 'FitQuest_Subscription_1_Year' && (
          <View
            style={{
              height: 30,
              backgroundColor: '#FFBA00',
              top: -15,
              width: '90%',
              borderRadius: 5,
              justifyContent: 'center',
              position: 'absolute',
            }}>
            <Text
              style={{
                textAlign: 'center',
                color: '#fff',
                fontSize: 10,
                fontWeight: '600',
              }}>
              Скидка 60%
            </Text>
          </View>
        )}

        <View style={[styles.price_box]}>
          <Text style={[styles.price_text]}>{day}</Text>
          <Text style={[styles.white]}>дней</Text>
        </View>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            paddingBottom: 10,
          }}>
          <Text
            style={[styles.p14, styles.fw500, styles.white, styles.price_op]}>
            {price} ₽
          </Text>
          <Text style={[styles.p10, styles.white, styles.price_op]}>
            {period}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

// onPress={() => fitquestService.purchaseManager.requestPurchase('FitQuest_Subscription_1_Month')}