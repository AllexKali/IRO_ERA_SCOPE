import React, {useState} from 'react';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import { CardActions, CardContent, Typography, Dialog, DialogTitle, DialogContent, TextField, DialogActions } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Lessons from './Lessons';

const lessons = [
    {day: [
        {id: 1, title: 'Занятие', time: '13:00'},
        {id: 2, title: 'Занятие', time: '14:00'},
        {id: 3, title: 'Занятие', time: '15:00'}
    ]},
    {day:[
        {id: 4, title: 'Занятие 2.1', time: '10:00'},
        {id: 5, title: 'Занятие 2.2', time: '11:00'},
        {id: 6, title: 'Занятие 2.3', time: '12:00'}
    ]
    },
    {day:[
        {id: 7, title: 'Занятие 3.1', time: '10:00'},
        {id: 8, title: 'Занятие 3.2', time: '11:00'},
        {id: 9, title: 'Занятие 3.3', time: '12:00'}
    ]
    },
    {day:[
        {id: 10, title: 'Занятие 4.1', time: '10:00'},
        {id: 11, title: 'Занятие 4.2', time: '11:00'},
        {id: 12, title: 'Занятие 4.3', time: '12:00'}
    ]
    },
    {day:[
        {id: 13, title: 'Занятие 2.1', time: '10:00'},
        {id: 14, title: 'Занятие 2.2', time: '11:00'},
        {id: 15, title: 'Занятие 2.3', time: '12:00'}
    ]
    },
    {day:[
        {id: 16, title: 'Занятие 2.1', time: '10:00'},
        {id: 17, title: 'Занятие 2.2', time: '11:00'},
        {id: 18, title: 'Занятие 2.3', time: '12:00'}
    ]
    },
    {day:[
        {id: 19, title: 'Занятие 2.1', time: '10:00'},
        {id: 20, title: 'Занятие 2.2', time: '11:00'},
        {id: 21, title: 'Занятие 2.3', time: '12:00'}
    ]
    },
    {day:[
        {id: 22, title: 'Занятие 2.1', time: '10:00'},
        {id: 23, title: 'Занятие 2.2', time: '11:00'},
        {id: 24, title: 'Занятие 2.3', time: '12:00'}
    ]
    },
    {day:[
        {id: 25, title: 'Занятие 2.1', time: '10:00'},
        {id: 26, title: 'Занятие 2.2', time: '11:00'},
        {id: 27, title: 'Занятие 2.3', time: '12:00'},
        {id: 28, title: 'Занятие 2.4', time: '13:00'}
    ]
    },
    {day:[
        {id: 29, title: 'Занятие 2.1', time: '10:00'},
        {id: 30, title: 'Занятие 2.2', time: '11:00'},
        {id: 31, title: 'Занятие 2.3', time: '12:00'}
    ]
    },
    {day:[
        {id: 4, title: 'Занятие 2.1', time: '10:00'},
        {id: 5, title: 'Занятие 2.2', time: '11:00'},
        {id: 6, title: 'Занятие 2.3', time: '12:00'}
    ]
    },
    {day:[
        {id: 4, title: 'Занятие 2.1', time: '10:00'},
        {id: 5, title: 'Занятие 2.2', time: '11:00'},
        {id: 6, title: 'Занятие 2.3', time: '12:00'}
    ]
    },
    {day:[
        {id: 4, title: 'Занятие 2.1', time: '10:00'},
        {id: 5, title: 'Занятие 2.2', time: '11:00'},
        {id: 6, title: 'Занятие 2.3', time: '12:00'}
    ]
    },
    {day:[
        {id: 4, title: 'Занятие 2.1', time: '10:00'},
        {id: 5, title: 'Занятие 2.2', time: '11:00'},
        {id: 6, title: 'Занятие 2.3', time: '12:00'}
    ]
    },
    {day:[
        {id: 4, title: 'Занятие 2.1', time: '10:00'},
        {id: 5, title: 'Занятие 2.2', time: '11:00'},
        {id: 6, title: 'Занятие 2.3', time: '12:00'}
    ]
    },
    {day:[
        {id: 4, title: 'Занятие 2.1', time: '10:00'},
        {id: 5, title: 'Занятие 2.2', time: '11:00'},
        {id: 6, title: 'Занятие 2.3', time: '12:00'}
    ]
    },
    {day:[
        {id: 4, title: 'Занятие 2.1', time: '10:00'},
        {id: 5, title: 'Занятие 2.2', time: '11:00'},
        {id: 6, title: 'Занятие 2.3', time: '12:00'}
    ]
    },
    {day:[
        {id: 4, title: 'Занятие 2.1', time: '10:00'},
        {id: 5, title: 'Занятие 2.2', time: '11:00'},
        {id: 6, title: 'Занятие 2.3', time: '12:00'}
    ]
    },
    {day:[
        {id: 4, title: 'Занятие 2.1', time: '10:00'},
        {id: 5, title: 'Занятие 2.2', time: '11:00'},
        {id: 6, title: 'Занятие 2.3', time: '12:00'}
    ]
    },
    {day:[
        {id: 4, title: 'Занятие 2.1', time: '10:00'},
        {id: 5, title: 'Занятие 2.2', time: '11:00'},
        {id: 6, title: 'Занятие 2.3', time: '12:00'}
    ]
    },
    {day:[
        {id: 4, title: 'Занятие 2.1', time: '10:00'},
        {id: 5, title: 'Занятие 2.2', time: '11:00'},
        {id: 6, title: 'Занятие 2.3', time: '12:00'}
    ]
    },
    {day:[
        {id: 4, title: 'Занятие 2.1', time: '10:00'},
        {id: 5, title: 'Занятие 2.2', time: '11:00'},
        {id: 6, title: 'Занятие 2.3', time: '12:00'}
    ]
    },
    {day:[
        {id: 4, title: 'Занятие 2.1', time: '10:00'},
        {id: 5, title: 'Занятие 2.2', time: '11:00'},
        {id: 6, title: 'Занятие 2.3', time: '12:00'}
    ]
    },
    {day:[
        {id: 4, title: 'Занятие 2.1', time: '10:00'},
        {id: 5, title: 'Занятие 2.2', time: '11:00'},
        {id: 6, title: 'Занятие 2.3', time: '12:00'}
    ]
    },
    {day:[
        {id: 4, title: 'Занятие 2.1', time: '10:00'},
        {id: 5, title: 'Занятие 2.2', time: '11:00'},
        {id: 6, title: 'Занятие 2.3', time: '12:00'}
    ]
    },
    {day:[
        {id: 4, title: 'Занятие 2.1', time: '10:00'},
        {id: 5, title: 'Занятие 2.2', time: '11:00'},
        {id: 6, title: 'Занятие 2.3', time: '12:00'}
    ]
    },
    {day:[
        {id: 4, title: 'Занятие 2.1', time: '10:00'},
        {id: 5, title: 'Занятие 2.2', time: '11:00'},
        {id: 6, title: 'Занятие 2.3', time: '12:00'}
    ]
    },
    {day:[
        {id: 4, title: 'Занятие 2.1', time: '10:00'},
        {id: 5, title: 'Занятие 2.2', time: '11:00'},
        {id: 6, title: 'Занятие 2.3', time: '12:00'}
    ]
    },
    {day:[
        {id: 4, title: 'Занятие 2.1', time: '10:00'},
        {id: 5, title: 'Занятие 2.2', time: '11:00'},
        {id: 6, title: 'Занятие 2.3', time: '12:00'}
    ]
    },
    {day:[
        {id: 4, title: 'Занятие 2.1', time: '10:00'},
        {id: 5, title: 'Занятие 2.2', time: '11:00'},
        {id: 6, title: 'Занятие 2.3', time: '12:00'}
    ]
    },
    {day:[
        {id: 4, title: 'Занятие 2.1', time: '10:00'},
        {id: 5, title: 'Занятие 2.2', time: '11:00'},
        {id: 6, title: 'Занятие 2.3', time: '12:00'}
    ]
    }                                
    
];

