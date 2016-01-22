var mongoose = require('mongoose');

var newPerson = new mongoose.Schema({

//  --------------------------  Person object part  --------------------------
    name: {
        nameToDisplay: String,
        firstName: String,
        secondName: String
    },
    thumbnailPhoto: String,
    photo : String,
    password: String,
    email: String,
    mainPhone: String,
    phoneNumbers: [],
    balance: String,
    social: {
        vk: String,
        facebook: String,
        twitter: String,
        google: String
    },
    role: String,
//  --------------------------  Jurist object part  --------------------------
    rating: Number,
    categories: [],
    work: [
        {
            name: String,
            position: String,
            startDate: { type: Date},
            endDate: { type: Date}
        }
    ],
    education: [
        {
            name: String,
            startDate: { type: Date},
            endDate: { type: Date},
            department: String,
            level: String
        }
    ],
    google: {
        id: String,
        token: String,
        email: String,
        name: String
    },
    facebook: {
        id: String,
        token: String,
        email: String,
        name: String
    }
});

var person = mongoose.model('person', newPerson);

module.exports = person;