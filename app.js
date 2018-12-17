const express = require('express')
const app = express()
const logger = require('./logger')
const helmet = require('helmet')
const morgan = require('morgan')
const mongoose = require('mongoose')
const config = require('config')
const debug = require('debug')('app:start')

const coursesRoute = require('./routes/course')
const bookRoute = require('./routes/book')
const genreRoute = require('./routes/genres');

mongoose.connect("mongodb://localhost/test",{useNewUrlParser:true},()=>{
    console.log('database connected')
})

app.set('view engine','pug');
app.set('views', './views');
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));

app.use("/api/courses", coursesRoute);
app.use('/api/books', bookRoute);
app.use('/api/genres', genreRoute);

app.use(helmet())

//Configuration
console.log("Application Name: " + config.get('name'))
console.log("Mail Server: " + config.get('mail.host'))
// console.log("Mail Pass: " + config.get('mail.password'))

if(app.get('env')=== 'development'){
    app.use(morgan('tiny'))
    debug('Morgan enabled')
}

app.get('/',(req,res)=>{
    res.render('index',{title: "hi there", message: "ok"})
})

app.use(logger)

const port = process.env.PORT || 3000;
app.listen(port,()=>console.log(`listening on port ${port}....`))