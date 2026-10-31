const express = require("express")
const { connectDB } = require("./config/database")
const cookieParser = require("cookie-parser")
const app = express()
const cors = require("cors")


app.use(cors({
  origin: "http://localhost:5173",   // your frontend URL
  credentials: true,                 // allow cookies
}))                       // middleware to allow cross origin requests from the frontend
app.use(express.json())  // middleware to read the JSON object and convert to Javascript Object
app.use(cookieParser())  // For reading cookie we need to install cookie-parser package and add as middleware so it can read

const authRouter = require("./routes/authRouter")
const profileRouter = require("./routes/profileRouter")
const requestRouter = require("./routes/requestRouter") 
const userRouter = require("./routes/userRouter")

app.use("/", authRouter)
app.use("/", profileRouter) 
app.use("/", requestRouter) 
app.use("/", userRouter) 

connectDB().then(() => {
    console.log("Database connection Established")
    app.listen(process.env.PORT || 3000 , () => {
        console.log("Server is running on port 3000...")
    })
  }).catch((err) => {
      console.error("Database connection failed!!", err)
  })


// Midlewares.  

// GET THE USER BY AGE
// app.get("/user", async (req,res) => {
//     const userAge = req.body.age
//     try{
//       const user = await User.findOne({age: userAge})
//       if(!user) res.status(404).send("User not found!!")
//       res.send(user)
  
//       // const users = await User.find({ age: userAge})
//       // if(users.length === 0){
//       //     res.status(404).send("User Not Found!!")
//       // }else{
//       //     res.send(users)
//       // }
//     }catch (err){
//       res.status(400).send("Something Went Wrong!!")
//     }
//   })
  
//   // Get all the users from the database
//   app.get("/feed", async (req,res) => {
//       try{
//        const users = await User.find({});
//        res.send(users)
//       }catch (err) {
//        res.status(400).send("Something Went Wrong!!")
//       }
//   })
  
//   // find the user by Id and delete it
//   app.delete("/user" , async (req, res) => {
//       const userId = req.body.userId
//       try {
//           const user = await User.findByIdAndDelete(userId)
//           res.send("User Deleted Successfully !!")
//       } catch (err) {
//           res.status(400).send("Something Went Wrong !!")
//       }
//   })
  
//   // Find the user by userId and update it
  
//   app.patch("/user", async (req,res) => {
//       const userId = req.body.userId
//       const data = req.body
//       try{
//           const allowed_updates = ["firstName", "lastName","passsword"];
//           const isUpdateAllowed = Object.keys(data).every((k) => allowed_updates.includes(k))
//           if(!isUpdateAllowed){
//               throw new Error("Update not allowed")
//           }
//         const user = await User.findByIdAndUpdate(userId , data, {
//           returnDocument: "after",
//           runValidators: true
//         })
//         res.send("User Updated Successfully!!")
//       }catch (err) {
//           res.status(400).send("Update failed !!" + err.message)
//       }
//   })

// app.use("/admin", adminAuth)

// app.get("/admin/getAllData", (req,res) => {
//     throw new Error("Error Fetching the Data")
//     res.send("Data Fetched....")
// })

// app.get("/admin/deleteUser", (req,res) => {
//   res.send("Deleted a user")
// })

// app.get("/user/profile", userAuth , (req,res) => {
//   res.send("Fetched Profile Details")
// })

// Error Handling
// This shuld be written on the end so it will gracefully handle aLL THE ERRORS
// app.use("/", (err,req,res, next) => {
//  if(err){
//     res.status(500).send("Something went wrong")
//  }
// })

// app.get("/abc", (req,res) => {
//     res.send("It will work for both /ab and /abc as b is optional")
// })

// app.get("/user", (req,res, next) => {
//     console.log("1st Response")
//     next();
// }, (req,res) => {
//     console.log("2nd Response!!")
//     res.send("2nd Response!!")
// })

// app.get("/user/:userId", (req,res) => {
//     console.log(req.params)
//     res.send({firstName: "Amit", lastName: "Agarwal"})
// })

// app.get("/user/:userId/:name", (req,res) => {
//     console.log(req.params)
//     res.send({firstName: "Amit", lastName: "Agarwal"})
// })

// app.post("/user", (req,res) => {
//     res.send("Data Saved successfully to the DB")
// })

// app.use("/test", (req,res) => {
//   res.send("Hello from the server!")
// })

// app.use("/hello", (req,res) => {           
//     res.send("Hello Hello.....")
// })

// This will match all the HTTPs methods API Calls 
// app.use("/", (req,res) => {
//     res.send("Hello from the DevTinder Server...")
// })

