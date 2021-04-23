import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListSubjectItem from './ListSubjectItem';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions } from '@material-ui/core';
import Button from '@material-ui/core/Button';


const useStyles = makeStyles((theme) => ({
  main: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    marginTop: theme.spacing(9)
  }
}));

const Subjects = [
    {id: 0, title: 'Добавить'},
    {id: 1, title: 'Курс 1'},
    {id: 2, title: 'Курс 2'},
    {id: 3, title: 'Курс 3'}
  ]

function ListSubject() {
  const [open, setOpen] = React.useState(false);
  const [subjectValue, setSubjectValue] = useState('');
  
  
  const classes = useStyles();

  function openDialog () {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  };

  const handleEnter = (event) => {
    Subjects.push(({id: Subjects.length + 1, title: subjectValue}));
    setOpen(false);  
  };

  // const handleLessonChange = e => {
  //   setSubjectValue(e.target.value);
  // };

  return (
    <>
    <List
      component="nav"
      aria-labelledby="nested-list-subheader"
      className={classes.main}
    >
      { Subjects.map(subject => {
        if (subject.id === 0) {
          return(
          <ListItem button onClick={openDialog}>
            <ListItemText primary={'Добавить курс'} />
          </ListItem>
          )
        } else {
          return <ListSubjectItem subject={subject.title} key={subject.id}/>
        }
      }) }
    </List>
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
    <DialogTitle id="form-dialog-title">Создать новый курс</DialogTitle>
    <DialogContent>
        <TextField 
            autoFocus
            value = {subjectValue}
            onChange = {event => setSubjectValue(event.target.value)}
            margin="dense"
            id="subjectName"
            label="Название курса"
            type="subjectName"
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
export default ListSubject;