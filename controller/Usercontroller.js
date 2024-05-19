const User = require("../models/user.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

 const registerControllers = async (req, res, next) => {
    try{
        const {name, email, password} = req.body;

        // console.log(name, email, password);

        if(!name || !email || !password){
            return res.status(400).json({
                success: false,
                message: "Please enter All Fields",
            }) 
        }

        let user = await User.findOne({email});

        if(user){
            return res.status(409).json({
                success: false,
                message: "User already Exists",
            });
        }

        const salt = await bcrypt.genSalt(10);

        const hashedPassword = await bcrypt.hash(password, salt);

        // console.log(hashedPassword);
        console.log(name, email, hashedPassword);
       
        let newuser = await User.create({
            name, 
            email, 
            password: hashedPassword, 
        });

        return res.status(200).json({
            success: true,
            message: "User Created Successfully",
            user: newuser
        });
        
    }
    catch(err){
        return res.status(500).json({
            success: false,
            message: err.message,
        });
    }

}
const loginControllers = async (req, res, next) => {
    try{
        const { email, password } = req.body;

        // console.log(email, password);
  
        if (!email || !password){
            return res.status(400).json({
                success: false,
                message: "Please enter All Fields",
            }); 
        }
    
        const user = await User.findOne({ email });
        console.log(user);
        if (!user){
            return res.status(401).json({
                success: false,
                message: "User not found",
            }); 
        }
    
        const isMatch = await bcrypt.compare(password, user.password);
        
        console.log(user);
        if (!isMatch){
            return res.status(401).json({
                success: false,
                message: "Incorrect Email or Password",
            }); 
        }
        // const token = jwt.sign(
        //     { id: user._id, name: user.name },
        //     process.env.SECERET_KEY || "MYNAMEISRANJEETKUMARSOFTWAREDEVELOPERENGINEER",
        //     {
        //       expiresIn: "30d",
        //     }
        //   );

        delete user.password;

        return res.status(200).json({
            
            success: true,
            message: `Welcome back, ${user.name}`,
            user,
        });

    }
    catch(err){
        return res.status(500).json({
            success: false,
            message: err.message,
        });
    }
}
 const allUsers = async (req, res, next) => {
    try{
        const user = await User.find({_id: {$ne: req.params.id}}).select([
            "email",
            "username",
            "_id",
        ]);

        return res.json(user);
    }
    catch(err){
        next(err);
    }
}
const getUserCount = async (req, res, next) => {
    try {
      const userCount = await User.countDocuments();
      return res.status(200).json({
        success: true,
        count: userCount
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: err.message
      });
    }
  };
  const userdata=async(req,res)=>{
    try {  
      const data = await User.find({});
       console.log(data);
      return res.status(200).json({
        success: true,
        admin: data
      });
    } catch (err) {
      return res.status(401).json({
        success: false,
        messages: err.message,
      });
    }
   }
  
   const delete_user=async(req,res)=>{
    try {  
        const {id}=req.body;
        console.log(id);
      const data = await User.findByIdAndDelete(id);
      return res.status(200).json({
        success: true,
      });
    } catch (err) {
      return res.status(401).json({
        success: false,
        messages: err.message,
  });
}
}
const getUserProfile = async (req, res) => {
  try {
    // Fetch user data based on the current user's authentication credentials
    const user = await User.findOne({ email: req.user.email }); // Example query based on email

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Extract relevant user details to send in the response
    const userData = {
      email: user.email,
      name: user.name,
      phone: user.phone,
      aadhaarNumber: user.aadhaarNumber,
      complaints: user.complaints, // Assuming complaints is an array of user complaints
    };

    // Send user data as response
    res.status(200).json(userData);
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports={loginControllers,registerControllers, getUserCount,userdata,delete_user,getUserProfile}