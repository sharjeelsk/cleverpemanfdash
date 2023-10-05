import './App.scss';
import {Switch,Route}  from 'react-router-dom'
import Home from "./components/Home"
import VerifyOtp from './components/Auth/VerifyOtp'
import SignIn from './components/Auth/SignIn'
import Merchants from './components/Merchants/Merchants';
import SignUp from './components/Auth/SignUp';
import Schemes from './components/Schemes/Schemes';
import SchemesApproval from './components/SchemesApproval/SchemesApproval';
import CompletedOrders from './components/Orders/CompletedOrders';
import Products from './components/Products/Products';
import ProductDetail from './components/Products/ProductDetail';


function App() {
  return (
    <Switch>
      <Route exact path="/" component={SignIn} />
      <Route path="/signup" component={SignUp} />
      <Route path="/dashboard" component={Home} />
      <Route path="/signin" component={SignIn} />
      <Route path="/verifyotp" component={VerifyOtp} />
      <Route path="/merchants" component={Merchants} />
      <Route path="/schemes" component={Schemes} />
      <Route path="/schemesapproval" component={SchemesApproval} />
      <Route path="/completedorders" component={CompletedOrders} />
      <Route path="/products" component={Products} />
      <Route path="/productdetail" component={ProductDetail} />

    </Switch>
  );
}

export default App;
