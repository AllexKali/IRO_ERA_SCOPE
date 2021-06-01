import React, {useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ThemeContext from "../Context";

const useStyles = makeStyles((theme) => ({
  nested: {
    paddingLeft: theme.spacing(6),
  },
}));

function ListGroup(props) {
  let { setstatus} = useContext(ThemeContext);
  let {setCourse} = useContext(ThemeContext)
  let {setModule} = useContext(ThemeContext)
  let {setGroup} = useContext(ThemeContext)

  const classes = useStyles();

  function gruops(){
    
    setCourse(props.course);
    setModule(props.module);
    setGroup(props.id);
    setstatus(true);
    
  }

  return (
        <ListItem button className={classes.nested} onClick={gruops}>
            <ListItemText primary={props.group} />
        </ListItem>
  );
}
export default ListGroup;