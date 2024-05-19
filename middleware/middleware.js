const jwt = require("jsonwebtoken");

const authMiddleware=async(req, res, next) =>{
  const token = req.body.token;
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, 'MYNAMEISRANJEETKUMARSOFTWAREDEVELOPERENGINEER');
    req.user = decoded.user;
    res.status(200).json({success: true,message: 'Token is varified' })
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: 'Token is not valid' });
  }
};

module.exports=authMiddleware;