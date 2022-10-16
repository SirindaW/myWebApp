import React, { useState } from "react";
import { Card, CardActions, CardContent, CardMedia, Button, Typography, ButtonBase } from '@material-ui/core';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined';
import DeleteIcon from '@material-ui/icons/Delete';
import moment from 'moment';
import useStyles from './styles.js';
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { deletePost, likePost } from "../../../actions/posts.js";
import logo from '../../../images/logo.png';
import { postUrl } from "../../../constants/pathUrl.js";

const Post = ({ post, setCurrentId }) => {    //props.post
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const user = JSON.parse(localStorage.getItem('profile'));
    const [likes, setLikes] = useState(post?.likes);

    const userId = user?.result?.googleId || user?.result?._id;
    const hasLikedPost = likes.find((like) => like === userId);

    const LikeCount = () => {
        return hasLikedPost
        ? (
            <>{likes.length > 1 ? `You and ${likes.length - 1} other${likes.length > 2 ? 's' : ''}` : 'You'}</> // liked
        ) : (
            <>{likes.length}</> // not like yet
        );
    };

    const LikeBtn = () => {
        return hasLikedPost
        ? (
            <><ThumbUpAltIcon fontSize="small" /></> // liked
        ) : (
            <><ThumbUpAltOutlined fontSize="small" /></> // not like yet
        );
    };

    const handleLike = async () => {
        dispatch(likePost(post._id));

        if (hasLikedPost) {
            setLikes(post.likes.filter((id) => id !== userId)); // unlike
        } else {
            setLikes([ ...post.likes, userId]);
        };
    };
    
    const openPost = () => history.push(`${postUrl}/details/${post._id}`);


    return (
        <Card className={classes.card} raised elevation={6}>
            <ButtonBase className={classes.cardAction} onClick={openPost}>
                {/* post img */}
                <CardMedia className={classes.media} image={post.selectedFile ? post.selectedFile : logo} title={post.title} />

                {/* post creator and date */} 
                <div className={classes.overlay}>
                    <Typography variant="h6">{post.name}</Typography>
                    <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
                </div>

                {/* post edit button */} 
                {/* {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
                    <div className={classes.overlay2}>
                        <Button style={{color: 'white'}} size="small" onClick={() => setCurrentId(post._id)}>
                            <MoreHorizIcon fontSize="medium" />
                        </Button>
                    </div>
                )} */}

                {/* post tags */}
                <div className={classes.details}>
                    <Typography variant="body2" color="textSecondary">{post.tags.map((tag) => `#${tag} `)}</Typography>
                </div>

                {/* post title */}
                <Typography className={classes.title} variant="h5" gutterBottom>{post.title}</Typography>

                {/* post message */}
                <CardContent className={classes.ellipsis}>
                    <Typography variant="body1" color="textSecondary">{post.message}</Typography>
                </CardContent>
            </ButtonBase>

            {/* post like count */}
            {likes.length > 0 &&
                <div className={classes.likeCount}>
                    <ThumbUpAltIcon fontSize="small" color="disabled" />&nbsp;
                    <Typography variant="body2" color="textSecondary"><LikeCount /></Typography>
                </div>
            }   

            {/* post like and delete button */}
            <CardActions className={classes.cardActions}>
                {/* like button */}
                <Button size="small" color="primary" disabled={!user?.result} onClick={handleLike}>
                    <LikeBtn />&nbsp;Like
                </Button>
                {/* delete button */}
                {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
                    <Button size="small" color="primary"  onClick={() => dispatch(deletePost(post._id))}>
                        <DeleteIcon fontSize="small" />&nbsp;Delete
                    </Button>
                )}
            </CardActions>
        </Card>
    );
};

export default Post;