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



const AccountRole = ({ role }) => {
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
      <GridGroup/>
      }
      
      </Container>
      </>
    );
  } else  if (users.find(userSearch).role === 'student'){
    
    return (
      <>
      <AppBarTop role={role}/>
      <Container className={classes.main}>  
      <GridGroup/>
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

const App = () => {
  const [role1, setRole1] = useState('teacher')
  return(
    <>
    <AccountRole role={role1}/>
    <AppBarTop role = {role1} handleCloseEnter={role1 => setRole1(role1)}/>
    </>
  )
}

export default App;
