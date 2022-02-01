const express = require('express');
//const log = require('./log');
const morgan = require('morgan');
const config = require('config');
const appDebug = require('debug')('app:debug');
const appDB = require('debug')('app:db');
const student_router=require('./routers/students');
const index_router=require('./routers/root');


appDebug('Application name :', config.get('app_name'));
appDB('DB credts : host', config.get('DB.host'));
appDB('DB credts : password', config.get('DB.password'));


const app = express();
const port = process.env.PORT || 3000;

app.use('/api/students',student_router);
app.use('/',index_router);




//console.log(process.env.NODE_ENV);
appDebug('Mode :',app.get('env'));

if(app.get('env') === 'development'){
    app.use(morgan('dev'));
}


app.use(express.json());



app.listen(port,()=>appDebug(`Server runnig on ${port}`));