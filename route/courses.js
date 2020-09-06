const express = require('express');
const router = express.Router();

const courses = [
    {
        id: 1,
        name: "shon"
    }
]

router.get('/',(req,res)=>{
    res.send(courses);    
});
// app.post()
// app.put()
// app.delete()

router.get('/:id', (req,res)=>{
    const course = courses.find(c=> c.id=== req.params.id);
    if(!course){
        res.status(404).send('not found')
    }
    res.send(course);
});


router.post('/', (req,res)=>{

    const schema = Joi.object({
        name: Joi.string().min(3).required()
    });

    const result = schema.validate({name : req.body.name});
    if(result.error){
        res.status(400).send(result.error.details[0].message);
        return;
    }

    const course = {
        id: courses.length+1,
        name: req.body.name
    }
    courses.push(course);
    res.send(course);
});


module.exports = router;