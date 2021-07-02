import React, {Component} from 'react'
import MusicSheetCard from './MusicSheetCard'

export default class MusicSheetContainer extends Component{


    render(){
        return(
            <div>
                {this.props.musicSheets.map((sheet, idx) => <MusicSheetCard key={idx} sheet={sheet} />)}
            </div>
           
        )
    }
}