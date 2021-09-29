import mongoose from 'mongoose'
import express from 'express'
import Crud from './models/Crud.js'
import Users from './models/Users.js'
import cors from 'cors'
import fileupload from 'express-fileupload'
import multer from 'multer'

const corstate = cors
const app = express();
const CrudModel = Crud;
const UsersModel = Users;

app.use(express.json());
app.use(corstate())
app.use(fileupload())

const Filestorage = multer.diskStorage({
  destination: (req, file , cb) => {
    cb(null,'./images/')
  },
  filename: (req, file , cb) =>{
    cb(null, Date.now() + '--'+file.originalname)
  }
});
const upload = multer({storage:Filestorage}).single('file')

mongoose.connect('mongodb+srv://foundandseekuser:nn0uFEDdWRXPph2u@assignmentcrud.zgtku.mongodb.net/crud?retryWrites=true&w=majority',{
    useNewUrlParser: true
})
//post data to MongoDb
app.post('/test', async (req,res)=>{
// const reqdata = req.files
console.log(req.files['file'])
  // upload(req,res,(error) =>{
  //   if(error){
  //     return res.status(500).json(error)
  //   }
  //   else{
  //     return res.status(200).send(req.files)
  //     // console.log(req.files)
  //   }
  // })
})
app.post('/insert', async (req, res) => {
 
  // const device_id = req.body.device_id
  // const name = req.body.name
  // const field = req.body.field
  // const images = req.body.file.name
  // const description = req.body.description
  // const availability = req.body.availability
  upload(req,res,(error) =>{
    if(error){
      return res.status(500).json(error)
    }
    else{
      return res.status(200).send(req.file)
    }
  })

//  const cruds = new CrudModel({
//     device_id:device_id,
//     name:name,
//     field:field,
//     description:description,
//     images:images,
//     availability:availability,
//   });
//   console.log(req.body)
//   try {
//       if(await cruds.save()){
   
//         res.send(cruds)
//       }
    
//   } catch (error) {
//       console.log(error);
//   }
})
//GetData From MongoDb
app.get('/products', async (req,res) =>{
  console.log(req.body)
  CrudModel.find({},(err,result) =>{
    if(err){
      res.send(err)
    }
    res.send(result)

  })
})
//Get to Edit
app.get('/product/:id',(req,res) =>{
  const obj_id = req.params.id
   CrudModel.findById({_id:obj_id},(err,result) =>{
    if(err){
      res.send(err)
    }
    res.send(result)

  })
})
//Update
app.put('/update',async (req,res) =>{
  console.log(id)
  const name = req.body.name
  const field = req.body.field
  const description = req.body.description
  const images = req.body.images
  const availability = req.body.availability
  const original_price = req.body.original_price
  const sale_price = req.body.sale_price
  try {
    await CrudModel.findById({_id:id},(err,updatedCrud) =>{
      updatedCrud.name = name;
      updatedCrud.field = field;
      updatedCrud.description = description;
      updatedCrud.images = images;
      updatedCrud.availability = availability;
      updatedCrud.save();
      res.send(updatedCrud)
    })
  } catch (error) {
    
  }
})
// For UserController
app.post('/register', async (req,res) =>{
  const user_name = req.body.user_name
  const email = req.body.email
  const password = req.body.password

  const users = new UsersModel({
    user_id:1,
    user_name:user_name,
    email:email,
    password:password
  });
  try {
    if(await users.save()){
      console.log('user added')
    }
    
  } catch (error) {
    console.log(error)
  }
})
//Login User
app.post('/login', async (req,res) =>{
  const email = req.body.email
  const user_password = req.body.password
  var query = {email:email, password:user_password}
  try {
    await UsersModel.findOne(query,(err,Userlogin) =>{
      if(!Userlogin) 
        res.send('error')
      else 
        res.send(Userlogin)
    })
  } catch (error) {
   
  }
 
})

app.listen(8001,()=>{
    console.log('server is running');
})