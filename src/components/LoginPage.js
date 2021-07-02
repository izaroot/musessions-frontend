import React, {Component} from 'react'
import MusicSheetContainer from './MusicSheetContainer';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';

import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    root: {
      height: '100vh',
      color: '#fff'

    },
    image: {
      backgroundImage: 'url(https://source.unsplash.com/random)',
      backgroundRepeat: 'no-repeat',
      backgroundColor: '#C4C4C4',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    },
    paper: {
      margin: theme.spacing(8, 4),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: '#1D70A2',
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
      backgroundColor: '#C4C4C4',
    },
    sidebar: {
        backgroundColor: '#173753',
    }
});

class LoginPage extends Component{

    state = {
        loginDisplay: true,
        username: "",
        password: "",
    }

    credentialState = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    toggleLoginDisplay = () => {
        this.setState({
            loginDisplay: !this.state.loginDisplay
        })
    }

    handleLogin = (e, state) => {
        e.preventDefault()
        let { username, password } = state
        fetch('http://localhost:3000/login', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username,
                password
            })
        })
        .then(resp => resp.json())
        .then(userJWT => {
            if (userJWT.message){
                alert(userJWT.message)
            }
            else{
            localStorage.token = userJWT.jwt
            console.log(userJWT.user)
            // this.props.setUser(userJWT.user)
            // this.handleInputClear()
            // window.location.reload()
            }
        })
    }


    render(){
        const { classes } = this.props

        return(
            <Grid container component="main" className={classes.root}>
               
                <CssBaseline />
                <Grid item xs={12} sm={8} md={3} component={Paper} elevation={6} square className={classes.sidebar}>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        
                    </Avatar>
                    <Typography component="h1" variant="h5">
                    {this.state.loginDisplay ? "Login" : "Register"}
                    </Typography>
                    <form  onSubmit={(e) => {this.state.loginDisplay ? this.handleLogin(e, this.state) : this.handleRegister(e, this.state)}}
                        className={classes.form} noValidate onChange={(e) => this.credentialState(e)}>
                        <TextField
                        value={this.state.username}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="Username"
                        name="username"
                        autoComplete="off"
                        autoFocus
                        />
                        <TextField
                        value={this.state.password}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="off"
                        />
                        <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        >
                        {this.state.loginDisplay ? "Login" : "Register"}
                        </Button>
                        <Grid container>
                            <Grid item>
                                <Link onClick={this.toggleLoginDisplay} href="#" variant="body2">
                                {this.state.loginDisplay ? "Don't have an account? Register" : "Already have an account? login"}
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                    </div>
                </Grid>
                <Grid item>
                    <MusicSheetContainer musicSheets={this.props.musicSheets} />
                </Grid>
            </Grid>
           
        )
    }
}

export default withStyles(styles)(LoginPage)