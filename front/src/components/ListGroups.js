import React, {useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ThemeContext from "../Context";

const useStyles = makeStyles((theme) => ({
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

function ListGroup(props) {
  let { setstatus} = useContext(ThemeContext)

  const classes = useStyles();

  return (
        <ListItem button className={classes.nested} onClick={status => setstatus(status)}>
            <ListItemText primary={props.group} />
        </ListItem>
  );
}
export default ListGroup;