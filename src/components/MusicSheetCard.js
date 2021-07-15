import React, {Component} from 'react'
import 'font-awesome/css/font-awesome.min.css';
import abcjs from 'abcjs';
import 'abcjs/abcjs-audio.css';

import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import MusicSheetModal from './MusicSheetModal';
import { Link } from 'react-router-dom';

const styles = theme => ({
    root: {
      width: 250,
      textAlign: 'center'
    },
    media: {
      height: 200,
    },
  });

const CursorControl = function() {
	this.beatSubdivisions = 2;
	this.onStart = function() {
		console.log("The tune has started playing.");
    }
	this.onFinished = function() {
		console.log("The tune has stopped playing.");
    }
	this.onBeat = function(beatNumber) {
		console.log("Beat " + beatNumber + " is happening.");
    }
	this.onEvent = function(event) {
		console.log("An event is happening", event);
    }
}

class MusicSheetCard extends Component{

    state ={
        open: false
    }

    synthLoader = () => {
        
        let cursorControl = new CursorControl()
        let abc = this.props.sheet.full_abcjs_note
        let abcOptions = { add_classes: true };
        let audioParams = { chordsOff: true };

        if(abcjs.synth.supportsAudio()){
            let synthControl = new abcjs.synth.SynthController()

            synthControl.load(`#audio-${this.props.sheet.id}`, cursorControl, {
                displayLoop: true, 
                displayRestart: true, 
                displayPlay: true, 
                displayProgress: true, 
                displayWarp: true
            })

            let visualObj = abcjs.renderAbc(`paper-${this.props.sheet.id}`, abc, abcOptions)
            let createSynth = new abcjs.synth.CreateSynth()
            createSynth.init({visualObj: visualObj[0]}).then(() => {
                synthControl.setTune(visualObj[0], false, audioParams).then(() => {
                    console.log("audio loaded")
                }).catch((error) => {
                    console.warn("audio problem:", error)
                })
            }).catch((error) => {
                console.warn("audio problem:", error)
            })

        }else{
            document.querySelector(`#audio-${this.props.sheet.id}`).innerHTML = " Audio not supported"
        }
    }

    componentDidMount(){
        abcjs.renderAbc(`sheet-${this.props.sheet.id}`, this.props.sheet.full_abcjs_note, { responsive: "resize" } )
    }

    handleModalToggle = () => {
        this.setState({
            open: !this.state.open
        })
    }


    render(){
        const { classes } = this.props

        return(
            <div>
            <Card className={classes.root} onClick={this.handleModalToggle}>
                <CardActionArea>
                    <div className={classes.media} id={`sheet-${this.props.sheet.id}`}></div>
                    <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {this.props.sheet.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {!!this.props.sheet.user? `By: ${this.props.sheet.user.username}` : null}
                    </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    {/* <Button size="small" color="primary">
                    Share
                    </Button>
                    <Button size="small" color="primary">
                    Learn More
                    </Button> */}
                    
                  {/* {!this.props.sheet.user? <Link to="/songedit"><Button onClick={null} size="small" color="primary">
                    Edit
                    </Button></Link> : null } */}
                </CardActions>
            </Card>
            <Modal
                open={this.state.open}
                onClose={this.handleModalToggle}                
            >
                <MusicSheetModal abcJsNote={this.props.sheet.full_abcjs_note}/>
            </Modal>
          </div>
        )
    }
}
export default withStyles(styles)(MusicSheetCard)