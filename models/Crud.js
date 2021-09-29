// const mongoose = require('mongoose');
import mongoose from 'mongoose'
const CrudSchema = mongoose.Schema({
    device_id:{
        type: String, 
        required: true
    },
    name:{
        type: String,
        required: true
    },
    field:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    images:{
        type: String,
        required: true
    },
    availability:{
        type: String,
        required: true
    }

})
const Crud = mongoose.model('CrudData',CrudSchema);
// module.exports Crud;
export default Crud