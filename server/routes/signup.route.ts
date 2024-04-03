import express from 'express';
import { singup_doctor_post, singup_person_post} from '../controllers/signup.controller';


const router = express.Router();



router.post('/doctor', singup_doctor_post);
router.post('/person', singup_person_post);




export default router;
