import express from 'express';

const router = express.Router();

import login from './login.route';
import signup from './signup.route';
import doctor from './doctor.route';
import person from './person.route';


router.use('/', login);
router.use('/signup', signup);
router.use('/doctor', doctor);
router.use('/person', person);


export default router;
