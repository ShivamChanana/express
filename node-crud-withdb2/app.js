const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const port = 5000
const mongoose = require('mongoose')
const methodOverride = require ('method-override')
const users = require('./models/Users')

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended : false}))
app.use(methodOverride('_method'))

mongoose.connect('mongodb://localhost:27017/users', (err)=>{
    if(err){
        console.log('err')
    }else{
        console.log('DB connected')
    }
})

app.get('/', (req,res)=>{
    users.find({})
    .then((data)=>{
        res.render('index', {data:data})
    })
    .catch((err)=>{
        console.log(err)
    })
})

app.post('/', (req,res)=>{
    users.create({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone
    })
    res.redirect('/')
})

//update
app.get('/update/:id', (req,res)=>{
    users.findById(req.params.id)
    .then((data)=>{
        res.render('update', {updateUser:data})
    })
})

app.put('/update/:id', (req,res)=>{
    const id = req.params.id
    users.findByIdAndUpdate((id),{
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone
    })
    .then(()=>{
    res.redirect('/')
    })
})

//delete
app.delete('/delete/:id', (req,res)=>{
    const id = req.params.id
    users.findByIdAndDelete(id)
    .then(()=>{
        res.redirect('/')
    })
})

app.listen(port, ()=>{
    console.log(`App is running at port ${port}`)
})