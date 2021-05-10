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

// const Subjects = [
//   {id: 0, title: 'Добавить'},
//   {id: 1, title: 'Курс 1'},
//   {id: 2, title: 'Курс 2'},
//   {id: 3, title: 'Курс 3'}
// ]

// const userData = React.createContext({
//   course: '',
//   module: '',
//   group: ''
// })



const AccountRole = ({ role, serverRole }) => {
  
  const {course} = useContext(ThemeContext)
  const {module} = useContext(ThemeContext)
  const {group} = useContext(ThemeContext)
  const {status} = useContext(ThemeContext)

  const classes = useStyles();

  function userSearch(login){
    console.log(login.login === role);
    return login.login === role;
  }
try {
  if (serverRole === 1) { 
    
    return (
      <>
      {/* {console.log('Teacher')} */}
      <AppBarTop  role={role} serverRole={serverRole}/>
      
      <Container className={classes.main}> {/*Нужен для центровки содержимого*/}
      
      {(status === 'false')
      ?(<ListSubject className={classes.main} />) :
      <GridGroup course={course} module={module} group={group}/>
      }
      
      </Container>
      </>
    );
  } else  if (serverRole === 2){
    
    return (
      <>
      {/* {console.log('pupil')} */}
      <AppBarTop role={role} serverRole={serverRole}/>
      <Container className={classes.main}>
      {(users.find(userSearch).course === undefined || users.find(userSearch).module  === undefined || users.find(userSearch).group  === undefined)
      ? <Welcome message={'Ожидате пока администратор назначит вам группу'}/> :
      <GridGroup course={users.find(userSearch).course} module={users.find(userSearch).module} group={users.find(userSearch).group} role={role}/>}   
      
      </Container>
      </>
    );
  } else if (serverRole === 3) {
    return (
      <>
      {/* {console.log('admin')} */}
      <AppBarTop role={role} serverRole={serverRole}/>
      <Container className={classes.main}> 
      
      <AdminPage />
      
      </Container>
      </>
    );  
  } else {
    
    return (
      <>
      {/* {console.log('first else')} */}
      <AppBarTop />
      <Welcome />
      </>
    )
  }
} catch {
  
  return (
    <>
    {/* {console.log('second else')} */}
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
    <AccountRole role={role1} serverRole={serverRole1}/>
    <AppBarTop   role = {role1} serverRole={serverRole1} handleCloseEnter4={role1 => setRole1(role1)} handleCloseEnter5={serverRole1 => setServerRole1(serverRole1)}/>
    </>
  )
}

export default App;
