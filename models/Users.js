import mongoose from 'mongoose'
const UsersSchema = mongoose.Schema({
  
    user_name:{
        type: String, 
        required: true
    },
    email:{
        type: String, 
        required: true
    },
    password:{
        type: String, 
        required: true
    },

})
const Users = mongoose.model('UsersData',UsersSchema);
export default Users;