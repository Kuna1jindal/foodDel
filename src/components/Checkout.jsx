import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const Checkout = () => {
  const [payment, setPayment] = useState("");
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState({});
  const [order, setOrderData] = useState([]);
  const [amount, setTotalPrice] = useState(0);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handlePaymentChange = (e) => {
    setPayment(e.target.value);
  };

  const calculateTotal = (cartItems) => {
    const total = cartItems.reduce(
      (acc, item) => acc + (item.price / 100) * item.qty,
      0
    );
    setTotalPrice(total);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/auth/getuser", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authtoken: localStorage.getItem("authtoken"),
          },
        });

        if (!response.ok) throw new Error("Failed to fetch user data");

        const data = await response.json();
        setUserData(data);
      } catch (err) {
        console.error(err);
        navigate("/Error");
      }
    };

    const fetchCartData = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/services/showcart",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              authtoken: localStorage.getItem("authtoken"),
            },
          }
        );

        if (!response.ok) throw new Error("Failed to fetch cart data");

        const data = await response.json();
        setOrderData(data);
        calculateTotal(data);
      } catch (err) {
        setError("Failed to load cart items");
        console.error(err);
      }
    };

    fetchUserData();
    fetchCartData();
  }, [navigate]);

  const handlePayment = async() => {
    if (payment !== "UPI") {
      navigate("/confirm");
      return;
    }

    setLoading(true);

    const url = "http://localhost:5000/api/payment/order";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: userData.name,
        mobile: userData.phone,
        amount: amount,
        MUId: `Mws${Date.now()}`,
        transactionId: "Tes"+Date.now(),
      }),
    };

    axios(url, options)
      .then((response) => {
        if (!response.ok) throw new Error("Payment failed");
        return response.json();
      })
      .then((data) => {
        if(data.data && data.data.instrumentResponse.
          redirectInfo.url){
            window.location.href=data.data.instrumentResponse.redirectInfo.url;
          }
        console.log("Payment successful:", data);
      })
      .catch((error) => {
        console.error("Payment error:", error);
        setError("Payment failed. Please try again.");
      })
      .finally(() => setLoading(false));
  };

  if (error) {
    return (
      <div className="container text-center">
        <h2 className="text-danger">Error: {error}</h2>
      </div>
    );
  }

  return (
    <div className="container">
      <h1 className="text-center text-success my-4" style={{fontSize:"3rem"}}>
        <strong>Checkout</strong>
      </h1>

      <div className="row">
        <div className="col-md-7">
          {/* Address Section */}
          <div className="card mb-4">
            <div className="card-header">Address</div>
            <div className="card-body">
              {userData.hno && (
                <>
                  <div>
                    {userData.hno}, {userData.street}
                  </div>
                  <div>
                    {userData.area}, {userData.city}
                  </div>
                  <div>
                    {userData.state}, ({userData.pincode})
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Payment Section */}
          <div className="card">
            <div className="card-header">Select a payment method</div>
            <div className="card-body">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="paymentMethod"
                  value="Cash on delivery"
                  id="cashOnDelivery"
                  onChange={handlePaymentChange}
                />
                <label className="form-check-label" htmlFor="cashOnDelivery">
                  Cash on delivery
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="paymentMethod"
                  id="upi"
                  value="UPI"
                  onChange={handlePaymentChange}
                />
                <label className="form-check-label" htmlFor="upi">
                  Online
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-5">
          {/* Order Summary Section */}
          <div className="card">
            <div className="card-header">Order Summary</div>
            <div className="card-body">
              {order.map((ord) => (
                <div
                  key={ord._id}
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div>{ord.name}</div>
                  <div>{`${ord.price / 100}.00`}</div>
                </div>
              ))}
              <hr />
              <div className="text-end">
                <h5>Total: ₹{amount.toFixed(2)}</h5>
              </div>
              <button
                className="btn btn-primary w-100"
                onClick={handlePayment}
                disabled={loading || !payment}
              >
                {loading ? "Processing..." : "Proceed to Pay"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
