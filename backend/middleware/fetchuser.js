import jwt from "jsonwebtoken";
const JWT_SECRET = "kunalis@goodboy";

const fetchuser = (req, res, next) => {
  const token = req.header("authtoken")||"";
  if (!token) {
      return res.status(401).json({ error: "Please Login first" });
  }
      const data = jwt.verify(token, JWT_SECRET);
      req.user = data.user;
      next(); // Proceed to next middleware
  
};
export default fetchuser;