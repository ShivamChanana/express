const express = require('express')
const bodyParser = require('body-parser')
const port = 3000
const app = express()
const methodOverride = require('method-override')
app.use(methodOverride('_method'))

const vegetables = []

app.use(bodyParser.urlencoded({ extended: false }))

app.set('view engine', 'ejs')

app.get('/',(req,res)=>{
    res.render("index", {vegetables:vegetables})
})

app.post('/', (req,res)=>{
    vegetables.push(req.body.vegetables)
    res.redirect('/')
})

app.get('/update/:veg', (req,res)=>{
    //finding the vegetable in vegetable array

    const findVeg = vegetables.find( function (vegetable){
        return vegetable === req.params.veg
    })
        res.render('update', {updateveg: findVeg })
})


app.put('/update/:newVegetable', (req,res) =>{
    const findVegetableIndex = vegetables.findIndex(function (vegetable) {
        return vegetable === req.params.newVegetable
    })
    vegetables[findVegetableIndex] = req.body.finalnewvegetable
    res.redirect('/')
})

app.delete('/delete/:vegetable', (req,res)=>{
    const findVegetableIndex = vegetables.findIndex(function (vegetable){
        return vegetable === req.body.vegetable
    })
    vegetables.splice(findVegetableIndex,1)
    res.redirect('/')
})






app.listen(port, (req,res)=>{
    console.log(`Running at port ${port}`)
})

