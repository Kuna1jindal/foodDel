import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import { Provider } from "react-redux";
import Orders from './components/Orders.jsx'
import appStore from "./utils/appStore";
import Header from "./components/Header";
import Signup from "./components/Signup.jsx";
import Body from "./components/Body";
import Error from "./components/Error";
import Checkout from "./components/Checkout.jsx";
import RestaurantMenu from "./components/RestaurantMenu";
import Cart from "./components/Cart";
import OrderConfirmation from "./components/Confirmation.jsx";
import Alert from './components/Alert.jsx';
import { useState } from "react";
const App = () => {
  const [alert, setAlert] = useState(null);

let showAlert = (message, type) => {
  setAlert({ message: message, type: type });
  setTimeout(() => {
    setAlert(null);
  }, 2000);
};
  return (
    <Provider store={appStore}>
      <Router>
        <div className="App">
       
          <Header showAlert={showAlert}/>
          <Alert alert={alert} showAlert={showAlert} />
          <Routes>
            <Route path="/" element={<Body  showAlert={showAlert}/>} />
            <Route path="/cart" element={<Cart  showAlert={showAlert}/>} />
           
            <Route path="/restaurants/:resId" element={<RestaurantMenu showAlert={showAlert}/>} />
            <Route path="/error" element={<Error />} />
            <Route path="/confirm" element={<OrderConfirmation />} />
            <Route path='/checkout' element={<Checkout/>}></Route>
            <Route path='/yourorders' element={<Orders/>}></Route>
            <Route path='/signup' element={<Signup showAlert={showAlert} /> }></Route>
          </Routes>
        </div>
      </Router>
    </Provider>
  );
};

export default App;
