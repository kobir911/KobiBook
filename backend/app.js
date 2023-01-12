import express from 'express';
import dotenv from 'dotenv';
import cors  from 'cors';
app.use(cors());



dotenv.config();

const app = express();

const prot = process.env.PORT || 5002;

app.listen(prot, () => {
  console.log(`Server is on http://localhost:${prot}`);
});
