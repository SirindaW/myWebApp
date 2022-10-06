import React, { useState, useEffect } from 'react';
import { Container, Grow, Grid, Paper, AppBar, TextField, Button } from '@material-ui/core'
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import ChipInput from 'material-ui-chip-input';

import Posts from '../Posts/Posts.js';
import Form from '../Form/Form.js';
import useStyles from './styles.js';
import { getPosts, getPostsBySearch } from '../../actions/posts.js';
import Pagination from '../Pagination.jsx';

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const Home = () => {
    const [currentId, setCurrentId] = useState(null);
    const dispatch = useDispatch();
    const classes = useStyles();
    const query = useQuery();
    const history = useHistory();
    const page = query.get('page') || 1; // get value of page params at url
    const searchQuery = query.get('searchQuery'); // get value of searchQuery params at url
    const [search, setSearch] = useState('');
    const [tags, setTags] = useState([]);

    const searchPost = () => {
        if(search.trim() || tags.length !== 0) {
            dispatch(getPostsBySearch({ search, tags: tags.join(',') }));
            history.push(`/posts/search?searchQuery=${search}&tags=${tags.join(',')}`);
        } else {
            history.push('/posts');
        }
    };

    const handleKeyPress = (e) => {
        // 'enter' key is 13
        if(e.keyCode === 13) {
            searchPost();
        }
    };

    const handleAdd = (tag) => setTags([...tags, tag]);

    const handleDelete = (tagToDelete) => setTags(tags.filter((tag) => tag !== tagToDelete)); // return array of tag except tagToDelete

    return (
        <Grow in>
            <Container maxWidth="xl">
                <Grid className={classes.gridContainer} container justifyContent='space-between' alignItems='stretch' spacing={3}>
                    {/* posts */}
                    <Grid item xs={12} sm={6} md={9} style={{positon : 'relative'}}>
                        <Posts setCurrentId={setCurrentId} />
                    </Grid>
                    {/* form and search bar */}
                    <Grid item xs={12} sm={6} md={3}>
                        <AppBar className={classes.appBarSearch} position="static" color="inherit" >
                            <TextField 
                                name="search" 
                                variant="outlined" 
                                label="Search Posts" 
                                fullWidth 
                                value={search}
                                onKeyPress={handleKeyPress}
                                onChange={(e) => setSearch(e.target.value)} 
                            />
                            <ChipInput 
                                style={{ margin: '10px 0'}}
                                value={tags}
                                onAdd={handleAdd}
                                onDelete={handleDelete}
                                label="Search Tags"
                                variant="outlined"
                            />
                            <Button onClick={searchPost} className={classes.searchButton} color="primary" variant="contained">Search</Button>
                        </AppBar>
                        <Form currentId={currentId} setCurrentId={setCurrentId} />
                        {(!searchQuery && !tags.length) && (
                            <Paper elevation={6} className={classes.pagination}>
                                <Pagination page={page} />
                            </Paper>
                        )}
                    </Grid>
                </Grid>
            </Container>
        </Grow>
    )
}

export default Home