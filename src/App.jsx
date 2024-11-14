import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import Header from "./components/Header";
import Body from "./components/Body";
import Error from "./components/Error";
import RestaurantMenu from "./components/RestaurantMenu";
import Cart from "./components/Cart";
import Alert from './components/Alert.jsx';
// import Alert1 from './components/Alert1.jsx';
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
            <Route path="/Error" element={<Error />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
};

export default App;
