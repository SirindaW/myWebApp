import React, { useState, useEffect } from 'react';
import { Container, Grow, Grid } from '@material-ui/core'
import { useDispatch } from 'react-redux';
import Posts from '../Posts/Posts.js';
import Form from '../Form/Form.js';
import useStyles from './styles.js';
import { getPosts } from '../../actions/posts.js';

const Home = () => {
    const [currentId, setCurrentId] = useState(null);
    const dispatch = useDispatch();
    const classes = useStyles();

    useEffect(() => {
        dispatch(getPosts());
    }, [currentId, dispatch]);

    return (
        <Grow in>
            <Container>
                <Grid  className={classes.mainContainer} container justifyContent='space-between' alignItems='stretch' spacing={3}>
                    {/* posts */}
                    <Grid item xs={12} sm={7}>
                        <Posts setCurrentId={setCurrentId} />
                    </Grid>
                    {/* form */}
                    <Grid item xs={12} sm={5} md={4}>
                        <Form currentId={currentId} setCurrentId={setCurrentId} />
                    </Grid>
                </Grid>
            </Container>
        </Grow>
    )
}

export default Home