import "../utils/OrderConfirmation.css";

const OrderConfirmation = () => {
  return (
    <div className="confirmation-container">
      <div className="tick-container">
        <div className="tick"></div>
      </div>
      <h1 className="confirmation-message">Your Order Has Been Confirmed!</h1>
      <p className="sub-message">Thank you for ordering with us. Your delicious food is on its way!</p>
    </div>
  );
};

export default OrderConfirmation;
