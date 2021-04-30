import React, {useContext} from 'react';
import { Container, AppBar, Toolbar, IconButton, Box, makeStyles, Dialog, DialogTitle,
     DialogContent, DialogContentText, TextField, DialogActions, Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import MenuIcon from '@material-ui/icons/Menu';
import ThemeContext from "../Context";
import users from "../users";


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1
    },
    menuButton: {
      marginRight: theme.spacing(1)
    },
    logInButton: {
        float: 'right'
    },
    Button: {
        marginRight: theme.spacing(1)
    }
  }));



function AppBarTop(props) {
    function userSearch1(login){
        console.log(props.role);
        return login.login === props.role;  
    }

    let {status, setstatus} = useContext(ThemeContext)

    const classes = useStyles();

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const handleCloseEnter1 = () => {
        
        if (users.find(userSearch1) !== undefined) {
            document.getElementById('login').value = 'пользователь с таким именем уже существует';    
        } else {
            users.push(({id: users.length + 1, login: document.getElementById('login').value, password: document.getElementById('pass').value, role: 'student'}));
            document.getElementById('login').value = 'успешно';
            props.handleCloseEnter('');
        }
        console.log(users);
    }

    try {
    return (
    <AppBar position="fixed">
        <Container fixed>
            <Toolbar> 
                <IconButton edge="start" color="inherit" aria-label="menu" className={classes.menuButton}> 
                    <MenuIcon />
                </IconButton>
                
                
                {(users.find(userSearch1).role === 'teacher'  || users.find(userSearch1).role === 'student' || users.find(userSearch1).role === 'admin')
                ?   (<Typography className={classes.Button}>{props.role}</Typography>) :
                <></>
                }
                <Box >
                {(users.find(userSearch1).role === 'teacher' || users.find(userSearch1).role === 'student' || users.find(userSearch1).role === 'admin')
    
                    ? (<><Button variant="contained" color="secondary" onClick={() => props.handleCloseEnter('') }className={classes.Button}>Выйти</Button>
                    {(status !== 'false')
                       ? <Button  variant="contained" onClick={status => setstatus('false')}>Назад</Button>
                    :
                    <></>
                    }
                    </>):

                    <> <Button variant="contained" onClick={handleClickOpen}>Войти</Button> 

                    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                        <DialogTitle id="form-dialog-title">Вход</DialogTitle>
                        <DialogContent>
                            <DialogContentText> Авторизация</DialogContentText>
                            <TextField 
                                autoFocus
                                margin="dense"
                                id="login"
                                label="Логин"
                                type="login"
                                fullWidth
                            />
                            <TextField 
                                autoFocus
                                margin="dense"
                                id="pass"
                                label="Пароль"
                                type="passowrd"
                                fullWidth
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose} color="primary">Отмена</Button>
                            <Button onClick={() => props.handleCloseEnter(document.getElementById('login').value)} color="primary">Войти</Button>
                            <Button onClick={handleCloseEnter1} color="primary">Регистрация</Button>
                        </DialogActions>
                    </Dialog>
                    </>
                }
                                    
                </Box>
            </Toolbar>
        </Container>
    </AppBar>
    );
    } catch {
        return (
        <AppBar position="fixed">
            <Container fixed>
                <Toolbar> 
                    <IconButton edge="start" color="inherit" aria-label="menu" className={classes.menuButton}> 
                        <MenuIcon />
                    </IconButton>
                    <Box > 
                        <Button variant="contained" onClick={handleClickOpen}>Войти</Button> 
    
                        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                            <DialogTitle id="form-dialog-title">Вход</DialogTitle>
                            <DialogContent>
                                <DialogContentText> Авторизация</DialogContentText>
                                <TextField 
                                    autoFocus
                                    margin="dense"
                                    id="login"
                                    label="Логин"
                                    type="login"
                                    fullWidth
                                />
                                <TextField 
                                    autoFocus
                                    margin="dense"
                                    id="pass"
                                    label="Пароль"
                                    type="passowrd"
                                    fullWidth
                                />
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleClose} color="primary">Отмена</Button>
                                <Button onClick={() => props.handleCloseEnter(document.getElementById('login').value)} color="primary">Войти</Button>
                                <Button onClick={handleCloseEnter1} color="primary">Регистрация</Button>
                            </DialogActions>
                        </Dialog>          
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
        );    
    }
}
export default AppBarTop;