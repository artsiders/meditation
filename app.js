const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const meditationRoute = require('./routes/meditation.route')
const usersRoute = require('./routes/user.route')
const subscriptionRoute = require('./routes/subscription.route');
const fakeData = require('./helpers/fakeData.route')
const evangileRoute = require("./routes/evangile.route")


const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors());

app.use('/meditations', meditationRoute);

app.use('/users', usersRoute);
app.use('/subscribe', subscriptionRoute);

app.use('/fake', fakeData)

app.use("/evangiles", evangileRoute)

// mongoose.connect('mongodb://localhost:27017/meditation',
mongoose.connect('mongodb+srv://meditation:8vbSf62dopgfgNqL@meditation1.aw8ribq.mongodb.net/?retryWrites=true&w=majority',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

module.exports = app;
