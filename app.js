const express = require('express')
const app = express()
const Joi = require('joi');
const logger = require('./logger')
const helmet = require('helmet')
const morgan = require('morgan')

const config = require('config')

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));

app.use(logger)
app.use(helmet())

//Configuration
console.log("Application Name: " + config.get('name'))
console.log("Mail Server: " + config.get('mail.host'))
// console.log("Mail Pass: " + config.get('mail.password'))

if(app.get('env')=== 'development'){
    app.use(morgan('tiny'))
    console.log('Morgan enabled')
}


app.use(function(req,res,next){
    console.log("Authenticating...");
    next();
})

const courses = [
    {id: 1, name: 'course 1'},
    {id: 2, name: 'course 2'},
    {id: 3, name: 'course 3'},
]

app.get('/',(req,res)=>{
    res.send('Hello World')
})

app.get('/api/courses',(req,res)=>{
    res.send(courses);
})

app.get('/api/courses/:id',(req,res)=>{
    const course = courses.find(c => c.id === parseInt(req.params.id))
    if(!course) return res.status(404).send("The course was not found")
    else res.send(course)
})

app.post('/api/courses', (req,res)=>{
    const {error} = validateCourse(req.body);
    
    if(error){
        res.status(400).send(error.details[0].message);
        return;
    }

    const course = {
        id : courses.length + 1,
        name : req.body.name
    }
    courses.push(course);
    res.send(course)
})

app.put('/api/courses/:id', (req,res)=>{
    //look up the course
    const course = courses.find(c => c.id === parseInt(req.params.id))
    if(!course){
        res.status(404).send("The course was not found")
    }

    const {error} = validateCourse(req.body);
    
    if(error) return res.status(400).send(error.details[0].message);
    
    course.name = req.body.name;
    res.send(course)

})

app.delete('/api/courses/:id',(req,res)=>{
    //Look up the course
    const course = courses.find(c => c.id === parseInt(req.params.id))
    if(!course) return res.status(404).send("The course was not found")
    

    //Delete
    const index = courses.indexOf(course);
    courses.splice(index,1);

    res.send(course)
})



function validateCourse(course){
    const schema = {
        name : Joi.string().min(3).required()
    }

    return Joi.validate(course, schema);
    
}

const port = process.env.PORT || 3000;
app.listen(port,()=>console.log(`listening on port ${port}....`))