import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
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

const Modules = [
  {id: 0, title: 'Добавить модуль'},
  {id: 1, title: 'Модуль 1'},
  {id: 2, title: 'Модуль 2'},
  {id: 3, title: 'Модуль 3'}
]

function ListSubjectItem(props)  {
  
    

  const [open, setOpen] = React.useState(true);
  const [openList, setOpenList] = React.useState(false);
  const [moduleValue, setModuleValue] = React.useState('');

  const handleClick = () => {
    setOpen(!open);
  };

  const handleClose = () => {
    // alert(DB[0][0][0][0][0]);
    // console.log(DB[0][0][0][0][0]);
    setOpenList(false);
  };

  const handleEnter = (event) => {
    dataBase[0].modules.push(({moduleTitle: 'Модуль ' + (dataBase[0].modules.length + 1), groups: []}));
    Modules.push(({id: Modules.length + 1, title: moduleValue}));
    setOpenList(false);  
  };

  function openDialog () {
    setOpenList(true);
  }

  return (
    <>
      {/* {console.log(dataBase[0].course[0].module[0].groups[0].day[0].id)}     */}
      <ListItem button onClick={handleClick}>
        <ListItemText primary={props.subject} />
        {!open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={!open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
        { Modules.map(module => {
          if (module.id === 0) {
            return(
            <ListItem button onClick={openDialog}>
              <ListItemText primary={'Добавить модуль'} />
            </ListItem>
            )
          } else {
            return <ListModules module={module.title} key={module.id}/>
          }
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