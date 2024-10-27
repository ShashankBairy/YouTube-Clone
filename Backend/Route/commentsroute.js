import express from 'express'
import {addComment, getComment} from '../Controller/commentscontroller.js' 


const router = express.Router();

router.post('/addComment', addComment)

router.get('/:videoId',getComment)

export default router;
