import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    nested: {
      paddingLeft: theme.spacing(4),
    },
    item: {
        backgroundColor: "#e0e0e0"
    }
  }));

function Lessons({index, lesson, time}) {

    const classes = useStyles();

    return (

        <ListItem className={classes.nested}>
            <ListItemText primary={index + 1  + ". " + lesson + " " + time} />        
        </ListItem>

    );

}

export default Lessons;