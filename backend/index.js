const express = require('express')
const app = express()
const PORT = process.env.PORT || 5000
const cors = require('cors')
const mentorRouter = require('./routers/mentorRouter')

app.use(express.json())
app.use(cors())
app.use('/public' , express.static('public'))

app.use('/mentors' , mentorRouter)
app.use((error, req, res, next) => {
  return res.status(500).json({ error });
});

app.get('/' , (req,res) => {
    res.send('<h1> API MENTOR </h1>')
})

app.listen(PORT , () => {
    console.log('server running on port ' + PORT)
})

