import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const Signup = ({ showAlert }) => {
  const [loading,setLoading]=useState(false);
  const [user, setUser] = useState({
    name: "",
    hno: "",
    password: "",
    state: "",
    city: "",
    pincode: "",
    street: "",
    email: "",
    phone: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    setLoading(true);
    event.preventDefault(); // Prevent form reload
    if (
      !user.city ||
      !user.email ||
      !user.hno ||
      !user.name ||
      !user.password ||
      !user.phone ||
      !user.pincode ||
      !user.state ||
      !user.street
    ) {
      return showAlert(`Fields can't be empty!`, "warning");
    }
    console.log(user);
    const response = await fetch("http://localhost:5000/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    if (response.ok) {
      const data = await response.json();
      setTimeout(()=>{
        setLoading(false);
        navigate("/");
        showAlert(data.message, "success");
      },2000);
    } else {
      const data = await response.json();
      showAlert(data.error, "danger");
    }
  };

  return (
    <>
      <div className="container-sm">
        <h1
          style={{
            fontWeight: "bold",
            fontSize: "3rem",
            margin: "2rem",
            textAlign: "center",
          }}
        >
          Signup
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              Name
            </span>
            <input
              type="text"
              onChange={(e) => setUser({ ...user, name: e.target.value })}
              className="form-control"
              placeholder="Username"
              aria-label="Username"
              aria-describedby="basic-addon1"
              required
            />
          </div>

          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Recipient's username"
              aria-label="Recipient's username"
              aria-describedby="basic-addon2"
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              required
            />
            <span className="input-group-text" id="basic-addon2">
              @gmail.com
            </span>
          </div>

          <div className="input-group mb-3">
            <input
              type="tel"
              placeholder="Phone"
              className="form-control"
              onChange={(e) => setUser({ ...user, phone: e.target.value })}
              pattern="^\d{10}$"
              title="Phone number must be 10 digits"
              required
            />
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text">Address</span>
            <input
              type="text"
              placeholder="Hno"
              className="form-control"
              onChange={(e) => setUser({ ...user, hno: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder="Area"
              className="form-control"
              onChange={(e) => setUser({ ...user, street: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder="City"
              className="form-control"
              onChange={(e) => setUser({ ...user, city: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder="State"
              className="form-control"
              onChange={(e) => setUser({ ...user, state: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder="Zip Code"
              className="form-control"
              onChange={(e) => setUser({ ...user, pincode: e.target.value })}
              pattern="^\d{6}$"
              title="Zip Code must be 6 digits"
              required
            />
          </div>

          <div className="input-group mb-3">
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              aria-label="Server"
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              minLength="8"
              title="Password must be at least 8 characters long"
              required
            />
          </div>

          {loading?(<button className="btn btn-primary" type="button" disabled>
  <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>
  <span role="status">Signing up</span>
</button>):(<button className="btn btn-primary" type="submit">
            Signup
          </button>)}
        </form>
      </div>
    </>
  );
};

Signup.propTypes = {
  showAlert: PropTypes.func.isRequired, // Mark as required if it's essential for functionality
};

export default Signup;
