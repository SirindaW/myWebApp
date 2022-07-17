import React from "react";
import { Grid, Typography, CircularProgress } from '@material-ui/core';
import { useSelector } from "react-redux";
import Post from './Post/Post.js';
import useStyles from './styles.js';

const Posts = ({ setCurrentId }) => {
    const posts = useSelector((state) => state.posts);
    const classes = useStyles();

    console.log(posts);

    return (
        !posts.length ? <Typography variant="h4" align="center" style={{color: "white"}}>No Posts Yet</Typography> : (
            <Grid className={classes.container} container alignItems="stretch" spacing={3}>
                {posts.map((post) => (
                    <Grid key={post._id} item xs={12} md={6}>
                        <Post post={post} setCurrentId={setCurrentId} />
                    </Grid>
                ))}
            </Grid>
        )
    );
};

export default Posts;