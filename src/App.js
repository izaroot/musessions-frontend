import React, {Component} from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom"
import LoginPage from "./components/LoginPage";


class App extends Component{

  state = {
    user: {},
    musicSheets: []
  }

  componentDidMount(){
    fetch('http://localhost:3000/music_sheets')
    .then(resp => resp.json())
    .then(musicSheets => {
      this.setState({
        musicSheets
      })
    })
  }

  render(){
    return (
      <Router>
        <Switch>
          <Route path="/">
            <LoginPage musicSheets={this.state.musicSheets} />
          </Route>

          <Route>

          </Route>
        </Switch>
      </Router>
    )
  }
}

export default App;
