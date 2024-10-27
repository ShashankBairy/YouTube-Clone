import express from 'express'
import {signupUser, login} from '../Controller/usercontroller.js'

const router = express.Router();

router.post('/signup', signupUser);

router.post('/login', login);

export default router;
