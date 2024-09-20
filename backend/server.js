require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const taskerRouter = require('./routes/taskerRoutes')
const cors = require('cors')
const userRoutes = require('./routes/user')
//express app
const app = express()

//cors


//db
mongoose.connect(process.env.DBURI)
.then(result =>{
    app.listen(process.env.PORT);
    console.log('connected')

})
.catch(err => console.log(err))

console.log(process.env.PORT)
//middleware
app.use(express.json())
app.use((req , res , next)=>{
    console.log(req.url , req.method)
    next()
})

//listen

app.use('/api/tasker', taskerRouter)

app.use('/api/user' , userRoutes )


  