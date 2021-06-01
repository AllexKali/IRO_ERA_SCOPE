import React, {useState} from 'react';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import { CardActions, CardContent, Typography, Dialog, DialogTitle, DialogContent, TextField, DialogActions } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Lessons from './Lessons';
import dataBase from "../DB";
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';
import users from '../users';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
    main: {
        
        marginTop: theme.spacing(9),
    },
    list: {
        left: '40%', top: '-2%',
        maxWidth: 200
    },
    itemradius: {
        backgroundColor: "#e0e0e0",
        borderRadius: 10
    },
    radius: {
        borderRadius: 10
    },
    size: {
        fontSize: 20,
    }, 
    newColor: {
        color: 'red',
        fontSize: 20,
    },
    item: {
        backgroundColor: "#e0e0e0",
    } 
  }));

let l = 0;
let cardNumber = 1;

const cards = []

let date = new Date();
const monthNames = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];


function getWeekDay(a, b, c) {
    const weekDay =["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"];
    let newDate = new Date(a, b - 1, c);
    let newWeek = newDate.getDay();
    return weekDay[newWeek];
  }

function addZero(mounthNumber) {
    if (mounthNumber >= 0 && mounthNumber <= 9) {
		return '0' + mounthNumber;
	} else {
		return mounthNumber;
	}
}

