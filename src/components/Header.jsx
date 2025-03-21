import LOGO_URL from "../assets/image-logo.jpeg";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import { useState, useContext } from "react";
import { CartContext } from "../utils/cartLength";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { FaHome, FaShoppingCart } from 'react-icons/fa';
import logout from '../assets/logout.png'
import login from '../assets/login.png'

const Header = ({ showAlert }) => {
  const cartcontext = useContext(CartContext);
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  // Check if the user is logged in based on the presence of authtoken
  const isLoggedIn = Boolean(localStorage.getItem("authtoken"));

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dismissButton = document.querySelector(
      '#loginModal .btn-close[data-bs-dismiss="modal"]'
    );
    dismissButton.click();
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const token = await response.json();
      localStorage.setItem("authtoken", token.authtoken);
      showAlert(token.message, "success");

      navigate("/");
    } else {
      const data = await response.json();

      showAlert(data.error, "info");
    }
  };

  const handleLogout = () => {
    // Show confirmation dialog
    const isConfirmed = window.confirm("Are you sure you want to log out?");
    cartcontext.setCount(0);
    if (isConfirmed) {
      // Proceed with logout if user confirms
      localStorage.removeItem("authtoken");
      showAlert("Logged out successfully", "success");
      navigate("/"); // Redirect to home page or login page after logout
    } else {
      // If user cancels, do nothing
      showAlert("Logout cancelled", "warning");
    }
  };

  return (
    <div>
      <div className="flex justify-between bg-slate-100 h-[100px] z-1 shadow-xl shadow-slate-300">
        <div className="flex w-32 h-32 justify-between">
          <img
            className="object-cover object-center w-24 h-20 m-4 rounded-[50%] shadow-xl hover:scale-110 transition ease-in-out duration-300 transform"
            style={{ position: "relative", bottom: "0.9rem" }}
            src={LOGO_URL}
            alt="logo"
          />
          <Link to="/">
            <h2
              className="px-4 py-12 text-slate-500 text-xl font-poppins font-bold hover:scale-110 transition ease-in-out duration-300 transform cursor-pointer"
              style={{ position: "relative", bottom: "7px" }}
            >
              zwigato.com
            </h2>
          </Link>
        </div>

        <div className="items-center">
          <ul
            className="flex justify-between py-12 items-center"
            style={{ position: "relative", bottom: "1rem" }}
          >
            <li className="px-4 p-2">{useOnlineStatus() ? "🟢" : "🔴"}</li>
            <li className="position-relative start-6 font-bold px-3 p-2 font-poppins text-xl rounded-xl  hover:text-blue-900 transition ease-in-out duration-300 transform">
              <Link to="/">
                {" "}
                <FaHome className="me-4" size={40} />
                {" "}
              </Link>
            </li>

            <li className="font-bold px-4 p-2 font-poppins text-xl rounded-xl transition ease-in-out duration-300 transform">
              {!isLoggedIn ? (
                <button
                  type="button"
                  className="cursor-not-allowed opacity-50"
                  style={{ marginRight: "" }}
                  onClick={() => {
                    // Log the alert message to check if it's being called
                    console.log("Please login to access the cart");
                    showAlert("Please login to access the cart", "warning");
                  }}
                >
                  <FaShoppingCart className="me-4" size={40} style={{position:"relative",top:"3px"}} />
                  
                  <span className="position-absolute top-3 end-6 translate-middle badge rounded-pill bg-warning">
                    {cartcontext.count}
                  </span>
                </button>
              ) : (
                <Link to="/cart">
                  <FaShoppingCart className="me-4" size={40} style={{position:"relative",top:"3px"}} />
                 
                  <span className="position-absolute top-3 end-6 translate-middle badge rounded-pill bg-warning">
                    {cartcontext.count}
                  </span>
                </Link>
              )}
            </li>
            {/* Login or Logout Button */}
            <li>
              {!isLoggedIn ? (
                <>
                  <div
                    data-bs-toggle="modal"
                    data-bs-target="#loginModal"
                    style={{
                      textAlign: "center",
                      position: "relative",
                      top: "-0.3rem",
                      right: "1rem",
                      color: "#06395a",
                      fontWeight: "bold",
                    }}
                  >
                    <img src={login} alt="login" className="mt-2 h-10" title="login" />
                
                  </div>

                  {/* Login Modal */}
                  <div
                    className="modal fade"
                    id="loginModal"
                    tabIndex="-1"
                    aria-labelledby="loginModalLabel"
                    aria-hidden="true"
                  >
                    <div className="modal-dialog">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h1 className="modal-title fs-5 " id="loginModalLabel">
                            Login
                          </h1>
                          <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                          ></button>
                        </div>
                        <form onSubmit={handleSubmit}>
                          <div className="modal-body">
                            <div className="mb-3">
                              <label htmlFor="email" className="form-label">
                                Email address
                              </label>
                              <input
                                type="email"
                                className="form-control"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                              />
                            </div>
                            <div className="mb-3">
                              <label htmlFor="password" className="form-label">
                                Password
                              </label>
                              <input
                                type="password"
                                className="form-control"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                              />
                            </div>
                          </div>
                          <div className="modal-footer">
                            <Link to="/signup" data-bs-dismiss="modal">
                              <button
                                data-bs-dismiss="modal"
                                style={{
                                  position: "relative",
                                  left: "-8rem",
                                  textDecoration: "underline",
                                  color: "blue",
                                }}
                              >
                                Don`t have a account Signup
                              </button>
                            </Link>

                            <button
                              type="button"
                              className="btn btn-secondary"
                              data-bs-dismiss="modal"
                            >
                              Close
                            </button>
                            <button type="submit" className="btn btn-primary">
                              Login
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div
                  onClick={handleLogout}
                  style={{
                    textAlign: "center",
                    position: "relative",
                    top: "-0.3rem",
                    right: "1rem",
                    color: "#06395a",
                    fontWeight: "bold",
                  }}
                >
                  
         <img src={logout} className="mt-2"title="logout" alt="logout image" />
                </div>
              )}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

Header.propTypes = {
  showAlert: PropTypes.func.isRequired,
};
export default Header;
