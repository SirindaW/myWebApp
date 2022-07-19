import React from "react";
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from '@material-ui/core';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import moment from 'moment';
import useStyles from './styles.js';
import { useDispatch } from "react-redux";

import { deletePost, likePost } from "../../../actions/posts.js";
import logo from '../../../images/logo.jpg';

const Post = ({ post, setCurrentId }) => {    //props.post
    const classes = useStyles();
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem('profile'));

    const LikeCount = () => {
        return post.likes.find((like) => like === (user?.result?.googleId || user?.result?._id))
        ? (
            <>{post.likes.length > 1 ? `You and ${post.likes.length - 1} other${post.likes.length > 2 && 's'}` : 'You'}</> // liked
        ) : (
            <>{post.likes.length}</> // not like yet
        );
    };

    const LikeBtn = () => {
        return post.likes.find((like) => like === (user?.result?.googleId || user?.result?._id))
            ? (
                <><ThumbUpAltIcon fontSize="small" /></> // liked
            ) : (
                <><ThumbUpAltOutlined fontSize="small" /></> // not like yet
            );
    }
    
    return (
        <Card className={classes.card}>
            {/* post img */}
            <CardMedia className={classes.media} image={post.selectedFile ? post.selectedFile : logo} title={post.title} />

            {/* post creator and date */} 
            <div className={classes.overlay}>
                <Typography variant="h6">{post.name}</Typography>
                <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
            </div>

            {/* post edit button */} 
            <div className={classes.overlay2}>
                <Button style={{color: 'white'}} size="small" onClick={() => setCurrentId(post._id)}>
                    <MoreHorizIcon fontSize="medium" />
                </Button>
            </div>

            {/* post tags */}
            <div className={classes.details}>
                <Typography variant="body2" color="textSecondary">{post.tags.map((tag) => `#${tag} `)}</Typography>
            </div>

            {/* post title */}
            <Typography className={classes.title} variant="h5" gutterBottom>{post.title}</Typography>

            {/* post message */}
            <CardContent>
                <Typography variant="body1" color="textSecondary">{post.message}</Typography>
            </CardContent>

            {/* post like count */}
            {post.likes.length > 0 &&
                <div className={classes.likeCount}>
                    <ThumbUpAltIcon fontSize="small" color="disabled" />&nbsp;
                    <Typography variant="body2" color="textSecondary"><LikeCount /></Typography>
                </div>
            }   

            {/* post like and delete button */}
            <CardActions className={classes.cardActions}>
                {/* like button */}
                <Button size="small" color="primary" disabled={!user?.result} onClick={() => dispatch(likePost(post._id))}>
                    <LikeBtn />&nbsp;Like
                </Button>
                {/* delete button */}
                <Button size="small" color="primary" disabled={!user?.result} onClick={() => dispatch(deletePost(post._id))}>
                    <DeleteIcon fontSize="small" />&nbsp;Delete
                </Button>
            </CardActions>
        </Card>
    );
};

export default Post;