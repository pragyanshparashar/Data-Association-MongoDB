const express = require('express');
const app = express();
const userModel = require('./models/user');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const postModel = require('./models/post');
const jwt = require('jsonwebtoken');
const path= require('path');
const crypto = require('crypto');
const multer= require('multer')
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images/uploads')
  },
  filename: function (req, file, cb) {
     crypto.randomBytes(12, function(err, bytes){
        const fn= bytes.toString('hex') + path.extname(file.originalname)

    cb(null, fn)
     })
    
  }
})

const upload = multer({ storage: storage })




app.get('/', function(req,res){
    res.render('index')
})

app.post('/register', async function(req,res){
    let {name, username, email, password, age} = req.body
    let user= await userModel.findOne({email})
    if(user) return res.status(500).send('user already exists')

    bcrypt.genSalt(10, function(err,salt){
        bcrypt.hash(password, salt, async function(err, hash){
            let user = await userModel.create({
                name,
                username,
                email,
                password: hash,
                age
            })
            let token = jwt.sign({_id: user._id, email: email}, "secret");  
            res.cookie('token', token);
            res.send('registered');
        })
    })
})


   app.get('/login', function(req,res){
    res.render('login')
   })
app.post('/login', async function(req,res){
    let {email, password} = req.body ;
    let user = await userModel.findOne({email})
    if(!user) return res.status(500).send('something went wrong')

    bcrypt.compare(password, user.password, function(err, result){
        if(result){
            let token = jwt.sign({_id: user._id, email}, "secret");  
            res.cookie('token', token);
            res.redirect('/profile');
        }else {
            res.status(500).send('something went wrong')
        }
    })
})

app.get('/profile', isLoggedIn, async function(req,res){
   let user = await userModel.findOne({email: req.user.email}).populate('posts');
   
    console.log(user.posts)
    res.render('profile', {user})
})
app.get('/likes/:id',isLoggedIn, async function(req,res){
    let post = await postModel.findOne({_id: req.params.id}).populate('user')
   
    if(post.likes.indexOf(req.user.userid) === -1){
        post.likes.push(req.user.userid);
    }else{
        post.likes.splice(post.likes.indexOf(req.user.userid), 1)
    }
   
    
    await post.save();
    res.redirect('/profile');
})

app.get('/edit/:id', isLoggedIn, async function(req,res){
    let post = await postModel.findById(req.params.id).populate('user');  
    res.render('edit', {post})
})

app.post('/update/:id', isLoggedIn, async function(req,res){
    let {content}= req.body;
    let post = await postModel.findByIdAndUpdate(req.params.id, {content});  
    res.redirect('/profile');
})
 app.post("/posts", isLoggedIn, async function(req,res){
    let {content} = req.body;
    let user = await userModel.findOne({email: req.user.email});
    let post = await postModel.create({
        user: user._id,
        content
    })
    user.posts.push(post._id);
    await user.save();
    res.redirect('/profile');

 })



  app.get('/profile/upload', function(req,res){

    res.render('profileupload')
  })

app.post('/upload', isLoggedIn, (req,res,next)=>{
  console.log("UPLOAD ROUTE HIT");
  next();
}, upload.single('filename'), async function(req,res){
  let user = await userModel.findOne({email: req.user.email})
  user.profilepicture = req.file.filename;
  await user.save();
  res.redirect('/profile');  
})


    app.get('/logout', function(req,res){
        res.cookie('token', '');
        res.redirect('/login')
    })

  function isLoggedIn(req,res,next){
    if(!req.cookies.token){
        return res.redirect('/login');
    }

    try{
        let data = jwt.verify(req.cookies.token, "secret");
        req.user = data;
        next();
    }catch(err){
        return res.redirect('/login');
    }
}



app.listen(4000, function(req,res){
    console.log('server is running on port 4000')
})