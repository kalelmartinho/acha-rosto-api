import express from 'express';
import bcrypt from 'bcrypt';
import cors from 'cors';
import knex from 'knex';
import Register from './controllers/Register.js';
import Image from './controllers/Image.js';
import ApiCall from './controllers/ApiCall.js'
import SignIn from './controllers/SignIn.js';
import ProfileGet from './controllers/Profile.js';

const app = express();

const db = knex({
  client: 'pg',
  connection: {
    connectionString: process.env.DATABASE_URL,
    ssl: {
    rejectUnauthorized: false
    },
  },
});

db.select('*').from('users').then((data) => {});

app.use(express.json());

app.use(cors());

app.get('/', (req, res) => {res.send('200')});

app.post('/signin',  SignIn(bcrypt, db)); 

app.post('/register', Register(bcrypt, db));

app.get('/profile/:id', ProfileGet(db));

app.put('/image', Image(db));

app.post('/imageurl', (req, res) => {ApiCall(req, res)});

app.listen(process.env.PORT, () => {console.log(`app is running on port ${process.env.PORT}`)});
