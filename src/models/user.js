const { mongoose } = require("mongoose");
const validator = require("validator")

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    emailId: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        validate(value) {
          if(!validator.isEmail(value)){
            throw new Error("EmailId is not valid")
          }
        }
    },
    gender: {
        type: String,
        required: true,
        validate(value) {
            if(!["male","female","others"].includes(value)){
              throw new Error("Gender is not valid!!")
            }
        }
    },
    password: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true, 
        min: 18
    },
    photoUrl: {
        type: String,
        required: true
    },
    about: {
        type: String,
        default: "This is a default about value"
    },
    skills: {
        type: [String]
    }
}, {timestamps: true})

const User = mongoose.model("User", userSchema)

module.exports = { User }