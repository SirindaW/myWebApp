import React, { useState, useEffect } from "react";
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import FileBase from 'react-file-base64';
import { useDispatch, useSelector  } from "react-redux";
import { createPost, updatePost } from "../../actions/posts.js";
import { useHistory, useParams } from "react-router-dom";
import { postUrl } from "../../constants/pathUrl.js";

import useStyles from './styles.js';

// GET THE CURRENT ID

const Form = () => {
    const { id: currentId } = useParams();
    const [postData, setPostData] = useState({ 
        title: '', 
        message: '', 
        tags: '', 
        selectedFile: '' 
    });
    const post = useSelector((state) => currentId ? state.posts.posts.find((post) => post._id === currentId) : null);
    const classes = useStyles();
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem('profile'));
    const history = useHistory();

    useEffect(() => {
        if(post) setPostData(post); 
    }, [post])

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if(currentId){
            dispatch(updatePost(currentId, { ...postData, name: user?.result?.name }, history));
        } else {
            dispatch(createPost({ ...postData, name: user?.result?.name }, history));
        }
        
        clear();
    };

    const handleCancel = () => {
        if (currentId) {
            history.push(`${postUrl}/details/${currentId}`);
        } else {
            history.push(postUrl);
        };
    };

    if(!user?.result?.name) {
        return (
            <Paper className={classes.paper}>
                <Typography variant="h6" align="center">
                    Please Sign In to create your own posts and like other posts.
                </Typography>
            </Paper>
        )
    }

    const clear = () => {
        setPostData({ 
            title: '', 
            message: '', 
            tags: '', 
            selectedFile: '' 
        });
        document.querySelector("input[type='file']").value = "";
    };

    return (
        <div className={classes.container}>
            <Paper className={classes.paper} elevation={6}>
                {/* creating post form */}
                <form autoComplete='off' noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                    <Typography variant="h6">{currentId ? 'Editing' : 'Creating'} a Post</Typography>

                    {/* title input */}
                    <TextField name="title" variant="outlined" label="Title" fullWidth value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })} />

                    {/* message input */}
                    <TextField name="message" variant="outlined" label="Message" fullWidth value={postData.message} multiline minRows={4} onChange={(e) => setPostData({ ...postData, message: e.target.value })} />

                    {/* tags input */}
                    <TextField name="tags" variant="outlined" label="Tags (comma separated)" fullWidth value={postData.tags} onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })} />

                    {/* file input */}
                    <div className={classes.fileInput}>
                        <FileBase multiple={false} onDone={({base64}) => setPostData({ ...postData, selectedFile: base64 })} />
                    </div>

                    {/* submit button */}
                    <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>

                    {/* cancel button */}
                    {/* <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button> */}
                    <Button variant="contained" color="secondary" size="small" onClick={handleCancel} fullWidth>Cancel</Button>
                </form>
            </Paper>
        </div>
    );
};

export default Form;