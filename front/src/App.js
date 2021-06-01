import React, {useState, useContext} from 'react';
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

const AccountRole = ({ role, serverRole }) => {
  
  const {course} = useContext(ThemeContext)
  const {module} = useContext(ThemeContext)
  const {group} = useContext(ThemeContext)
  const {status} = useContext(ThemeContext)
  const {findUser} = useContext(ThemeContext)
  

  const classes = useStyles();

  function userSearch(login){
    console.log(login.login === role);
    return login.login === role;
  }
try {
  if (serverRole === 1 || users.find(userSearch).role === 'teacher') { 
    
    return (
      <>
      <AppBarTop  role={role} serverRole={serverRole}/>
      
      <Container className={classes.main}>
      
      {(status === 'false')
      ?(<ListSubject className={classes.main} role={role}/>) :
      <GridGroup course={course} module={module} group={group} mounth={0} role={role}/>
      }
      
      </Container>
      </>
    );
  } else  if (serverRole === 2 || users.find(userSearch).role === 'student'){
    
    return (
      <>
      <AppBarTop role={role} serverRole={serverRole}/>
      <Container className={classes.main}>
      {(users.find(userSearch).course === undefined || users.find(userSearch).module  === undefined || users.find(userSearch).group  === undefined)
      ? <Welcome message={'Ожидате пока администратор назначит вам группу'}/> :
      <GridGroup course={users.find(userSearch).course} module={users.find(userSearch).module} group={users.find(userSearch).group} role={role}/>}   
      
      </Container>
      </>
    );
  } else if (serverRole === 3 || users.find(userSearch).role === 'admin') {
    return (
      <>
      <AppBarTop role={role} serverRole={serverRole}/>
      <Container className={classes.main}> 
      {(findUser === false)
      ?(<AdminPage />):
      <>{(status === 'false')
      ?(<ListSubject className={classes.main} role={role}/>) :
      <GridGroup course={course} module={module} group={group} role={role}/>
      }</>}
      
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

const App = () => {
  const [role1, setRole1] = useState('');
  const [serverRole1, setServerRole1] = useState('');
  
  return(
    <>
    <AccountRole role={role1} serverRole={serverRole1} />
    <AppBarTop   role = {role1} serverRole={serverRole1}  handleCloseEnter4={role1 => setRole1(role1)} handleCloseEnter5={serverRole1 => setServerRole1(serverRole1)}/>
    </>
  )
}

export default App;
