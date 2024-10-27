import express from 'express'
import {addVideo, deleteVideo, editVideo, getVideoById, getVideos} from '../Controller/videocontroller.js'
import { authenticateToken } from '../Controller/usercontroller.js'


const router = express.Router()

router.post('/add',authenticateToken, addVideo)

router.get('/', getVideos);

router.put('/:id', authenticateToken,editVideo);

router.delete('/:id',deleteVideo);

router.get('/:id',getVideoById)

export default router;
