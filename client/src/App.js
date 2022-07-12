import React, { useState, useEffect } from 'react';
import { Container, AppBar, Typography, Grow, Grid } from '@material-ui/core'
import { useDispatch } from 'react-redux';

import { getPosts } from './actions/posts.js';
import Posts from './components/Posts/Posts.js';
import Form from './components/Form/Form.js';
import logo from './images/logo.jpg';
import useStyles from './styles.js';

const App = () => {
    const [currentId, setCurrentId] = useState(null);
    const classes = useStyles();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPosts());
    }, [dispatch]);

    return(
        <Container maxWidth='lg'>
            {/* header bar */}
            <AppBar className={classes.appBar} position='static' color='inherit'>
                <Typography className={`${classes.heading} ${classes.headsize}`} variant='h3' align='center'>MyFeed</Typography>
                <img className={classes.image} src={logo} alt='logo' height='90' />
            </AppBar>
            {/* load effect */}
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
        </Container>
    );
}

export default App;