import React, {useState} from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import users from "../users";
import { makeStyles, Dialog, DialogTitle, DialogContent, TextField, DialogActions} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    main: {
      width: '100%',
      backgroundColor: theme.palette.background.paper,
      marginTop: theme.spacing(1)

    },
    item: {
        backgroundColor: "#e0e0e0"
    },
    list: {
        left: '80%', 
        maxWidth: 400,
    }

  }));

  let idUser = 1;

function AdminPage() {

    let newUser = users;
    
    const [open, setOpen] = useState(false);
    const [openCreateDialog, setOpenCreateDialog] = useState(false);
    const [userRole, setUserRole] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [userLogin, setUserLogin] = useState('');
    const [userCourse, setUserCourse] = useState('');
    const [userModule, setUserModule] = useState('');
    const [userGroup, setUserGroup] = useState('');
    const [newUserRole, setNewUserRole] = useState('');
    const [newUserPassword, setNewUserPassword] = useState('');
    const [newUserLogin, setNewUserLogin] = useState('');
    const [searchUser, setSearchUser] = useState('');

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
        if( users[idUser - 1].role === 'student') {
            users[idUser - 1].course = userCourse;
            users[idUser - 1].module = userModule;
            users[idUser - 1].group = userGroup;
        }
        setOpen(false);
    }

    const handleConfirmNewUser = () => {
        
        users.push(({id: users.length + 1, login: newUserLogin, password: newUserPassword, role: newUserRole}));
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

        if(users[idUser - 1].role === 'student'){
            setUserCourse(users[idUser - 1].course);
            setUserModule(users[idUser - 1].module);
            setUserGroup(users[idUser - 1].group);
        };

        setOpen(true);
       
    };

    function filterItems(word) {
        console.log(searchUser + " 123");

        try {
        
        return newUser.filter(function(el) {
            return el.login.toLowerCase().indexOf(searchUser.toLowerCase()) > -1;
            
            
        })
        } catch {
            return newUser;
        }

    };

    const handleCourseChange = e => {
        setUserCourse(e.target.value);
    };

    const handleModuleChange = e => {
        setUserModule(e.target.value);
    };

    const handleGroupChange = e => {
        setUserGroup(e.target.value);
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
        <Typography >Поиск:&nbsp; 
        <TextField id='searchField' onChange={() => filterItems(setSearchUser(document.getElementById('searchField').value))}></TextField>
        
        
        </Typography>
        
        
        <List
            component="nav"
            aria-labelledby="nested-list-subheader"
            className={classes.main}
        >
        <ListItem button onClick={handleEnterUser} className={classes.item}>
            <ListItemText primary={'Добавить пользователя'} />
        </ListItem>
        
        { filterItems(searchUser).map((user) => {
            if(user.id % 2 === 0)
            {
             return (
                <ListItem button onClick={editUser} className={classes.item} id={user.id} key={user.id}>
                    <ListItemText primary={'Логин: ' + user.login} />
                    <ListItemText primary={'Пароль: ' + user.password} />
                    <ListItemText primary={'Роль: ' + user.role} />
                </ListItem>
            );
            } else {
            return (
                <ListItem button onClick={editUser} id={user.id} key={user.id}>
                    <ListItemText primary={'Логин: ' + user.login} />
                    <ListItemText primary={'Пароль: ' + user.password} />
                    <ListItemText primary={'Роль: ' + user.role} />
                </ListItem>
            );
            }
            
        }) 
        }
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
                    {(userRole === 'student')
                    ? <>
                    <TextField 
                        value = {userCourse}
                        onChange = {handleCourseChange}
                        margin="dense"
                        id="course"
                        label="Курс"
                        type="course"
                        fullWidth
                    />
                    <TextField 
                        value = {userModule}
                        onChange = {handleModuleChange}
                        margin="dense"
                        id="module"
                        label="Модуль"
                        type="module"
                        fullWidth
                    />
                    <TextField 
                        value = {userGroup}
                        onChange = {handleGroupChange}
                        margin="dense"
                        id="group"
                        label="Группа"
                        type="group"
                        fullWidth
                    />
                    </>:
                    <></>}
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