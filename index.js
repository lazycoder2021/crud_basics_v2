const express = require('express'); 
const app = express(); 
require('dotenv').config({}); 
const mongoose = require('mongoose'); 
const session = require('express-session');
const MongoStore = require('connect-mongo'); 
const cookieparser = require('cookie-parser');

app.use(cookieparser());
app.use(express.json());

app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: 'mongodb+srv://dbuser:dbuser@cluster0.pojzjzr.mongodb.net/?retryWrites=true&w=majority', collection: 'sessions' }),
    cookie: { maxAge: 1000 * 60 * 60 * 24 }
}))

//console.log(session)


const router = require('./routes/routes'); 


 
app.use('/', router);
app.use(express.static('public')); 




app.listen(process.env.PORT, function () {
    console.log(`server up and running @ ${process.env.PORT}`)

    //mongoose.connect('mongodb://localhost:27017/contactsMgr'); 

   mongoose.connect('mongodb+srv://dbuser:dbuser@cluster0.pojzjzr.mongodb.net/?retryWrites=true&w=majority');
    mongoose.connection.on('open', function () {
        console.log('db connected...')
    })
})


