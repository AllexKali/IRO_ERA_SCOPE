import React, {useContext} from 'react';
import { Container, AppBar, Toolbar, IconButton, Box, makeStyles, Dialog, DialogTitle,
     DialogContent, DialogContentText, TextField, DialogActions, Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import MenuIcon from '@material-ui/icons/Menu';
import ThemeContext from "../Context";


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
    let {status, setstatus} = useContext(ThemeContext)

    const classes = useStyles();

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        console.log(props.role);
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    return (
    <AppBar position="fixed">
        <Container fixed>
            <Toolbar> 
                <IconButton edge="start"
                color="inherit" aria-label="menu" className={classes.menuButton}> 
                    <MenuIcon />
                </IconButton>
                {(props.role === 'учитель' || props.role === 'ученик' || props.role === 'куратор')
                ?   (<Typography className={classes.Button}>{props.role}</Typography>) :
                <></>
                }
                <Box >
                {(props.role === 'учитель' || props.role === 'ученик' || props.role === 'куратор')
    
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
                                id="name"
                                label="Email Adress"
                                type="email"
                                fullWidth
                            />
                            <TextField 
                                autoFocus
                                margin="dense"
                                id="pass"
                                label="Passowrd"
                                type="passowrd"
                                fullWidth
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose} color="primary">Отмена</Button>
                            <Button onClick={() => props.handleCloseEnter(document.getElementById('name').value)} color="primary">Войти</Button>
                        </DialogActions>
                    </Dialog>
                    </>
                }
                                    
                </Box>
            </Toolbar>
        </Container>
    </AppBar>
    );
}
export default AppBarTop;