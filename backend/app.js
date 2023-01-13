const express = require('express');
const mongoose = require('mongoose');
const { readdirSync } = require('fs');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(cors());

//*all routes
readdirSync('./routes').map((r) => app.use('/', require('./routes/' + r)));

//* database
mongoose.connect(process.env.MONGO_DB_URL).then(() => console.log('database connected successfully')).catch((err) => console.log('error connecting to mongodb' , err));

const prot = process.env.PORT || 5002;

app.listen(prot, () => {
  console.log(`Server is on http://localhost:${prot}`);
});
