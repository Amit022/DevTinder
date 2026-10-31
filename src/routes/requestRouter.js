const express = require("express");
const { userAuth } = require("../middlewares/auth");
const { ConnectionRequestModel } = require("../models/connectionRequest");
const requestRouter = express.Router();
const { User } = require("../models/user")

requestRouter.post(
  "/request/send/:status/:toUserId",
  userAuth,
  async (req, res) => {
    try {
      const fromUserId = req.user._id;
      const toUserId = req.params.toUserId;
      const status = req.params.status;

      // check for status
      const allowedStatus = ["ignored", "interested"];
      if (!allowedStatus.includes(status)) {
        return res.status(400).json({ message: "Invalid status type: " + status });
      }

      // Check if toUser exists in DB
      const toUser = await User.findById(toUserId);
      if (!toUser) {
        return res.status(404).json({ message: "User not found!!" });
      }

      // Chcek if connection request already exists
      const existingConnectionRequest = await ConnectionRequestModel.findOne({
        $or: [
          { fromUserId, toUserId },
          { fromUserId: toUserId, toUserId: fromUserId },
        ],
      });

      if (existingConnectionRequest) {
        res
          .status(400)
          .json({ message: "Connection Request already exists!!" });
      }
      const connectionRequest = new ConnectionRequestModel({
        fromUserId,
        toUserId,
        status,
      });

      const data = await connectionRequest.save();
      res.json({
        message: req.user.firstName + " " +status + " " +toUser.firstName + " profile",
        data,
      });
    } catch (err) {
      res.status(400).send("ERROR : " + err.message);
    }     
  }
);

requestRouter.post("/request/review/:status/:requestId", userAuth, async (req,res) => {
  try{
    const loggedInUser = req.user;
    const { requestId, status } = req.params;

    // check for status
    const allowedStatus = ["accepted", "rejected"];
    if(!allowedStatus.includes(status)){
     return res.status(400).json({ message: "Invalid status type: " + status });
    }

    // check if connection request exists
    const connectionRequest = await ConnectionRequestModel.findOne({
      _id: requestId,
      toUserId: loggedInUser._id,
      status: "interested"
    })

    if(!connectionRequest){
      return res.status(404).json({ message: "Connection Request not found!!" });
    }

    connectionRequest.status = status;
    await connectionRequest.save();
    res.json({
      message: loggedInUser.firstName + " " +status + " " +connectionRequest.fromUserId + " profile",
      data: connectionRequest,
    });
  }catch(err){
    res.status(400).send("ERROR : " + err.message);
  }
})

module.exports = requestRouter;
