const express = require('express')
const path = require('path')
const exphbs = require('express-handlebars')
const logger = require('./logger')

const app = express()

// Handle Middlebars
app.engine('handlebars', exphbs({defaultLayout:'main'}))
app.set('view engine', 'handlebars')

//We are initializing the middleware
app.use(logger)

//Body parser middleware
app.use(express.json())
app.use(express.urlencoded({extended: false}))


//Set static folder
app.use(express.static(path.join(__dirname,"public")))

app.use('/api/members', require('./routes/apis/users'))

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server started running on port: ${PORT}` ));