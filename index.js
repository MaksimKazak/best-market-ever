const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();

require('./models/User');
require('./models/Product');

const app = express();

mongoose.Promise = global.Promise;
mongoose.connect(
  process.env.MONGODB_URI || `mongodb://localhost:27017/best-market-ever`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

app.use(bodyParser.json());

require('./routes')(app);

app.get('/', function (req, res) {
  res.send('Hello World!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`app running on port ${PORT}`)
});