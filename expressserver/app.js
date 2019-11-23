const express = require ('express');
const app = express();
const path = require ('path')
const port = 3001;
const bodyParser = require('body-parser')
//app config
//serving static files.
app.use(express.static('public'))

app.use(bodyParser.urlencoded({ extended: false }))

//read
app.get('/',(req,res)=>{
    res.send('Hello World')
})


app.get('/home',(req,res)=>{
    res.sendFile(__dirname + '/views/index.html')
})

app.get('/about',(req,res)=>{
    res.send('Here you can see about page')
})

app.get('/search/:searchparams', (req,res)=>{
    console.log(req)
    res.send(`my name is ${req.params.searchparams}`)
})

//post
app.post('/home', (req,res)=>{
console.log(req.body)
})

//update
app.put('/home',(req,res)=>{
    console.log(req.body)
})

//delete
app.delete('/home',(req,res)=>{
    console.log(req.body)
})

// app.get('*',(req,res)=>{
//     res.send("Oops nothing to show")
// })
app.listen(port, ()=>{
    console.log(`App is listening at port ${port}`)
})