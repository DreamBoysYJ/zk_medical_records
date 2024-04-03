import express from 'express';
import { login_post } from '../controllers/login.controller';

const router = express.Router();



router.post('/', login_post);




export default router;
