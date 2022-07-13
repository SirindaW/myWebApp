import React from 'react'
import { Link } from 'react-router-dom';
import { AppBar, Avatar, Button, Toolbar, Typography } from '@material-ui/core'
import logo from '../../images/logo.jpg';
import useStyles from './styles.js';

const Navbar = () => { 
    const classes = useStyles();
    const user = null;
    
    return (
        <AppBar className={classes.appBar} position='static' color='inherit'>
            <div className={classes.brandContainer}>
                <Typography component={Link} to="/" className={`${classes.heading} ${classes.headsize}`} variant='h3' align='center'>MyFeed</Typography>
                <img className={classes.image} src={logo} alt='logo' height='90' />
            </div>
            <Toolbar className={classes.toolbar}>
                {user ? (
                    <div className={classes.profile}>
                        <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}>{user.result.name.charAt(0)}</Avatar>
                        <Typography className={classes.userName} variant="h6">{user.result.name}</Typography>
                        <Button variant="contained" className={classes.logout} color="secondary">Log out</Button>
                    </div>
                ) : (
                    <Button component={Link} to="/auth" variant="contained" color="primary">Log in</Button>
                )}
            </Toolbar>
        </AppBar>
    )
};

export default Navbar