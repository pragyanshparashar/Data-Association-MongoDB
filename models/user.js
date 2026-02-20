const mongoose =require('mongoose');

mongoose.connect('mongodb://localhost:27017/associationDB');

const userSchema = mongoose.Schema({
     name : String,
    username : String,
    email : String,
    password : String,
    age: Number,
    profilepicture: {
        type : String,
        default: 'profile.jpg'

    },

    posts: [{type: mongoose.Schema.Types.ObjectId, ref: 'post'}]

})

module.exports = mongoose.model('user', userSchema);