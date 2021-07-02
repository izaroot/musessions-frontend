import React, {Component} from 'react';
import 'font-awesome/css/font-awesome.min.css';
import abcjs from 'abcjs';
import 'abcjs/abcjs-audio.css';

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
        abcString: "X:1\nM:4/4\nK:Cmin\nL:1/4\n|:C2 E/C/E/C/ GF2 E/|C2z/ E/C/E/C/DE2 F/|C2z/E/C/E/C/GF2 |E/Gz/ E/Gz/ A/Gz/ F/EF:|\n"
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
        // abcjs.renderAbc(
        //     "midi-id",
        //     abcString,
        //     { });

        this.synthLoader()
        }
    
    abcTextEdit = (e) =>{
        this.setState({
            [e.target.name] : e.target.value
        },() => this.synthLoader() )
    }
    // abcjs.midi.startPlaying(document.querySelector(".abcjs-inline-midi"));
    
    // abcjs.midi.stopPlaying();
    
    // abcjs.midi.restartPlaying();
    
    // abcjs.midi.setLoop(document.querySelector(".abcjs-inline-midi"), true);
    
    // abcjs.midi.setRandomProgress(0.33);
    
    render(){    
    
        return(
            <div>
                <div id="paper"></div>
                <div id="audio"></div>
                <textarea onChange={(e) => this.abcTextEdit(e)} name="abcString" value={this.state.abcString} />
            </div>
        )
    }   
}

export default MusicSheetFull