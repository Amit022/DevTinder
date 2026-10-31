const express = require("express")
const { userAuth } = require("../middlewares/auth")
const { ConnectionRequestModel } = require("../models/connectionRequest")

const userRouter = express.Router()

userRouter.get("/user/requests/received" , userAuth ,async (req,res) => {
    try{
       const loggedInUser = req.user
       const connectionRequests = await ConnectionRequestModel.find({
        toUserId: loggedInUser._id,
        status: "interested"
       }).populate("fromUserId" , [ "firstName" , "lastName" , "age" , "gender" , "profileImage" , "bio" , "location"])

       res.json({
        message: "Connection Requests fetched successfully!!",
        data: connectionRequests 
       })
    }catch(err){
        res.status(400).send("Error :" +err.message)
    }
})


userRouter.get("/user/connections", userAuth, async(req,res) => {
    try{
      const loggedInUser = req.user
      const connections = await ConnectionRequestModel.find({
        $or: [
            { toUserId: loggedInUser._id, status: "accepted" },
            { fromUserId: loggedInUser._id, status: "accepted" }
        ]
      }).populate("fromUserId" , [ "firstName" , "lastName" , "age" , "gender" , "profileImage" , "bio" , "location"])
        .populate("toUserId" , [ "firstName" , "lastName" , "age" , "gender" , "profileImage" , "bio" , "location"])

        const data = connections.map((connection) => {
            if (connection.fromUserId._id.equals(loggedInUser._id)) {
                return connection.toUserId;
            } else {
                return connection.fromUserId;
            }
        })
      res.json({
        message: "Connections fetched successfully!!",
        data: data
      })
    }catch(err) {
        res.send(400).send("Error :" +err.message)
    }
})

module.exports = userRouter