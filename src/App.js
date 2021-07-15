import React, {Component} from "react";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom"

import LoginPage from "./components/LoginPage";
import SideNav from "./components/SideNav";
import MusicSheetContainer from "./components/MusicSheetContainer";
import SongEdit from "./components/SongEdit";

import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    height: '100vh',
    color: '#fff'

  }
})

class App extends Component{

  state = {
    user: {},
    musicSheets: [],
    selectedEditSong: {}
  }

  getUser = () =>{
    fetch("http://localhost:3000/profile",
    {headers:{
      "Authorization":`Bearer ${localStorage.token}`
    }})
    .then((r) => r.json())
    .then((user) => {
      this.setState({user})
    })
  }

  getMusicSheets = () => {
    fetch('http://localhost:3000/music_sheets')
    .then(resp => resp.json())
    .then(musicSheets => {
      this.setState({
        musicSheets
      })
    })
  }

  setUser = (user) => {
    this.setState({user})
  }

  componentDidMount(){
    if(localStorage.token){this.getUser()}
  
    this.getMusicSheets()
  }

  setSelectedSong = (song) => {
    this.setState({
      selectedEditSong: song
    })
  }
  
  addNewSong = (song) => {
    this.setState({
      musicSheets: [...this.state.musicSheets, song],
      user: {...this.state.user, 
        music_sheets:[...this.state.user.music_sheets, song]}
    })
  }

  render(){
    const { classes } = this.props
    return (
      <Router>
        
         
            <Grid container component="main" style={{height: '100vh'}}>               
                <CssBaseline />

                {!!this.state.user.id ? <SideNav user={this.state.user} setUser={this.setUser} /> : <LoginPage setUser={this.setUser}/>}

                <Switch>
                  <Route exact path="/">
                    <Grid item>
                        <MusicSheetContainer musicSheets={this.state.musicSheets} />
                    </Grid>
                  </Route>

                  <Route path="/newsong">
                      <Grid item>
                        <SongEdit user={this.state.user} addNewSong={this.addNewSong} />
                      </Grid>
                  </Route>

                  <Route exact path="/mysongs">
                      <Grid item>
                        <MusicSheetContainer musicSheets={this.state.user.music_sheets} setSelectedSong={this.setSelectedSong} />
                      </Grid>
                  </Route>

                  <Route path="/songedit">
                      <Grid item>
                        <SongEdit user={this.state.user} song={!!this.state.selectedEditSong ? this.state.selectedEditSong : null} />
                      </Grid>
                  </Route>

                  
                </Switch>

            </Grid>
          
      </Router>
    )
  }
}

export default App;
