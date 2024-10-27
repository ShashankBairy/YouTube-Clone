import express from 'express'
import {createChannel, getChannel} from '../Controller/channelcontroller.js'

const router = express.Router()

router.post('/create', createChannel);
router.get('/:id', getChannel);
    
export default router;