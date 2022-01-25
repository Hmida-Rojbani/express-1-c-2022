const express = require('express');

const app = express();

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

app.listen(3000,()=>console.log('Server runnig on 3000'));