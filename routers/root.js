const router = require('express').Router();

router.get('',(req,res)=>{
    res.send('Hello in our REST API.');
});

module.exports=router;