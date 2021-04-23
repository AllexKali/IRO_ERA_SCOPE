import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import ListModules from './ListModules';

// const useStyles = makeStyles((theme) => ({
//   nested: {
//     paddingLeft: theme.spacing(4),
//   },
// }));

function ListSubjectItem(props)  {
  
    const Modules = [
        // {id: 0, title: 'Добавить модуль'},
        {id: 1, title: 'Модуль 1'},
        {id: 2, title: 'Модуль 2'},
        {id: 3, title: 'Модуль 3'}
      ]

  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    
    setOpen(!open);
  };

  return (
    <>
      <ListItem button onClick={handleClick}>
        <ListItemText primary={props.subject} />
        {!open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={!open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
        { Modules.map(module => {
          return <ListModules module={module.title} key={module.id}/>
      }) }
        </List>
      </Collapse>
    </>
  );
}
export default ListSubjectItem;