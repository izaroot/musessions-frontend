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

const styles = theme => ({
    root: {
      width: 250,
      textAlign: 'center'
    },
    media: {
      height: 200,
    },
  });

class MusicSheetCard extends Component{

    componentDidMount(){
        abcjs.renderAbc(`sheet-${this.props.sheet.id}`, this.props.sheet.full_abcjs_note, { responsive: "resize" } )
    }


    render(){
        const { classes } = this.props

        return(
            <Card className={classes.root}>
                <CardActionArea>
                    <div className={classes.media} id={`sheet-${this.props.sheet.id}`}></div>
                    <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {this.props.sheet.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                       By: {this.props.sheet.user.username}
                    </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Button size="small" color="primary">
                    Share
                    </Button>
                    <Button size="small" color="primary">
                    Learn More
                    </Button>
                </CardActions>
            </Card>
        )
    }
}
export default withStyles(styles)(MusicSheetCard)