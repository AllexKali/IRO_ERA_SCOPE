import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';


function Lessons({index, lesson, time}) {
    return (

        <ListItem>
            <ListItemText primary={index + 1  + ". " + lesson + " " + time} />        
        </ListItem>

    );

}

export default Lessons;