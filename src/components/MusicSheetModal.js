import React, {Component} from 'react';
import 'font-awesome/css/font-awesome.min.css';
import abcjs from 'abcjs';
import 'abcjs/abcjs-audio.css';

const CursorControl = function() {
	this.beatSubdivisions = 1;
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

class MusicSheetModal extends Component{

    synthLoader = () => {
        
        let cursorControl = new CursorControl()
        let abc = this.props.abcJsNote
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
        this.synthLoader()    
    }
    
   
    
    render(){    
        
      
        return(
            <div style={{'background-color': 'white', 
                        'width' : '800px', 
                        'height' : '900px',
                        'position' : 'absolute',
                        'top': '10%', 'left' : '30%'}}>
                <div id="paper"></div>
                <div style={{'position' : 'absolute', 'bottom':'10px', 'width' : '95%', 'left': '2.5%'}} id="audio"></div>
            </div>
        )
    }   
}

export default MusicSheetModal