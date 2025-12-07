const express = require('express');
const path = require('path');
const router = require('./routes/router')
const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.set('views' , path.join(__dirname , 'views'))
app.use('/static' , express.static(path.join(__dirname , 'public')));
app.use('/', router)



app.listen(port, () => {
  console.log(`Server is listening on port ${port}✅`);
});