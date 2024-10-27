import Comment from '../Model/commentsmodel.js';

export const addComment = async (req, res) => {
    const { videoId, userId, text, timestamp } = req.body; 

    if (!videoId || !text ) {
        return res.status(400).json({ message: 'All fields are required' });
    }
    try {
        const comment = new Comment({ videoId, userId, text, timestamp });
        const savedComment =  await comment.save();
        res.status(201).json({ message: 'Comment added successfully', comment:savedComment });
    } catch (error) {
        res.status(500).json({ message: 'Error adding comment', error });
    }
};

export const getComment = async (req, res) => {
    const { id } = req.params; // This will refer to videoId

    try {
        const comments = await Comment.find({ id}); // Ensure Comment model has videoId

        if (comments.length === 0) {
            return res.status(404).json({ message: 'No comments found for this video' });
        }

        res.status(200).json({ comments });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching comments', error });
    }
};
