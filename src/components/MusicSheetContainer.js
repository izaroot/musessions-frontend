import React, {Component} from 'react'
import MusicSheetCard from './MusicSheetCard'

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

export default class MusicSheetContainer extends Component{


    render(){
        return(
            <Grid style={{'margin':'15px'}} container justifyContent="center" spacing={2}>
                {this.props.musicSheets.map((sheet, idx) =>
                <Grid key={idx} item>
                    <MusicSheetCard key={idx} sheet={sheet}  />
                </Grid>
                )}
            </Grid>
           
        )
    }
}