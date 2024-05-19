const Admin = require("../models/admin.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

 const admin_registerControllers = async (req, res, next) => {
    try{
        const {name, email, password,department} = req.body;

        console.log(name, email, password,department);

        if(!name || !email || !password || !department){
            return res.status(400).json({
                success: false,
                message: "Please enter All Fields",
            }) 
        }

        let user = await Admin.findOne({email});

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
       
        let newadmin = await Admin.create({
            name, 
            email, 
            department,
            password: hashedPassword, 
        });
        return res.status(200).json({
            success: true,
            message: "User Created Successfully",
            user: newadmin
        });
        
    }
    catch(err){
        return res.status(500).json({
            success: false,
            message: err.message,
        });
    }

}
const admin_loginControllers = async (req, res, next) => {
    try{
        const { email, password } = req.body;

        console.log(email, password);
  
        if (!email || !password){
            return res.status(400).json({
                success: false,
                message: "Please enter All Fields",
            }); 
        }
    
        const user = await Admin.findOne({ email });
        console.log(user);
        if (!user){
            return res.status(401).json({
                success: false,
                message: "User not found",
            }); 
        }
    
        const isMatch = await bcrypt.compare(password, user.password);
        
//         console.log(user);
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
        const user = await Admin.find({_id: {$ne: req.params.id}}).select([
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
const admindata=async(req,res)=>{
    try {  
      const data = await Admin.find({});
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

   const delete_admin=async(req,res)=>{
    try {  
        const {id}=req.body;
        console.log(id);
      const data = await Admin.findByIdAndDelete(id);
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

   const getAdminCount = async (req, res, next) => {
    try {
      const adminCount = await Admin.countDocuments();
      return res.status(200).json({
        success: true,
        count: adminCount
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: err.message
      });
    }
  };
  
module.exports={delete_admin,admin_loginControllers,admin_registerControllers,admindata,getAdminCount}