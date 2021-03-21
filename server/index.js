if(process.env.NODE_ENV != 'production'){
  require('dotenv').config()
}

const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const passport = require('passport')
const flash = require('connect-flash')
const app = express()
const connectDB = require('./config/database')

// Connect to the database
connectDB()
// mongoose.connect(process.env.DB_URL, { 
//   useNewUrlParser: true, 
//   useUnifiedTopology: true,
//   useFindAndModify: false 
// });
// var db = mongoose.connection
// db.on('error', console.error.bind(console, 'MongoDB connection error.'))
// db.once('open', () => console.log('Database is connected...'))

app.use(bodyParser.json())
app.use(cors())
app.use(flash())
app.use('/public', express.static('./public'))

// Express session
const expressSession = require('express-session')({
  secret: 'secret',
  resave: false,
  saveUninitialized: false
})
app.use(expressSession)

// Passport
require('./config/passport')(passport)
app.use(passport.initialize());
app.use(passport.session())

const indexRoute = require('./routes/index')
const productRoute = require('./routes/product')
const productAnimalRoute = require('./routes/animalProduct')
const userRoute = require('./routes/user')

app.use('/', indexRoute)
app.use('/products', productRoute)
app.use('/products/animals', productAnimalRoute)
app.use('/user', userRoute)

app.listen(process.env.PORT || 8080, () => {
  console.log(`Server starts at port ${process.env.PORT || 8080}`)
})
