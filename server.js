const express = require("express");
const app = express();
const cors = require("cors");
const mongoose=require('mongoose')
const port = process.env.PORT
require("dotenv").config();

//rest object

const path=require('path');
//middlwares
app.use(cors());
app.use("/",express.static(path.join(__dirname,"./client/dist")))
app.use(express.json());


//routes
app.use("/api/items", require("./routes/itemRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/bills", require("./routes/billsRoute"));

//port
const PORT = process.env.PORT || 1234;

//mongoose 
// mongoose.connect(process.env.MONGO_URL)
// .then(()=>console.log('DB CONNECTED'))
// .catch((err)=>console.log("something went wrong"))
app.get("*",(req,res)=>{
  res.sendFile(path.join(__dirname,"./client/dist/index.html"))
})

//listen
app.listen(PORT, () => {
  console.log(`Server Running On Port ${PORT}`);
});