let l = 0;
let cardNumber = 1;

function daysInMonth(month, year) {
    return new Date(year, month, 0).getDate();
}

const cards = []

for (var i = 1; i <= daysInMonth(3, 2021); i++) {
    cards.push(i);  
}

function GridGroup() {

    const [open, setOpen] = React.useState(false);
    const [lessonValue, setLessonValue] = useState('');
    const [time, setTime] = useState('');

    function handleClickOpen (e) {
        cardNumber = Number(e.target.parentNode.parentNode.parentNode.id); //Иногда почему-то возвращет 0
        if(cardNumber === 0){
            return; //если вернет 0 то функция не отроется. При повторном открытии всё нормально
        }
        
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleEnter = (e) => {
        lessons[cardNumber - 1].day.push(({id: lessons.length + 1, title: lessonValue, time: time}));
        setOpen(false);
    };

    const handleLessonChange = e => {
        setLessonValue(e.target.value);
    };

    const handleTimeChange = e => {
        setTime(e.target.value);
    };


  return (
    <Container >
    <Grid container spacing={4} variant="outlined" >
        {cards.map((card) =>(
           l = 0,
            <Grid item key={card} xs={12} sm={6} md={3} id = {card}>
                <CardContent >
                    <Typography variant="h5" gutterBottom>
                        {card}.03.2021 {/* Устанавливать месяца автоматически */}
                    </Typography>
                    
                    <List component="div" disablePadding>
                        
                        { lessons[card - 1].day.map(( lesson, index) => {
                            l = l + 1;
                         
                        return <Lessons key={lessons[card - 1].day[l - 1].id} lesson = {lessons[card - 1].day[l - 1].title } time={lessons[card - 1].day[l - 1].time} index={index} />
                        }) }
                 
                    </List>
                </CardContent>
                <CardActions id = {'действие' + card} >
                    <Button id = {'кнопка' + card}  size="small" color="primary" onClick={handleClickOpen}>
                        Добавить
                    </Button>
                    {/* <Button size="small" color="primary">
                        Текст 2
                    </Button> */}
                </CardActions>
            </Grid>
        ))}
    </Grid>
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Добавить занятие</DialogTitle>
        <DialogContent>
            <TextField 
                autoFocus
                value = {lessonValue}
                onChange = {handleLessonChange}
                margin="dense"
                id="lessonName"
                label="Название занятия"
                type="lessonName"
                fullWidth
            />
            <TextField 
                value = {time}
                onChange = {handleTimeChange}
                margin="dense"
                id="lessonTime"
                label="Время занятия"
                type="lessonTime"
                fullWidth
            />
        </DialogContent>
        <DialogActions>
            <Button onClick={handleClose} color="primary">Отмена</Button>
            <Button onClick={handleEnter} color="primary">Добавить</Button>
        </DialogActions>
    </Dialog>     
    </Container> 
  );
}
export default GridGroup;