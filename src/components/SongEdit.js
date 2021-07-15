import React, {Component} from 'react'
import MusicSheetFull from './MusicSheetFull'


class SongEdit extends Component{



    render(){
        return(
            <div>
                <div id="sheet-wrapper">
                    <MusicSheetFull addNewSong={this.props.addNewSong} user={this.props.user} song={this.props.song} />
                </div>
                
            </div>
            
        )
    }
}

export default SongEdit