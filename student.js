const express=require('express');
const app=express();
const {mongoose}=require('mongoose')

const  cors=require('cors');
// cross origin resource location
app.use(cors());
//javascript object notation
app.use(express.json());

const PORT=8000;
// database name
mongoose
.connect("mongodb://127.0.0.1:27017/youtube-app-1")
.then(()=>console.log('mongodb connected'))
.catch((err) => console.err('creating error',err));
// take a time when request send then promise use
//1.then catch 2.async await 3.callback
app.use(express.urlencoded({extended:false}))

const FreekSchema=new mongoose.Schema({
    firstName:{
        type:String,
        required: true
    },
    lastName:{
        type:String,
    },
    email:{
        type:String,
    },
    Password:{
        type:Number,
    },
    contact:{
        type:Number,
    },
    detail:{
        type:string
    }
    creep
    other
})

 const student=mongoose.model('Freek', FreekSchema);

app.post('/api/register', async(req,res)=>{
    const body=req.body

    if(
        !body||
        !body.id||
        !body.firstName||
        !body.lastName||
        !body.email||
        !body.Password||
        !body.contact
    )
    {return res.status(401).json({msg:"all field are required"})};
    const data=await student.create({
        id:body.id,
        firstName:body.firstName,
        lastName:body.lastName,
        email:body.email,
        Password:body.Password,
        contact:body.contact,
    
        
    })
   console.log("result",data);
    return res.status(200).json({msg:"success",data}); 
})

app.post("/api/login",async (req,res)=>{
 const detail={
    email:req.body.email,
    Password:req.body.Password
 }
 const data=await student.findOne(detail)
 console.log("data",data)
 if(data){
 return res.status(200).json({msg:"success"})

 }
 else{
 return res.status(400).json({msg:"ERROR"})

 }

   });


 app.get("/api/register", async(req,res) =>{
     const allDbFreek=await student.find({})
     return res.json(allDbFreek)
 });
{/*.delete("/api/:id", async(req,res)=>{
    const data=await student.findByIdAndDelete(req.params.id);
    return res.json("msg:success",data)

});*/}
app.patch("/api/patch/:id",async(req,res)=>{
    try{
        const id=req.params.id;
        const data=await student.findByIdAndUpdate( id, {lastName:"kumar"} )
        console.log(data)
}
    
        catch(error){
            console.log("error created",error)
        }
        console.log(data)
});
app.put("/api/update/:id",async(req,res)=>{
    console.log('00000000')
    try{
        console.log('req.body===>>',req.body)
        const{id,firstName,lastName,email,Password,contact}=req.body
    const data= await student.findByIdAndUpdate(req.params.id,{id,firstName,lastName,email,Password,contact})
    res.json(data)
    console.log(data)
    }catch(error){
        console.log("error found", error);
    }
    //until a promise is resolved or rejected

});
app.delete("/api/delete/:id", async(req,res)=>{
   try {
    let id = req.params;
    const data=await student.deleteOne(new mongoose.Types.ObjectId(id));
    return res.json("message success",data);
   } catch (error) {
    res.status(500).send("Internal server error")
   }
});
   
  const categorySchema=new mongoose.Schema({
   id:{
    type:Number
   },
   Name:{
    type:String
   },
   default:{
    type:Number
   },
   custom:{
    type:Number
   }
  });
  
  const detail=mongoose.model("category",categorySchema);

  app.post('/api/category/post', async(req,res)=>{
    const body=req.body;
    if(
        !body||
        !body.id||
        !body.Name||
        !body.default||
        !body.custom
    )
    {
        return res.status(401).json({msg:'all field are required'})
       // unauthorised error
    }
    const result=await detail.create({
        id:body.id,
        Name:body.Name,
        default:body.default,
        custom:body.custom
    })
    console.log("result",result)
    return res.status(201).json({msg:'success',result})

    //client request successful
  });

  app.get('/api/category/get', async(req,res)=>{
    const category=await detail.find({});
    console.log(category)
    return res.json(category)
  });

  //application programming interface
  app.delete('/api/category/delete/:id', async(req,res)=>{
    try{
    let id=req.params.id
    const result=await detail.deleteOne({id})
    console.log(result,id)
    return res.json('success',result)
    }catch(err){
        console.log("error", err)
    }
  });

  app.put('/api/category/put/:id', async(req,res)=>{

    try{
    const {id,Name,custom}=req.body
    

    const result= await detail.findByIdAndUpdate(req.params.id,{id,Name,custom})
    console.log(result)
    return res.json("success",result)
    
    }
    catch(err){
        console.log("updating err",err)

        }
    })

    const contactSchema=new mongoose.Schema({
        Name:{
            type:String
        },
        Email:{
            type:String
        },
        Message:{
            type:String
        }
    });
     
    const info=mongoose.model("contact",contactSchema);

    app.post('/api/contact',async (req,res)=>{
        const body=req.body

        if(
            !body||
            !body.Name||
            !body.Email||
            !body.Message
        )
        {
            return res.status(401).json({msg:"all field are required"})
        }
        const form=await info.create({
            Name:body.Name,
            Email:body.Email,
            Message:body.Message
        })
        console.log("form",form)
        return res.status(200).json("sucess",form)
    })
    

app.get('/api/contact', async(req,res)=>{
    const contact=await info.find({})
    res.json(contact)

})

const ProfileSchema=new mongoose.Schema({
    FirstName:{
        type:String
    },
    LastName:{
        type:String
    },
    email:{
        type:String
    },

    Bio:{
        type:String
    },
    gender:{
       type:String,
      enum:['Male','Female'],
   },
//    arr:[Number],
    Skill:[{
        type: String
    }]
});

const data=mongoose.model("Profile",ProfileSchema);

app.post('/api/Profile', async(req,res)=>{
  const body=req.body;
console.log(body)

  let array = Object.values(body.Skill);
//   console.log(array,">>> array >>>")
//   console.log(body,'>>> body >>>')
  if(!body||
    !body.FirstName||
    !body.LastName||
    !body.email||
    !body.Skill.skill1||
    !body.Skill.skill2||
    !body.Skill.skill3||
    !body.Skill.skill4||
    !body.Skill.skill5||
    !body.gender||
    !body.Bio
  ){
    return res.status(400).json({msg:"all field are required"})
  }
  const Information= await data.create({
    FirstName:body.FirstName,
    LastName:body.LastName,
    email:body.email,
    Skill:array,

    Bio:body.Bio,
   gender:body.gender

  })
  console.log("Information",Information)
   return res.status(200).json("success")

})
app.get('/api/profile',async(req,res)=>{
    const Profile=await data.find({})
    res.json(Profile)
} )

app.listen(PORT, ()  =>console.log(`server started at port:${PORT}`));
