import express from 'express';
import { main_get, record_get } from '../controllers/person.controller';



const router = express.Router();


router.get('/', main_get);
router.get('/record', record_get);





export default router;
