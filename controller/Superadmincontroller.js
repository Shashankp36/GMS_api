const SuperAdmin = require("../models/superadmin.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

 const super_registerControllers = async (req, res) => {
    // try{
        const {name, email, password} = req.body;

        // console.log(name, email, password);

        if(!name || !email || !password){
            return res.status(400).json({
                success: false,
                message: "Please enter All Fields",
            }) 
        }

        let user = await SuperAdmin.findOne({email});

        if(user){
            return res.status(409).json({
                success: false,
                message: "User already Exists",
            });
        }

        const salt = await bcrypt.genSalt(10);

        const hashedPassword = await bcrypt.hash(password, salt);

        console.log(name, email, hashedPassword);
       
            const newuser=new SuperAdmin({name,email,password: hashedPassword});
            await newuser.save(); 

           
        return res.status(200).json({
            success: true,
            message: "User Created Successfully",
            user: newuser
        });
        
    }
const super_loginControllers = async (req, res, next) => {
    try{
        const { email, password } = req.body;
  
        if (!email || !password){
            return res.status(400).json({
                success: false,
                message: "Please enter All Fields",
            }); 
        }
        const mailid="superadmin@gmail.com";
        const super_password=12345678;

        if(email!=mailid && password!=super_password){
            return res.status(401).json({
                success: false,
                message: "Incorrect Email or Password",
            }); 
        }
        const user={
            name:"ranjeet kumar",
            email:mailid,
            password:super_password,
        }
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
module.exports={super_loginControllers,super_registerControllers}