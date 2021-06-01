import React, {useContext, useState} from 'react';
import { Container, AppBar, Toolbar, IconButton, Box, makeStyles, Dialog, DialogTitle,
    DialogContent, DialogContentText, TextField, DialogActions, Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import MenuIcon from '@material-ui/icons/Menu';
import ThemeContext from "../Context";
import users from "../users";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';


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

  function Alert(props) {
    return <MuiAlert elevation={15} variant="filled" {...props} />;
  }

  function AppBarTop(props) {

        const [form, setForm] = useState({
            login: '',  password: ''  
        })
    
        const changeHandler = event => {
            setForm({login: document.getElementById('login').value, password: document.getElementById('password').value});
        }

        const handleCloseEnter3 = async () => {
            props.handleCloseEnter4(document.getElementById('login').value);
        }
    
        function userSearch1(login){
            return login.login === props.role;  
        }
    
        let {status, setstatus} = useContext(ThemeContext);
        let {findUser, setFindUser} = useContext(ThemeContext);
    
        const classes = useStyles();
    
        const [open, setOpen] = React.useState(false);
        const [openSnackbar, setOpenSnackbar] = React.useState(false);
        const [openSnackbarAlert, setOpenSnackbarAlert] = React.useState(false);
    
        const handleClickOpen = () => {
            setOpen(true);
        }
    
        const handleClose = () => {
            setOpen(false);
        }
    
        const handleCloseSnackbar = () => {
            setOpenSnackbar(false);
            setOpenSnackbarAlert(false);
        }
    
        const handleCloseEnter1 = () => {
            findUser = false;
            for (let i = 0; i < users.length; i++){
                if(users[i].login.includes(document.getElementById('login').value) === true){
                    findUser = true;
                    break;
                }
            }
            if (findUser) {
                document.getElementById('login').value = '';
                setOpenSnackbarAlert(true);    
            } else {
                users.push(({id: users.length + 1, login: document.getElementById('login').value, password: document.getElementById('password').value, role: 'student'}));
                setOpenSnackbar(true);
                props.handleCloseEnter4('');
            }
        
            
        }

        

        try {
        return (
        <AppBar position="fixed">
            <Container fixed>
                <Toolbar> 
                    <IconButton edge="start" color="inherit" aria-label="menu" className={classes.menuButton}> 
                        <MenuIcon />
                    </IconButton>
                    
                    {(props.serverRole === 1 || props.serverRole === 2 || props.serverRole === 3 || users.find(userSearch1).role === 'teacher' || users.find(userSearch1).role === 'admin' || users.find(userSearch1).role === 'student')
                    ?   (<Typography className={classes.Button}>{props.role}</Typography>) :
                    <></>
                    }
                    <Box >
                    {(props.serverRole === 1 || props.serverRole === 2 || props.serverRole === 3 || users.find(userSearch1).role === 'teacher' || users.find(userSearch1).role === 'admin' || users.find(userSearch1).role === 'student')

                        ? (<>
                        {(users.find(userSearch1).role === 'student')
                        ?(setstatus('false')):
                        <></>}
                        
                        {(users.find(userSearch1).role === 'admin')
                        ?(<><Button variant="contained" color="default" onClick={findUser => setFindUser(true)} className={classes.Button}>Курсы</Button>
                        <Button variant="contained" color="default" onClick={findUser => setFindUser(false)} className={classes.Button}>Пользователи</Button>
                        </>):<></>
                        }
                        <Button variant="contained" color="secondary" onClick={() => {props.handleCloseEnter4(''); props.handleCloseEnter5();}}className={classes.Button}>Выйти</Button>
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
                                    label="Login"
                                    type="login"
                                    onChange={changeHandler}
                                    fullWidth
                                />
                                <TextField 
                                    margin="dense"
                                    id="password"
                                    label="Пароль"
                                    type="password"
                                    onChange={changeHandler}
                                    fullWidth
                                />
                                <TextField 
                                    margin="dense"
                                    id="code"
                                    label="Секретный код"
                                    type="code"
                                    onChange={changeHandler}
                                    fullWidth
                                />
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleClose} color="primary">Отмена</Button>
                                <Button onClick={() => {handleCloseEnter3(); }} color="primary">Войти</Button>
                                <Button onClick={handleCloseEnter1} color="primary">Регистрация</Button>
                            </DialogActions>
                            <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                                <Alert onClose={handleCloseSnackbar} severity="success">
                                    Регистрация прошла успешно!
                                </Alert>
                            </Snackbar>
                            <Snackbar open={openSnackbarAlert} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                                    <Alert onClose={handleCloseSnackbar} severity="error">
                                        Пользователь с таким именем уже существует!
                                    </Alert>
                                </Snackbar>
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
                                        onChange={changeHandler}
                                        fullWidth
                                    />
                                    <TextField 
                                        margin="dense"
                                        id="password"
                                        label="Пароль"
                                        type="password"
                                        onChange={changeHandler}
                                        fullWidth
                                    />
                                    <TextField 
                                    margin="dense"
                                    id="code"
                                    label="Секретный код"
                                    type="code"
                                    onChange={changeHandler}
                                    fullWidth
                                />
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={handleClose} color="primary">Отмена</Button>
                                    <Button onClick={() => {handleCloseEnter3();}} color="primary">Войти</Button>
                                    <Button onClick={handleCloseEnter1} color="primary">Регистрация</Button>
                                </DialogActions>
                                <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                                    <Alert onClose={handleCloseSnackbar} severity="success">
                                        Регистрация прошла успешно!
                                    </Alert>
                                </Snackbar>
                                <Snackbar open={openSnackbarAlert} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                                    <Alert onClose={handleCloseSnackbar} severity="error">
                                        Пользователь с таким именем уже существует!
                                    </Alert>
                                </Snackbar>
                            </Dialog>          
                        </Box>
                    </Toolbar>
                </Container>
                
            </AppBar>
            );    
        }
    }
export default AppBarTop;