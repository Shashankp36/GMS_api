const express=require('express');
const cors = require('cors');
const bodyParser =require('body-parser');
const helmet = require ("helmet");
const morgan = require("morgan");
const userRoutes =require('./routes/user_router');
const adminRoutes=require('./routes/admin_router.js');
const superadminRoutes=require('./routes/super_admin.js');
const newproblemroutes=require('./routes/Problem_router.js')
const countRoutes = require('./routes/count_router.js');


const dbs=require('./DB/database.js');
const app=express();
const port = process.env.PORT || 4500;
// Middleware
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
  optionsSuccessStatus: 200, 
})); 

app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// api handling for all users 
app.use("/api/auth", userRoutes);
app.use("/api/auth", adminRoutes);
app.use("/api/auth", superadminRoutes);

// api handling for adding the problem
app.use("/api/v1",newproblemroutes)

// api handling for fetching the problem according to user
app.use("/api/v2",newproblemroutes)
app.use('/api', countRoutes);

app.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`);
});

