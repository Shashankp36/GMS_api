// const mongoose = require("mongoose");
// const dotenv = require("dotenv");
// // dotenv.config();
// // performing the database connection
// console.log("first");
// const connectDB = async (req, res) => {
//     const db = process.env.MONGO_URL || 'mongodb+srv://rk2505152:user123@cluster0.xvscmpg.mongodb.net/Grievance';

//     const {connection} = await mongoose.connect(db, { useUnifiedTopology: true,
//         useFindAndModify: false,
//         useCreateIndex: true});

//     console.log(`MongoDB Connected to ${connection.host}`);

// }

// module.exports=connectDB;


const mongoose=require('mongoose');
mongoose.connect('mongodb+srv://shashankpatidar1:shashank@cluster0.yziocbe.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
var connection=mongoose.connection
connection.on('error',()=>{
          console.log("mongo db connection is failed");
      })
connection.on('connected',()=>{
    console.log("mongo db connection is succesfull");
});
module.exports=mongoose;