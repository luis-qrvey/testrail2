const express = require('express')
// const bodyParser = require('body-parser')
const app = express()
const port = 3000

var router = express.Router();
var path = __dirname + '/views/'

const Testrail = require('testrail-api')
const testrail = new Testrail({
    host: 'https://qrvey.testrail.com',
    user: 'luis.morillo@qrvey.com',
    password: 'Abc123456'
})

// router.use(function(req, res, next){
//     console.log('/' + req.method)
//     next()
// })

app.get('/', function(req,res){
    testrail.getCase('49438', function(err, response, testcase){
        console.log(testcase.title)
    })
    res.sendFile(path + 'home.html')
})


 
// POST /login gets urlencoded bodies
//app.get('/submitvalue/:id', function (req, res) {
app.get('/submitvalue', function (req, res) {
  console.log('hello')
  console.log('welcome 1, ', req.query.name)
  testrail.getCase(req.query.name, function(err, response, testcase){
      if (testcase == undefined) return res.send("That one doesn't exist")
      console.log(testcase)
      testrail.getUser(testcase.created_by, (err, response, user) => {
        res.send(`
            <html>
            <head>
            <link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.1/css/bootstrap.min.css">
            <script src="//maxcdn.bootstrapcdn.com/bootstrap/3.3.1/js/bootstrap.min.js"></script>
            </head>
            <body>
                <div>
                    <div>
                    <nav class="navbar navbar-inverse" role="navigation" style="padding-left:130px;">
                            <ul class="nav navbar-nav">
                            <li class="active"><a href="/">Home<span class="sr-only">(current)</span></a></li>
                        </ul>
                    </nav>
                    </div>
                <br/>
                <b>The test case title is "${testcase.title}"</b>
                <br>
                <b>The one who did it was "${user.name}"<b>
                </div>
            </body>
            </html>`)
      })
  })
             

    // testrail.getCase('49438', function(err, response, testcase){
    //     console.log(testcase)
    //     testrail.getUser(testcase.created_by, (err, response, user) => {
    //         console.log(user.name)
    //         res.send(`
    //         <b>Hello World 123! ""</b>
    //         `)
    //     })
    // })

})


//app.use('/', router)

// app.use('*', function(req,res){
//     res.sendFile(path + '404.html')
// })

// const Testrail = require('testrail-api')
// const testrail = new Testrail({
//     host: 'https://qrvey.testrail.com',
//     user: 'luis.morillo@qrvey.com',
//     password: 'XREc.khft9qB9gIyGqMB-4J2LAyHsbz0p3EtZWFcP'
// })

// testrail.getCase('49438', function(err, response, testcase){
//     console.log(testcase)
//     testrail.getUser(testcase.created_by, (err, response, user) => {
//         console.log(user.name)
//     })
//     // app.get('/hi', (req,res) => res.send(`
//     // <b>Hello World 123! "${testcase.title}"</b>
//     // `))
// })


app.listen(port, () => console.log(`Example app listening on port ${port}!`))