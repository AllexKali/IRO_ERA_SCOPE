import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import ListGroups from './ListGroups';
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import dataBase from "../DB";

const useStyles = makeStyles((theme) => ({
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

const Groups = [
  {id: 0, title: 'Создать группу'},
  {id: 1, title: 'Группа 1'},
  {id: 2, title: 'Группа 2'},
  {id: 3, title: 'Группа 3'}
]

function ListModules({module}) {

  const [openDialog, setOpenDialog] = React.useState(false);
  const [groupValue, setGroupValue] = React.useState('');

  

  const classes = useStyles();
  const [openInner, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!openInner);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  function openDialogWindow () {
    setOpenDialog(true);
  }

  const handleEnter = (event) => {
    // dataBase[2].modules.push(({moduleTitle: 'Модуль ' + (dataBase[2].modules.length + 1), groups: []}));
    // console.log(dataBase[2]);
    Groups.push(({id: Groups.length + 1, title: groupValue}));
    setOpenDialog(false);
    console.log(Groups);  
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
                if (group.id === 0) {
                  return(
                  <ListItem button onClick={openDialogWindow}>
                    <ListItemText primary={'Создать группу'} />
                  </ListItem>
                  )
                } else {
                  return <ListGroups group={group.title} key={group.id}/>
                }
                }) }
            </List>
        </Collapse>
        <Dialog open={openDialog} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Создать новую группу</DialogTitle>
        <DialogContent>
            <TextField 
                autoFocus
                value = {groupValue}
                onChange = {event => setGroupValue(event.target.value)}
                margin="dense"
                id="groupName"
                label="Название группы"
                type="groupName"
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
export default ListModules;