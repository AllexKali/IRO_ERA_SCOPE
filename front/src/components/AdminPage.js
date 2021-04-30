import React, {useState} from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import users from "../users";
import { makeStyles, Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions} from '@material-ui/core';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    main: {
      width: '100%',
      backgroundColor: theme.palette.background.paper,
      marginTop: theme.spacing(9)
    },
    item: {
        backgroundColor: "#e0e0e0"
    }

  }));

  let idUser = 1;
  let userLogin = '';

function AdminPage() {
    

    const [open, setOpen] = React.useState(false);
    const [openCreateDialog, setOpenCreateDialog] = React.useState(false);
    const [userRole, setUserRole] = React.useState('');
    const [userPassword, setUserPassword] = React.useState('');
    const [userLogin, setUserLogin] = React.useState('');
    const [newUserRole, setNewUserRole] = React.useState('');
    const [newUserPassword, setNewUserPassword] = React.useState('');
    const [newUserLogin, setNewUserLogin] = React.useState('');

    const handleClose = () => {
        setOpen(false);
    }

    const handleCloseNewUser = () => {
        setOpenCreateDialog(false);
    }

    const handleCloseCreate = () => {
        setOpenCreateDialog(false);
    }

    const handleConfirm = () => {
        users[idUser - 1].role = userRole;
        users[idUser - 1].login = userLogin;
        users[idUser - 1].password = userPassword;
        console.log(users);
        setOpen(false);
    }

    const handleConfirmNewUser = () => {
        users.push(({id: users.length + 1, login: newUserLogin, password: newUserPassword, role: newUserRole}));
        console.log(users);
        setOpenCreateDialog(false);
    }

    const handleEnterUser = () => {
        setOpenCreateDialog(true);
    }

    function editUser (e) {
        idUser = Number(e.currentTarget.id);
        setUserRole(users[idUser - 1].role);
        setUserPassword(users[idUser - 1].password);
        setUserLogin(users[idUser - 1].login);
        setOpen(true);
       
    };

    const handleRoleChange = e => {
        setUserRole(e.target.value);
    };

    const handleLoginChange = e => {
        setUserLogin(e.target.value);
    };

    const handlePasswordChange = e => {
        setNewUserPassword(e.target.value);
    };

    const handleNewRoleChange = e => {
        setNewUserRole(e.target.value);
    };

    const handleNewLoginChange = e => {
        setNewUserLogin(e.target.value);
    };

    const handleNewPasswordChange = e => {
        setNewUserPassword(e.target.value);
    };

    const classes = useStyles();

    return(
        <>
        <List
            component="nav"
            aria-labelledby="nested-list-subheader"
            className={classes.main}
        >
        <ListItem button onClick={handleEnterUser} className={classes.item}>
            <ListItemText primary={'Добавить пользователя'} />
        </ListItem>
        { users.map((user) => {
            if(user.id % 2 === 0)
            {
             return (
                <ListItem button onClick={editUser} className={classes.item} id={user.id}>
                    <ListItemText primary={'Логин: ' + user.login} />
                    <ListItemText primary={'Пароль: ' + user.password} />
                    <ListItemText primary={'Роль: ' + user.role} />
                </ListItem>
            );
            } else {
            return (
                <ListItem button onClick={editUser} id={user.id}>
                    <ListItemText primary={'Логин: ' + user.login} />
                    <ListItemText primary={'Пароль: ' + user.password} />
                    <ListItemText primary={'Роль: ' + user.role} />
                </ListItem>
            );
            }
            
        }) }
        </List>
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Редактировать пользователя: {userLogin}</DialogTitle>
            <DialogContent>
                    <TextField 
                        autoFocus
                        value = {userLogin}
                        onChange = {handleLoginChange}
                        margin="dense"
                        id="login"
                        label="Логин"
                        type="login"
                        fullWidth
                    />
                    <TextField 
                        value = {userPassword}
                        onChange = {handlePasswordChange}
                        margin="dense"
                        id="pass"
                        label="Пароль"
                        type="passowrd"
                        fullWidth
                    />
                    <TextField 
                        value = {userRole}
                        onChange = {handleRoleChange}
                        margin="dense"
                        id="role"
                        label="Роль"
                        type="role"
                        fullWidth
                    />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">Отмена</Button>
                <Button onClick={handleConfirm} color="secondary">Подтвердить</Button>
            </DialogActions>
        </Dialog>
        <Dialog open={openCreateDialog} onClose={handleCloseCreate} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Создать пользователя</DialogTitle>
            <DialogContent>
                    <TextField 
                        autoFocus
                        value = {newUserLogin}
                        onChange = {handleNewLoginChange}
                        margin="dense"
                        id="newLogin"
                        label="Логин"
                        type="newLogin"
                        fullWidth
                    />
                    <TextField 
                        value = {newUserPassword}
                        onChange = {handleNewPasswordChange}
                        margin="dense"
                        id="newPass"
                        label="Пароль"
                        type="newPass"
                        fullWidth
                    />
                    <TextField 
                        value = {newUserRole}
                        onChange = {handleNewRoleChange}
                        margin="dense"
                        id="newRole"
                        label="Роль"
                        type="newRole"
                        fullWidth
                    />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCloseNewUser} color="primary">Отмена</Button>
                <Button onClick={handleConfirmNewUser} color="secondary">Создать</Button>
            </DialogActions>
        </Dialog>
        </>
    );
}

export default AdminPage;