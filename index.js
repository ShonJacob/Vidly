const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
.then(()=>{
    console.log("Connected to mongodb");
})
.catch(err => console.error('could not connect to mongodb', err));


const courseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 30
    },
    category:{
        type: String,
        required: true,
        enum: ['web', 'mobile', 'network']
    },
    author: String,
    tags: {
        type: Array,
        validate: {
            validator: function(v){
                return v && v.length>0;
            },
            message: 'A coruse should have atleast one tag'
        }
    },
    date: {type: Date, default: Date.now},
    isPublished: Boolean,
    price: {
        type: Number,
        required: function(){
            return this.isPublished; // arrow functions do not have their own this.
        },
        min: 10,
        max: 200
    }
});

//Classes and objects
//Modal
//we get a course class(document)
//automatically looks for plural,lowercase document 
const Course = mongoose.model('courses', courseSchema);


async function createCourse(){
    const course = new Course({
        name: 'Angular Course',
        author: 'Shon',
        tags: ['frontend'],
        isPublished: true,
        price: 11,
        category: 'web'
    });
    try{
        // await course.validate();
        const result = await course.save();
        console.log(result);
    }    
    catch(err){
        for(field in err.errors){
            console.log(err.errors[field].message);
        }
    }
    
}
// createCourse();

//async function getCourses(){
    // In mongo we have eq(equal), new(not equal), gt(greater than), gte(greater than or equal),lt(less than), lte(lessthan or equal), in, nin(not in)
    // or, and
    //const result = await Course.find();
    //const pageNumber=2;
    //const pageSize =10;
    //result = await Course
    // .find({author: 'Shon', isPublished: true})
    // .find({price: 10})
    // .find({price: {$gte : 10, $lt: 20}})
    // .find({price: {$in: [10,15,20]}})
    // .find()
    // .and([{author: 'Shon'}, {isPublished: true}])
    //.find({author: /^Shon/}) // regular expression, ^ starts with something, Shon$ (ends with Shon), contains (/.*Shon.*/)
    // .skip((pageNumber-1) * pageSize) 
    //.limit(pageSize)
    //.sort({name: 1}) //ascending order, -1 for descending // or 'name' '-name'
    // .select({name:1, tags:1});
    // .count();
    //console.log(result);
//}


// getCourses();


async function updateCourse(id){
 // Query first
 //FindbyID , modify, save
//  const course = await Course.findById(id);
//  if(!course){
//      return;
//  }
// //  course.isPublished = true;
// //  course.author = 'Another Author';
//  course.set({
//      isPublished : true,
//      author: 'Another Author'
//  })

// const result = await course.save();
// console.log(result);




 //Update first
 //Update directly in DB
//  const result = await Course.update({_id: id}, {
//     $set: {
//         author: 'Shon1',
//         isPublished: false
//     }
//  });

const result = await Course.findByIdAndUpdate(id, {
    $set : {
        author: 'Shon123',
        isPublished: false
    }  
},
{new: true});
 
 console.log(result);
 
}

// updateCourse('5f4c759be58ff64890fe731d');

async function removeCourse(id){
   const result = await Course.deleteOne({_id: id})
   console.log(result);
}

// removeCourse('5f4c759be58ff64890fe731d')


//Trade off between query performance vs consistency

//using normalization

// using embedded documents (denormalization)


// populate('author')