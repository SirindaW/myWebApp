import React from "react";
import { Paper, CircularProgress, Grid, Typography } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';

import Post from './Post/Post.js';
import useStyles from './styles.js';

const Posts = ({ setCurrentId }) => {
    const { posts, isLoading } = useSelector((state) => state.posts); 
    const classes = useStyles();

    if (!posts.length && !isLoading) return <Typography variant="h4" align="center" color="primary">No Posts</Typography>

    return (
            isLoading ? (<div className={classes.loadingPaper}><CircularProgress size='7em' /></div>) : (
            <Grid className={classes.container} container alignItems="stretch" spacing={3}>
                {posts.map((post) => (
                    <Grid key={post._id} item xs={12} md={6} lg={4}>
                        <Post post={post} setCurrentId={setCurrentId} />
                    </Grid>
                ))}
            </Grid>
        )
    );
};

export default Posts;