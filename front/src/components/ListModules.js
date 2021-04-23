import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import ListGroups from './ListGroups';

const useStyles = makeStyles((theme) => ({
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

function ListModules({module}) {

    const Groups = [
        {id: 1, title: 'Группа 1'},
        {id: 2, title: 'Группа 2'},
        {id: 3, title: 'Группа 3'}
      ]

  const classes = useStyles();
  const [openInner, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!openInner);
  };

  return (
    <>
        <ListItem button className={classes.nested} onClick={handleClick}>
            <ListItemText primary={module} />
            {!openInner ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={!openInner} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
                { Groups.map(group => {
                return <ListGroups group={group.title} key={group.id}/>
                }) }
            </List>
        </Collapse>
      
    </>
  );
}
export default ListModules;