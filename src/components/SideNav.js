import React, {Component} from 'react'
import { Link } from 'react-router-dom';


import Avatar from '@material-ui/core/Avatar';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import Button from '@material-ui/core/Button';

import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const drawerWidth = 240;

const styles = theme => ({
    paper: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: '#1D70A2',
    },
    sidebar: {
        backgroundColor: '#6DAEDB',
    }
});

class SideNav extends Component{

    state = {
        selectedIndex: 0
    }

    handleListItemClick = (event, index) => {
        this.setState({
            selectedIndex: index
        })
    }

    handleLogout = () => {
        this.props.setUser({})
        localStorage.clear()
    }

    render(){
        const { classes } = this.props
        
        return(
            <Grid item xs={12} sm={8} md={3} component={Paper} elevation={6} square className={classes.sidebar}>
                <div className={classes.paper}>
                    <Typography style={{'margin-top': '20px'}} variant="h4" gutterBottom>
                        musessions
                    </Typography>
                    <Avatar component={Link} to={"/profile"} className={classes.avatar}>
                        {/* {this.props.user.username[0]} */}
                    </Avatar>
                    
                    <MenuList>
                        <MenuItem component={Link} to={"/"}>Home</MenuItem>
                        <MenuItem component={Link} to={"/newsong"}>New Song</MenuItem>
                        <MenuItem component={Link} to={"/mysongs"}>My Songs</MenuItem>
                        {/* <MenuItem component={Link} to={"/favorites"}>Favorites</MenuItem> */}
                    </MenuList>
                    <Button onClick={this.handleLogout} variant="contained" color="primary" component={Link} to={"/"}>
                        Logout
                    </Button>
                </div>
            </Grid>
        )
    }
}

export default withStyles(styles)(SideNav)