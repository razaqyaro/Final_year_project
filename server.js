const express = require('express')
const app = express()
const bodyparser = require('body-parser')
const port = process.env.PORT || 5000
const fs = require('fs')

// setting and using ejs
app.set('view engine', 'ejs')
app.use(express.static('public'))

// Body-parser middleware
app.use(bodyparser.urlencoded({extended:false}))
app.use(bodyparser.json())

// users database
const USERS = []

// write details into a file

function store(details){
    fs.appendFileSync('./logs/_doc.json', JSON.stringify(details), (err) =>{
        if (err) console.log(err)
        else console.log("details recorded successfully")
    })
}

// login page
app.get('/', (req, res) => {
    res.render('login',{
        error: "",
        message: "",
        register: "register"
    })
})

// register rout
app.get('/register', (req, res) => {
    res.render('register',{
        error: "",
        message: "",
        login: "/",
        register: "register",
    })

})

// register details
app.post('/register', (req, res) => {
    USERS.push({
        username: req.body.username,
        index_number: req.body.index_number,
        password: req.body.password,
        phone: req.body.phone_number,
        DoB: req.body.DoB
    })

    res.send("<h1> user addad successfully  <a href='/'>login page<a>")

    // saving user in a file __doc
    store({
        title: "==== NEW USER ===== ",
        username: req.body.username,
        index_number: req.body.index_number,
        password: req.body.password,
        phone: req.body.phone_number,
        DoB: req.body.DoB
    })
})

// login in with route data
app.post('/', (req, res) => {

    const user = USERS.find(user => user.username)

    if (!user && USERS.length === 0){
        res.send(`<h1> Wrong User details, enter correct details <a href='/'>login<a> </h1>`)
      
    }
    else{
        res.send(`<h1> Welcome ${user.username}! </h1>`)
    }
    //console.log(user)
})


app.listen(port, (err) => console.log('app listening port: '+  port) )
  