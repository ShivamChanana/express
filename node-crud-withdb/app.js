const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const user = require('./models/User')
var methodOverride = require('method-override')

app.use(methodOverride('_method'))

mongoose.connect('mongodb://localhost:27017/users', (err) =>{
    if(err){
        console.log(err)
    } else{
        console.log('Db connected')
    }
})

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', (req,res)=>{
    user.find({})
    .then((data) =>{   
        res.render('index', {data:data})
    }).catch((err)=>{
        console.log(err)
    })
})

app.post('/', (req,res)=>{
    user.create({
        name: req.body.name,
        email: req.body.email,
        phone:req.body.phone
    })
    res.redirect('/')
})

app.get('/update/:id', (req,res)=>{
    user.findById(req.params.id)
    .then((data)=>{
        res.render('update',  {updateUser:data})
    })
})


app.put('/update/:id', (req,res)=>{
    const id = req.params.id;
    user.findByIdAndUpdate(id, {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone
    }) .then(() =>{
        res.redirect('/')
    })
})

app.delete('/delete/:id', (req, res)=>{
    user.findByIdAndDelete(req.params.id)
    .then(()=>{
        res.redirect('/')
    })
})

app.listen(3000, (req,res) =>{
    console.log(`Listening at port 3000`)
})