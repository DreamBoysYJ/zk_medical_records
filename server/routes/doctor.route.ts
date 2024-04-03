import express from 'express';
import { write_post } from '../controllers/doctor.controller';

const router = express.Router();




router.post('/write', write_post);




export default router;
