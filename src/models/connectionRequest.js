const { mongoose } = require("mongoose")

const connectionRequestSchema = new mongoose.Schema({
  fromUserId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',  // REFRERENCE TO USER MODEL
    required: true
  },
  toUserId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  status: {
    type: String,
    required: true,
    enum: {
        values: ["ignored","interested","accepted","rejected"],
        message: `{VALUE} is incorrect status type`
    }
  }
},{
    timestamps: true,
})

connectionRequestSchema.index({ fromUserId: 1, toUserId: 1 }, { unique: true })

connectionRequestSchema.pre("save", function () {
  const connectionRequest = this
  // Chcek if toUserId and fromUserId is same 
  if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)){
    throw new Error("Cannot send connection request to yourself!")
  }
})

const ConnectionRequestModel = new mongoose.model(
    "ConnectionRequest",
    connectionRequestSchema
)

module.exports = { ConnectionRequestModel }