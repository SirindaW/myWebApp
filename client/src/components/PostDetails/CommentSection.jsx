import React, { useState, useRef } from 'react';
import { Typography, TextField, Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';

import useStyles from './styles.js';
import { commentPost } from '../../actions/posts';

const CommentSection = ({ post }) => {
    const classes = useStyles();
    const [comments, setComments] = useState(post?.comments);
    const [comment, setComment] = useState('');
    const user = JSON.parse(localStorage.getItem('profile'));
    const dispatch = useDispatch();
    const commentsRef = useRef();

    const handleClick = async () => {
        const finalComment = `${user.result.name}: ${comment}`;

        const newComments = await dispatch(commentPost(finalComment, post._id));

        setComments(newComments);
        setComment('');

        commentsRef.current.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "start" });

    };

    return (
        <div>
            <div className={classes.commentsOuterContainer}>
                {user && (
                    <div style={{ width: '100%' }}>
                        <Typography gutterBottom variant="h6">Write a Comment</Typography>
                        <TextField 
                            fullWidth
                            minRows={4}
                            variant='outlined'
                            label='Comment'
                            multiline
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        />
                        <Button style={{ marginTop: '10px'}} fullWidth disabled={!comment.trim().length} variant='contained' color='primary' onClick={handleClick}>
                            Comment
                        </Button>
                    </div>
                )}
                <div className={classes.commentsInnerContainer}>
                    <Typography gutterBottom variant="h6">Comments</Typography>
                    {comments.length > 0 ? 
                        (comments.map((c, i) => (
                            <Typography key={i} gutterBottom variant="subtitle1">
                                <strong>{c.split(': ')[0]}</strong>:&nbsp;
                                {c.split(': ')[1]}
                            </Typography>
                        ))) : <Typography variant="h6" style={{ textAlign: 'center', opacity: '0.6' }}>No Comment Yet</Typography>
                    }
                </div>
            </div>
        </div>
    );
};
export default CommentSection;