
//create user scheem for show colllection db
const mongoose = require('mongoose');


const userScheema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String


    },
    name: {
        type: String,
    },
    subscriber: {
        type: Number,
        default: 0
    },
    subscribedUsers: {
        //arraye me sare user ko add 
        type: [String]
    }
},
    { timestamps: true }
);


module.exports = mongoose.model("User", userScheema)

