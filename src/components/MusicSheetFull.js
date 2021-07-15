import React, {Component} from 'react';
import 'font-awesome/css/font-awesome.min.css';
import abcjs from 'abcjs';
import 'abcjs/abcjs-audio.css';

import TextField from '@material-ui/core/TextField';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button'
import SaveIcon from '@material-ui/icons/Save';

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

class MusicSheetFull extends Component{

    state={
        textDisplay: false,
        header: "X:1",
        title: "Title Goes Here",
        measure: "4/4",
        key: "C",
        noteLength: "1/4",
        body: "|:C \n:|\n",
        musicSheetId: null,
        abcString: ""
    }


    synthLoader = () => {
        
        let cursorControl = new CursorControl()
        let abc = this.state.abcString
        let abcOptions = { add_classes: true };
        let audioParams = { chordsOff: true };

        if(abcjs.synth.supportsAudio()){
            let synthControl = new abcjs.synth.SynthController()

            synthControl.load("#audio", cursorControl, {
                displayLoop: true, 
                displayRestart: true, 
                displayPlay: true, 
                displayProgress: true, 
                displayWarp: true
            })

            let visualObj = abcjs.renderAbc("paper", abc, abcOptions)
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
            document.querySelector("#audio").innerHTML = " Audio not supported"
        }
    }


    componentDidMount(){
        this.updateAbcConcat()    
    }
    
    updateAbcConcat = () => {
        const {header, title, measure, key, noteLength, body} = this.state
        // X:1\nT: Title Goes Here\nM:4/4\nK:C\nL:1/4\n|:C\n:|\n"
        this.setState({
            abcString: `${header}\nT:${title}\nM:${measure}\nK:${key}\nL:${noteLength}\n${body}`
        },() => this.synthLoader())
    }

    abcTextEdit = (e) =>{
        this.setState({
            [e.target.name] : e.target.value
        },() => this.synthLoader() )
    }

    saveSong = () => {
        if(!this.state.musicSheetId){
            let newSong = {
                user_id: this.props.user.id,
                title: this.state.title,
                bpm: 130,
                meter: "",
                scale: "",
                full_abcjs_note: this.state.abcString,
                likes: 0,
                tempo: "tempo",
                note_length: "",
                body: "",
                published: false
            }
            fetch('http://localhost:3000/music_sheets', {
                method: "POST",
                headers: {
                    "Content-Type" : "application/json",
                    "Authorization" : `Bearer ${localStorage.token}`
                },
                body: JSON.stringify(newSong)
            })
            .then(resp => resp.json())
            .then(song => {
                alert("New Song Saved")
                this.setState({
                    abcString: song.full_abcjs_note,
                    musicSheetId: song.id
                })
                this.props.addNewSong(song)
            })
        }
        else{
            let updatedSong ={
                user_id: this.props.user.id,
                title: "",
                bpm: 130,
                meter: "",
                scale: "",
                full_abcjs_note: this.state.abcString,
                likes: 0,
                tempo: "tempo",
                note_length: "",
                body: "",
                published: false
            }
            fetch(`http://localhost:3000/music_sheets/${this.state.musicSheetId}`, {
                method: "PATCH",
                headers: {
                    "Content-Type" : "application/json",
                    "Authorization" : `Bearer ${localStorage.token}`
                },
                body: JSON.stringify(updatedSong)
            })
            .then(resp => resp.json())
            .then(updatedSong => {
                alert("Song has been updated")
                this.setState({
                    abcString: updatedSong.full_abcjs_note,
                    musicSheetId: updatedSong.id
                })
            })
        }
    }

    handleFormChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        },() => this.updateAbcConcat())
    }

    toggleEditDisplay = () =>{
        this.setState({
            textDisplay: !this.state.textDisplay
        })
    }
    
    render(){    
        
        // const abcArr = this.state.abcString.split('\n')
        
        // const title = abcArr.find(element => element.substring(0,2) === "T:").slice(2)

        // console.log(title)
      
        return(
            <div>
                <div id="paper"></div>
                <div id="audio"></div>

                {this.state.textDisplay ? <TextField minRows={3} multiline style={{width: '100%'}} onChange={(e) => this.abcTextEdit(e)} name="abcString" value={this.state.abcString} />

                : <form id="song-edit" onChange={(e) => this.handleFormChange(e)}>
                    <TextField name="title" label="Title" value={this.state.title}/><br/>

                    <TextField onChange={(e) => this.handleFormChange(e)} select label="Measure" name="measure" value={this.state.measure}>
                            <MenuItem value="4/4">4/4</MenuItem>
                            <MenuItem value="3/4">3/4</MenuItem>
                            <MenuItem value="6/4">6/4</MenuItem>
                            <MenuItem value="8/4">8/4</MenuItem>
                    </TextField><br/>

                    <TextField onChange={(e) => this.handleFormChange(e)} select label="Note Length" name="noteLength" value={this.state.noteLength}>
                            <MenuItem value="1/2">1/2</MenuItem>
                            <MenuItem value="1/4">1/4</MenuItem>
                            <MenuItem value="1/8">1/8</MenuItem>
                            <MenuItem value="1/16">1/16</MenuItem>
                    </TextField><br/>

                    <TextField onChange={(e) => this.handleFormChange(e)} select label="Key" name="key" value={this.state.key}>
                            <MenuItem value="C">C</MenuItem>
                            <MenuItem value="Cmin">Cmin</MenuItem>
                            <MenuItem value="D">D</MenuItem>
                            <MenuItem value="Dmin">Dmin</MenuItem>
                            <MenuItem value="E">E</MenuItem>
                            <MenuItem value="Emin">Emin</MenuItem>
                            <MenuItem value="F">F</MenuItem>
                            <MenuItem value="Fmin">Fmin</MenuItem>
                            <MenuItem value="G">G</MenuItem>
                            <MenuItem value="Gmin">Gmin</MenuItem>
                            <MenuItem value="A">A</MenuItem>
                            <MenuItem value="Amin">Amin</MenuItem>
                            <MenuItem value="B">B</MenuItem>
                            <MenuItem value="Bmin">Bmin</MenuItem>
                    </TextField><br/>

                    

                    <TextareaAutosize style={{'width' : '100%'}} minRows={3} name="body" label="Body" multiline value={this.state.body} />
                    
                </form>}

                <Button onClick={this.saveSong} variant="contained" startIcon={<SaveIcon />}>Save Song</Button>

                <Button onClick={this.toggleEditDisplay}>{this.state.textDisplay ? 'Normal Editor' : 'Full Text Editor'}</Button>
            </div>
        )
    }   
}

export default MusicSheetFull