import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import ListModules from './ListModules';
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import dataBase from "../DB";
import users from "../users";

const useStyles = makeStyles((theme) => ({
  main: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    marginTop: theme.spacing(9)
  },
  item: {
      backgroundColor: "#e0e0e0"
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  addModule: {
    paddingLeft: theme.spacing(4),
    backgroundColor: "#e0e0e0"
  }
}));

const Modules = [
  {id: 0, title: 'Добавить модуль'},
  {id: 1, title: 'Модуль 1'},
  {id: 2, title: 'Модуль 2'},
  {id: 3, title: 'Модуль 3'}
]

function ListSubjectItem(props)  {
  
  const classes = useStyles();  

  const [open, setOpen] = React.useState(true);
  const [openList, setOpenList] = React.useState(false);
  const [moduleValue, setModuleValue] = React.useState('');

  function userSearch(login){
    return login.login === props.role;
  }

  const handleClick = () => {
    setOpen(!open);
  };

  const handleClose = () => {
    setOpenList(false);
  };

  const handleEnter = (event) => {
    dataBase[props.id - 1].modules.push(({moduleTitle: moduleValue, groups: [], id: (dataBase[props.id - 1].modules.length + 1)}));
    Modules.push(({id: Modules.length + 1, title: moduleValue}));
    setOpenList(false);  
  };

  function openDialog () {
    setOpenList(true);
  }

  return (
    <>
      {(props.id % 2 === 0)
      ?<> <ListItem button onClick={handleClick} className={classes.item}>
      <ListItemText primary={props.course} />
      {!open ? <ExpandLess /> : <ExpandMore />}
    </ListItem>
      </>:
      <>
      <ListItem button onClick={handleClick} >
        <ListItemText primary={props.course} />
        {!open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      </>
      }
      <Collapse in={!open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
        {(users.find(userSearch).role === 'admin')
      ?
      <ListItem button onClick={openDialog} className={classes.addModule} >
        <ListItemText primary={'Добавить модуль'} />
      </ListItem>:
      <></>
      }
        

        { dataBase[props.id - 1].modules.map(module => {
          
          return <ListModules module={module.moduleTitle} key={module.id} groups={[]} course={props.id - 1} id={module.id} role={props.role}/>
          
      }) }
        </List>
      </Collapse>
      <Dialog open={openList} onClose={handleClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Создать новый модуль</DialogTitle>
      <DialogContent>
          <TextField 
              autoFocus
              value = {moduleValue}
              onChange = {event => setModuleValue(event.target.value)}
              margin="dense"
              id="moduleName"
              label="Название модуля"
              type="moduleName"
              fullWidth
          />
      </DialogContent>
      <DialogActions>
          <Button onClick={handleClose} color="primary">Отмена</Button>
          <Button onClick={handleEnter} color="primary">Добавить</Button>
      </DialogActions>
      </Dialog>
      
    </>
  );
}
export default ListSubjectItem;