const express = require('express');
const Joi = require('joi');

const app = express();
const port = process.env.PORT || 3000;

app.get('/',(req,res)=>{
    res.send('Hello in our REST API.');
});

var quotes = {
    'einstein' : 'The only reason for time is so that everything doesn\'t happen at once.',
    'tesla': 'The scientists of today think deeply instead of clearly. One must be sane to think clearly, but one can think deeply and be quite insane.'
}

app.get('/quotes/:name',(req,res)=>{
    res.send(quotes[req.params.name]);
});

app.get('/post/:month/:year', (req,res)=>{
    res.send('date is : ' +JSON.stringify(req.params));
});

let students = [
    {id:1, name : "std1"},
    {id:2, name : "std2"},
    {id:3, name : "std3"}
];


app.get('/api/students', (req,res)=>{
    res.send(students);
});
app.get('/api/students/:id', (req,res)=>{
    const student = students.find(s=>s.id === parseInt(req.params.id));
    if(!student)
        return res.status(404).send('Student id not found');
    res.send(student);
});

app.use(express.json());

const schema = Joi.object({
    name: Joi.string().min(3).required()
});

app.post('/api/students', (req,res)=>{
    const results=schema.validate(req.body)
    if(results.error){
        return res.status(400).send(results.error.details[0].message);
    }
    const student = {
        id : students.length+1,
        name : req.body.name
    };
    students.push(student);
    res.send(student);
});

app.listen(port,()=>console.log(`Server runnig on ${port}`));