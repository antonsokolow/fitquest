import React from 'react'
import hoistNonReactStatic from 'hoist-non-react-statics'
import {FitquestServiceConsumer} from '../fitquest-service-contex'

const withFitquestService = () => Wrapped => {
  class Enhance extends React.Component {
    render() {
      return (
        <FitquestServiceConsumer>
          {fitquestService => {
            return <Wrapped {...this.props} fitquestService={fitquestService} />
          }}
        </FitquestServiceConsumer>
      )
    }
  }
  hoistNonReactStatic(Enhance, Wrapped)
  return Enhance
}

export default withFitquestService
