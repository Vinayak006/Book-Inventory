const express = require('express');
const app = express();
const router = require('./router');

app.use('/', express.static("./public"));
app.use(router);
app.set('view engine', 'ejs')

app.listen(8000, ()=>{console.log("listening to 8000");});