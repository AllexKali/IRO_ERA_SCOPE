import React, {useContext, useState} from 'react';
import { Container, AppBar, Toolbar, IconButton, Box, makeStyles, Dialog, DialogTitle,
     DialogContent, DialogContentText, TextField, DialogActions, Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import MenuIcon from '@material-ui/icons/Menu';
import ThemeContext from "../Context";
import users from "../users";
import { useHttp } from '../Hooks/http.hook';
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
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  let findUser = false;

  function AppBarTop(props) {
      console.log(props.role);
    const auth = useContext(ThemeContext);

    const { request} = useHttp();
        const [form, setForm] = useState({
            login: '',  password: ''  
        })
    
        const changeHandler = event => {
            setForm({login: document.getElementById('login').value, password: document.getElementById('password').value});
        }
    
        const handleCloseEnter2 = async () => {
            try {
                const data = await request('http://5.167.37.81:3307/auth/signup', 'POST', {...form});
            } catch (e) {
    
            }    
        }

        const handleCloseEnter3 = async () => {
            try {
                const data = await request('http://5.167.37.81:3307/auth/login', 'POST', {...form});
                auth.login(data.token, data.userId);
                props.handleCloseEnter5(data.userRole);
                props.handleCloseEnter4(document.getElementById('login').value);
            } catch (e) {
    
            }    
        }

        // function updateLogin() {
        //     console.log(auth.login + " 1");
        //     auth.login(document.getElementById('login').value);
        //     console.log(auth.login);
        // }
    
        function userSearch1(login){
            return login.login === props.role;  
        }
    
        let {status, setstatus} = useContext(ThemeContext);
    
        const classes = useStyles();
    
        const [open, setOpen] = React.useState(false);
        const [openSnackbar, setOpenSnackbar] = React.useState(false);
    
        const handleClickOpen = () => {
            setOpen(true);
        }
    
        const handleClose = () => {
            setOpen(false);
        }
    
        const handleCloseSnackbar = () => {
            setOpenSnackbar(false);
        }
    
        const handleCloseEnter1 = () => {
            // handleCloseEnter2(); //передает данные на сервер
            findUser = false;
            for (let i = 0; i < users.length; i++){
                if(users[i].login.includes(document.getElementById('login').value) === true){
                    findUser = true;
                    break;
                }
            }
            if (findUser) {
                document.getElementById('login').value = 'пользователь с таким именем уже существует';    
            } else {
                users.push(({id: users.length + 1, login: document.getElementById('login').value, password: document.getElementById('password').value, role: 'student'}));
                document.getElementById('login').value = 'успешно';
                document.getElementById('password').value = '';
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
                    
                    {(props.serverRole === 1 || props.serverRole === 2 || props.serverRole === 3)
                    ?   (<Typography className={classes.Button}>{props.role}</Typography>) :
                    <></>
                    }
                    <Box >
                    {(props.serverRole === 1 || props.serverRole === 2 || props.serverRole === 3)
        
                        ? (<><Button variant="contained" color="secondary" onClick={() => {props.handleCloseEnter4(''); props.handleCloseEnter5();}}className={classes.Button}>Выйти</Button>
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
                        </Dialog>
                        </>
                    }
                                        
                    </Box>
                </Toolbar>
            </Container>
            <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                    <Alert onClose={handleCloseSnackbar} severity="success">
                        This is a success message!
                    </Alert>
                </Snackbar>
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
                            </Dialog>          
                        </Box>
                    </Toolbar>
                </Container>
                <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                    <Alert onClose={handleCloseSnackbar} severity="success">
                        Регистрация прошла успешно!
                    </Alert>
                </Snackbar>
            </AppBar>
            );    
        }
    }
export default AppBarTop;