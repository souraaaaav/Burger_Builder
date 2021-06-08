import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
import Checkout from './containers/Checkout/Checkout'
import { Route, Switch } from 'react-router-dom'
import Orders from './containers/Orders/Orders'
import ContactData from './containers/Checkout/ContactData/ContactData'

class App extends Component {

  render() {
 
    return (
      <div className="App">
        <Layout>
          <Switch>
            <Route path="/checkout/contact-data" component={ContactData} />
            <Route path="/checkout" component={Checkout} />
            <Route path="/orders" component={Orders} />
            <Route path="/" component={BurgerBuilder} />
          </Switch>
        </Layout>
      </div>
    );
  }
}
export default App;
