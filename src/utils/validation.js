const validator = require("validator")

const validateSignUpData = (req) => {
  const { firstName, lastName, emailId, age, gender, password } = req.body

  if(!firstName || !lastName){
    throw new Error("Name is not valid!!")
  }else if(!validator.isEmail(emailId)){
    throw new Error("EmailId is not valid!!")
  }else if(!validator.isStrongPassword(password)){
    throw new Error("Please eneter strong password!!")
  }
}

const validateEditProfileData = (req) => {
  const allowedEditFields = ["firstName","lastName", "gender","age","photoUrl","about","skills"]
  const IsEditAllowed = Object.keys(req.body).every((field) => allowedEditFields.includes(field))
  return IsEditAllowed
}

module.exports = { validateSignUpData , validateEditProfileData}