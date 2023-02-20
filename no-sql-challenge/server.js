const express = require('express');
const userRoutes = require('./routes/userRoutes')
const thoughtRoutes = require('./routes/thoughtRoutes')
const connectToMongo = require('./config/connect')

const app = express()
app.use('/api/users', userRoutes);
app.use('/api/thoughts', thoughtRoutes);

connectToMongo()

app.listen(3000, () => console.log("app listening on port 3000"));