function GridGroup(props) {
    
    const classes = useStyles();

    const [open, setOpen] = React.useState(false);
    const [openListTeachers, setOpenListTeachers] = React.useState(false);
    const [openListMounth, setOpenListMounth] = React.useState(false);
    const [openAdminDialog, setOpenAdminDialog] = React.useState(false);
    const [getCardNumber, setGetCardNumber] = React.useState();
    const [openSnackbar, setOpenSnackbar] = React.useState(false);
    let [teacher, setTeacher] = useState('Выбрать преподавателя');
    let [month, setMonth] = React.useState(date.getMonth());
    let NewTime = '';
    let NewLesson = '';
    let teacherHours = '';

    newDaysInMonth();

    function daysInMonth(month, year) {
        let month1 = Number(month);
        month1 = month1 + 1;
        return new Date(year, month1, 0).getDate();
    }

    function newDaysInMonth(){ 
        for (var i = 1; i <= daysInMonth(month, date.getFullYear()); i++) {
            cards.push(i);
        }
        }

    function userSearch(login){
        return login.login === props.role;
    }
    
    function handleClickOpen (e) {
        cards.length = 0;
        cardNumber = Number(e.target.parentNode.parentNode.parentNode.parentNode.id);
        if(cardNumber === 0){
            return; 
        }
        
        setOpen(true);
    };

    function switchAdminDialog () {
        cards.length = 0;
        setOpenAdminDialog(!openAdminDialog);
    };

    function takeTeacher(eteach){

        cards.length = 0;
        setTeacher(eteach.target.parentNode.id);
        setOpenListTeachers(!openListTeachers);

    };

    function findTeacherHours(){

        let countHours = 0;

        for(let searchCourses = 0; searchCourses < dataBase.length; searchCourses++){
            for(let searchModules = 0; searchModules < dataBase[searchCourses].modules.length; searchModules++){
                for(let searchGroups = 0; searchGroups < dataBase[searchCourses].modules[searchModules].groups.length; searchGroups++){
                    try{
                        for(let searchDays = 0 ; searchDays < dataBase[searchCourses].modules[searchModules].groups[searchGroups].mouth[month].lessons[cardNumber - 1].day.length; searchDays++){
                            if(dataBase[searchCourses].modules[searchModules].groups[searchGroups].mouth[month].lessons[cardNumber - 1].day[searchDays].teacher === teacher){
                                countHours = Number(countHours) + Number(dataBase[searchCourses].modules[searchModules].groups[searchGroups].mouth[month].lessons[cardNumber - 1].day[searchDays].teacherHours);    
                            }
                        }
                    } catch {
                        break;
                    }
                }

            }
        }

        return countHours;

    };

    function Alert(props) {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
      }

    const handleClose = () => {
        cards.length = 0;
        setOpen(false);
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    }

    const handleCloseAdminDialog = () => {
        cards.length = 0;
        setOpenAdminDialog(false);
    };

    const handleEnter = () => {
        cards.length = 0;
        NewLesson = document.getElementById('lessonName').value;
        NewTime = document.getElementById('lessonTime').value;
        teacherHours = document.getElementById('lessonTeacherHours').value;

        findTeacherHours();
       
        if((Number(findTeacherHours()) + Number(teacherHours)) < 8) {

        try { 
            
            dataBase[props.course].modules[props.module].groups[props.group - 1].mouth[month].lessons[cardNumber - 1].day.push(({id: dataBase[props.course].modules[props.module].groups[props.group - 1].mouth[month].lessons[cardNumber - 1].day.length + 1, title: NewLesson, teacher: teacher, time: NewTime, teacherHours: teacherHours}));
        
        } catch {

            while((dataBase[props.course].modules[props.module].groups[props.group - 1].mouth.length - 1) < (month)){
                
                dataBase[props.course].modules[props.module].groups[props.group - 1].mouth.push(({lessons: []}));      
            }

            try{

                dataBase[props.course].modules[props.module].groups[props.group - 1].mouth[month].lessons[cardNumber - 1].day.push(({id: dataBase[props.course].modules[props.module].groups[props.group - 1].mouth[month].lessons[cardNumber - 1].day.length + 1, title: NewLesson, teacher: teacher, time: NewTime, teacherHours: teacherHours}));
            
            }catch {

                while(dataBase[props.course].modules[props.module].groups[props.group - 1].mouth[month].lessons.length < cardNumber){
                
                    dataBase[props.course].modules[props.module].groups[props.group - 1].mouth[month].lessons.push(({day: []}));    
                
                }

                try{

                dataBase[props.course].modules[props.module].groups[props.group - 1].mouth[month].lessons[cardNumber - 1].day.push(({id: dataBase[props.course].modules[props.module].groups[props.group - 1].mouth[month].lessons[cardNumber - 1].day.length + 1, title: NewLesson, time: NewTime, teacher: teacher, teacherHours: teacherHours}));
                
                } catch {
                    
                    return;

                }
            }
        }
        setOpen(false);
        } else {
            setOpen(false);
            setOpenSnackbar(true);
        }
    };

    const handleClick = () => {
        setOpenListTeachers(!openListTeachers);
    };

    const handleClickMounth = () => {
        setOpenListMounth(!openListMounth);
    };

    let i = -1;

    function findTeacher() {
        i = i + 1;
        
            if(users[i].role === 'teacher'){
                return(
                    <List component="div" disablePadding>
                        <ListItem button onClick={etach => takeTeacher(etach)} key={i+'t'} id={users[i].login} name={users[i].login}>
                            <ListItemText primary={users[i].login} name={users[i].login} id={users[i].login}/>
                        </ListItem>
                     </List>
                )
            } else {
                return(<></>);
            }
    }

    let newMounthNumber = -1;

    function setNewMonth(et){
        setOpenListMounth(!openListMounth);
            cards.length = 0;
        if(et.target.parentNode.id === ""){
            
            return;
        } else {
        setMonth(et.target.parentNode.id);
        }
    }

    function drawTextFields() {
        
        try{
            return(
                
                dataBase[props.course].modules[props.module].groups[props.group - 1].mouth[month].lessons[getCardNumber - 1].day.map((DialogCard, index) =>(
                 <>           
                <TextField 
                    margin="dense"
                    id={dataBase[props.course].modules[props.module].groups[props.group - 1].mouth[month].lessons[getCardNumber - 1].day[index].id}
                    label="Занятие"
                    defaultValue={dataBase[props.course].modules[props.module].groups[props.group - 1].mouth[month].lessons[getCardNumber - 1].day[index].title}
                    type="lessonName"
                    fullWidth
                />

                <TextField 
                    margin="dense"
                    id={(dataBase[props.course].modules[props.module].groups[props.group - 1].mouth[month].lessons[getCardNumber - 1].day[index].id) + 'd'}
                    label="Время"
                    defaultValue={dataBase[props.course].modules[props.module].groups[props.group - 1].mouth[month].lessons[getCardNumber - 1].day[index].time}
                    type="lessonTime"
                    fullWidth
                />

                <TextField 
                    margin="dense"
                    id={(dataBase[props.course].modules[props.module].groups[props.group - 1].mouth[month].lessons[getCardNumber - 1].day[index].id) + 't'}
                    label="Преподаватель"
                    defaultValue={dataBase[props.course].modules[props.module].groups[props.group - 1].mouth[month].lessons[getCardNumber - 1].day[index].teacher}
                    type="lessonTeacher"
                    fullWidth
                />

                <TextField 
                    margin="dense"
                    id={(dataBase[props.course].modules[props.module].groups[props.group - 1].mouth[month].lessons[getCardNumber - 1].day[index].id) + 'h'}
                    label="Количество часов преподавателя"
                    defaultValue={dataBase[props.course].modules[props.module].groups[props.group - 1].mouth[month].lessons[getCardNumber - 1].day[index].teacherHours}
                    type="lessonTeacherHours"
                    fullWidth
                />

                {(users.find(userSearch).role === 'admin')
                    ?<IconButton aria-label="delete" onClick={() => deleteElem(index)}>
                        <DeleteIcon />
                    </IconButton>:
                    <></> 
                }

                </>
                )
                )
            )

        } catch {

        }
        
    }

    function deleteElem(index) {
        dataBase[props.course].modules[props.module].groups[props.group - 1].mouth[month].lessons[getCardNumber - 1].day.splice(index, 1);
        setOpenAdminDialog(false);
    }

    function takeMonth() {
        newMounthNumber += 1;
        if(newMounthNumber % 2 === 0){
        return(
            <List component="div" disablePadding>
                <ListItem button onClick={(et) => setNewMonth(et)} id={newMounthNumber + 'month'}>
                    <ListItemText primary={monthNames[newMounthNumber]} name={monthNames[newMounthNumber]} id={newMounthNumber}/>
                </ListItem>
            </List>
        )
        } else {
            return(
            <List component="div" disablePadding >
                <ListItem button className={classes.item} onClick={(et) => setNewMonth(et)} id={newMounthNumber + 'month'}>
                    <ListItemText primary={monthNames[newMounthNumber]} name={monthNames[newMounthNumber]} id={newMounthNumber}/>
                </ListItem>
            </List>
            )
        }
    }

    function hideAddButton(card) {
        try{
            return(
            (users.find(userSearch).role === 'student' || users.find(userSearch).role === 'teacher')
            ?<CardActions id = {'действие' + card} >
                    
                </CardActions>:
                <CardActions id = {'действие' + card} >
                <Button id = {'кнопка' + card}  size="small" color="primary" onClick={handleClickOpen}>
                    Добавить
                </Button>
            </CardActions>
            )
        } catch {
            return(
                <CardActions id = {'действие' + card} >
                    <Button id = {'кнопка' + card}  size="small" color="primary" onClick={handleClickOpen}>
                        Добавить
                    </Button>
                </CardActions>
            )
        }
    }

  return (
    <Container >
        <List className={classes.list}>
            <ListItem button onClick={handleClickMounth}>
                <ListItemText primary={monthNames[month]} id="mounth"/>
                {openListMounth ? <>{cards.length = 0}<ExpandLess /></> : <><ExpandMore /></> }
                </ListItem>
                <Collapse in={openListMounth} timeout="auto" unmountOnExit>
                    {monthNames.map((monthName) =>(                          
                        takeMonth()
                    ))}
                </Collapse>
        </List>
    <Grid container spacing={4} variant="outlined" >
        
        {cards.map((card) =>(
           // eslint-disable-next-line no-sequences
           l = 0,
            <Grid item key={card} xs={12} sm={6} md={3} id = {card} >
                {(users.find(userSearch).role === 'admin')
                ?
                <CardContent className={classes.itemradius} onClick={() => {switchAdminDialog(); setGetCardNumber(card)}}>
                    {(getWeekDay(date.getFullYear(),  addZero(Number(month) + 1), addZero(card)) === "Воскресенье" || getWeekDay(date.getFullYear(),  addZero(Number(month) + 1), addZero(card)) === "Суббота")
                    ?
                    (<Typography variant="h5" gutterBottom className={classes.newColor}>

                    {addZero(card)}.{addZero(Number(month) + 1)}.{date.getFullYear()}&nbsp;{getWeekDay(date.getFullYear(),  addZero(Number(month) + 1), addZero(card))}
                    </Typography>):

                    <Typography variant="h5" gutterBottom className={classes.size}>
                    {addZero(card)}.{addZero(Number(month) + 1)}.{date.getFullYear()}&nbsp;{getWeekDay(date.getFullYear(),  addZero(Number(month) + 1), addZero(card))}
                    </Typography>
                    }
                    
                    <List component="div" disablePadding>
                        
                        {((dataBase[props.course].modules[props.module].groups[props.group - 1].mouth.length - 1) < (month))
                        ?(<></>):
                        ((card - 1) < dataBase[props.course].modules[props.module].groups[props.group - 1].mouth[month].lessons.length)
                            ?   dataBase[props.course].modules[props.module].groups[props.group - 1].mouth[month].lessons[card - 1].day.map((lesson, index) => {
                                l = l + 1;
                                
                                return <Lessons role={props.role} key={dataBase[props.course].modules[props.module].groups[props.group - 1].mouth[month].lessons[card - 1].day[l - 1].id} lesson = {dataBase[props.course].modules[props.module].groups[props.group - 1].mouth[month].lessons[card - 1].day[l - 1].title } time={dataBase[props.course].modules[props.module].groups[props.group - 1].mouth[month].lessons[card - 1].day[l - 1].time} teacher={dataBase[props.course].modules[props.module].groups[props.group - 1].mouth[month].lessons[card - 1].day[l - 1].teacher} teacherHours={dataBase[props.course].modules[props.module].groups[props.group - 1].mouth[month].lessons[card - 1].day[l - 1].teacherHours} index={index} />
                            }):
                            <></>
                        }
                    </List>
                </CardContent>:
                <CardContent className={classes.itemradius}>
                {(getWeekDay(date.getFullYear(),  addZero(Number(month) + 1), addZero(card)) === "Воскресенье" || getWeekDay(date.getFullYear(),  addZero(Number(month) + 1), addZero(card)) === "Суббота")
                ?
                (<Typography variant="h5" gutterBottom className={classes.newColor}>

                {addZero(card)}.{addZero(Number(month) + 1)}.{date.getFullYear()}&nbsp;{getWeekDay(date.getFullYear(),  addZero(Number(month) + 1), addZero(card))}
                </Typography>):

                <Typography variant="h5" gutterBottom className={classes.size}>
                {addZero(card)}.{addZero(Number(month) + 1)}.{date.getFullYear()}&nbsp;{getWeekDay(date.getFullYear(),  addZero(Number(month) + 1), addZero(card))}
                </Typography>
                }
                
                <List component="div" disablePadding>
                    
                    {((dataBase[props.course].modules[props.module].groups[props.group - 1].mouth.length - 1) < (month))
                    ?(<></>):
                    ((card - 1) < dataBase[props.course].modules[props.module].groups[props.group - 1].mouth[month].lessons.length)
                        ?   dataBase[props.course].modules[props.module].groups[props.group - 1].mouth[month].lessons[card - 1].day.map((lesson, index) => {
                            l = l + 1;
                            if(users.find(userSearch).role === "teacher"){
                                if(props.role === dataBase[props.course].modules[props.module].groups[props.group - 1].mouth[month].lessons[card - 1].day[l - 1].teacher){
                                    return <Lessons role={props.role} key={dataBase[props.course].modules[props.module].groups[props.group - 1].mouth[month].lessons[card - 1].day[l - 1].id} lesson = {dataBase[props.course].modules[props.module].groups[props.group - 1].mouth[month].lessons[card - 1].day[l - 1].title } time={dataBase[props.course].modules[props.module].groups[props.group - 1].mouth[month].lessons[card - 1].day[l - 1].time} teacher={dataBase[props.course].modules[props.module].groups[props.group - 1].mouth[month].lessons[card - 1].day[l - 1].teacher} teacherHours={dataBase[props.course].modules[props.module].groups[props.group - 1].mouth[month].lessons[card - 1].day[l - 1].teacherHours} index={index} />
                                }
                            } else {
                                return <Lessons role={props.role} key={dataBase[props.course].modules[props.module].groups[props.group - 1].mouth[month].lessons[card - 1].day[l - 1].id} lesson = {dataBase[props.course].modules[props.module].groups[props.group - 1].mouth[month].lessons[card - 1].day[l - 1].title } time={dataBase[props.course].modules[props.module].groups[props.group - 1].mouth[month].lessons[card - 1].day[l - 1].time} teacher={dataBase[props.course].modules[props.module].groups[props.group - 1].mouth[month].lessons[card - 1].day[l - 1].teacher} teacherHours={dataBase[props.course].modules[props.module].groups[props.group - 1].mouth[month].lessons[card - 1].day[l - 1].teacherHours} index={index} />
                            }
                            
                        }):
                        <></>
                    }
                </List>
                </CardContent>
                }

                <CardActions id = {'действие' + card} >
                    {hideAddButton(card)}
                </CardActions>
                
            </Grid>
        ))}
    </Grid>
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Добавить занятие</DialogTitle>
        <DialogContent>
            <TextField 
                autoFocus
                margin="dense"
                id="lessonName"
                label="Название занятия"
                type="lessonName"
                fullWidth
            />
            <TextField 
                margin="dense"
                id="lessonTime"
                label="Время занятия"
                type="lessonTime"
                fullWidth
            />
            <List>
                <ListItem button onClick={handleClick}>
                    <ListItemText primary={teacher} id="TeacherLesson"/>
                    {openListTeachers ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                    <Collapse in={openListTeachers} timeout="auto" unmountOnExit>
                    
                        {users.map((teacher) =>(
                            findTeacher(i)
                        ))}
                    </Collapse>
            </List>
            <TextField 
                    margin="dense"
                    id="lessonTeacherHours"
                    label="Количество часов преподавателя"
                    defaultValue={1}
                    type="lessonTeacherHours"
                    fullWidth
                />
        </DialogContent>
        <DialogActions>
            <Button onClick={handleClose} color="primary">Отмена</Button>
            <Button onClick={handleEnter} color="primary">Добавить</Button>
        </DialogActions>
    </Dialog>
    <Dialog open={openAdminDialog} onClose={handleCloseAdminDialog} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Информация о занятии</DialogTitle>
            <DialogContent>

                {drawTextFields()}        
                    
            
            </DialogContent>
        <DialogActions>
            <Button onClick={handleCloseAdminDialog} color="primary">Закрыть</Button>
        </DialogActions>
    </Dialog>
        <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
            <Alert onClose={handleCloseSnackbar} severity="error">
                Преподаватель в этот день занимается {Number(findTeacherHours())} часов. Выберите другого преподователя или уменьшите количество часов!
            </Alert>
        </Snackbar>     
    </Container> 
  );
}
export default GridGroup;