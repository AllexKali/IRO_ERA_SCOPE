import React, { useContext} from 'react';
import { Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AppBarTop from './components/AppBarTop';
import ListSubject from './components/ListSubject';
import GridGroup from './components/GridGroups';
import Welcome from './components/Welcome';
import ThemeContext from "./Context";
import users from "./users";
import AdminPage from './components/AdminPage';

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
      main: {
      marginTop: theme.spacing(9),
    }
  }));

const AccountRole = ({ role }) => {
  
    const {course} = useContext(ThemeContext)
    const {module} = useContext(ThemeContext)
    const {group} = useContext(ThemeContext)
    const {status} = useContext(ThemeContext)
  
    const classes = useStyles();
  
    function userSearch(login){
      return login.login === role;
    }
  try {
    if (users.find(userSearch).role === 'teacher') { 
      
      return (
        <>
        <AppBarTop  role={role}/>
        
        <Container className={classes.main}> {/*Нужен для центровки содержимого*/}
        
        {(status === 'false')
        ?(<ListSubject className={classes.main} />) :
        <GridGroup course={course} module={module} group={group}/>
        }
        
        </Container>
        </>
      );
    } else  if (users.find(userSearch).role === 'student'){
      
      return (
        <>
        <AppBarTop role={role}/>
        <Container className={classes.main}>
        {(users.find(userSearch).course === undefined || users.find(userSearch).module  === undefined || users.find(userSearch).group  === undefined)
        ? <Welcome message={'Ожидате пока администратор назначит вам группу'}/> :
        <GridGroup course={users.find(userSearch).course} module={users.find(userSearch).module} group={users.find(userSearch).group} role={role}/>}   
        
        </Container>
        </>
      );
    } else if (users.find(userSearch).role === 'admin') {
      return (
        <>
        <AppBarTop role={role}/>
        <Container className={classes.main}> 
        
        <AdminPage />
        
        </Container>
        </>
      );  
    } else {
      
      return (
        <>
        <AppBarTop />
        <Welcome />
        </>
      )
    }
  } catch {
    
    return (
      <>
      <AppBarTop />
      <Welcome />
      </>
    )  
  }
  
}

export default AccountRole;