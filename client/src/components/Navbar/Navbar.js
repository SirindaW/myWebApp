import React, { useState, useEffect } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { AppBar, Avatar, Button, Toolbar, Typography } from '@material-ui/core'
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';
import logo from '../../images/logo.png';
import useStyles from './styles.js';
import { postUrl } from '../../constants/pathUrl';

const Navbar = () => { 
    const classes = useStyles();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();
    
    const logout = () => {
        dispatch({ type: 'LOGOUT' });
        history.push('/');
        setUser(null);
    };

    const handleCreate = () => history.push(`${postUrl}/create`);

    useEffect(() => {
        const token = user?.token;

        if (token) {
            const decodedToken = decode(token);

            if(decodedToken.exp * 1000 < new Date().getTime()) logout();
        }

        setUser(JSON.parse(localStorage.getItem('profile')));
    }, [location])

    return (
        <AppBar className={classes.appBar} position='static' color='inherit'>
            <Link to="/" className={classes.brandContainer}>
                <img className={classes.image} src={logo} alt='logo' height='50' />
            </Link>
            <Toolbar className={classes.toolbar}>
                {user ? (
                    <div className={classes.profile}>
                        <div className={classes.info}>
                            <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}>{user.result.name.charAt(0)}</Avatar>
                            <Typography className={classes.userName} variant="h6">{user.result.name}</Typography>
                        </div>
                        <Button variant="contained" className={classes.button} color="primary" onClick={handleCreate}>Create Post</Button>
                        <Button variant="contained" className={classes.button} color="secondary" onClick={logout}>Log out</Button>
                    </div>
                ) : (
                    <Button component={Link} to="/auth" variant="contained" color="primary">Sign in</Button>
                )}
            </Toolbar>
        </AppBar>
    )
};

export default Navbar