const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

app.use(methodOverride('_method'))
app.set('view engine', 'ejs')
app.use(express.static('public'))

app.use(bodyParser.urlencoded({extended : false}))

const cars = []

app.get('/', (req,res)=>{
    res.render('index.ejs', {cars : cars})
})

//adding cars
app.post('/', (req,res)=>{
    cars.push(req.body.cars)
    console.log(req.body)
    res.redirect('/')
})

//updating cars
app.get('/update/:id', (req,res)=>{
    const findCar = cars.find(function(car){
        return car === req.params.id
    })
    res.render('update', {updateCar : findCar})
})

app.put('/update/:newcar', (req,res)=>{
const findIndex = cars.findIndex(function(carIndex){
    return carIndex === req.params.newcar
})
cars[findIndex] = req.body.newCar
res.redirect('/')
})

//delete
app.delete('/delete/:id', (req,res)=>{
const index = cars.findIndex(function (delIndex){
    return delIndex === req.params.id
})
cars.splice(index,1)
res.redirect('/')
})

app.listen(port, ()=>{
    console.log(`App is running at port ${port}`)
})