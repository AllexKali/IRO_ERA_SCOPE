import React, {useState, useContext} from 'react';
import { Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AppBarTop from './components/AppBarTop';
import ListSubject from './components/ListSubject';
import GridGroup from './components/GridGroups';
import Welcome from './components/Welcome';
import ThemeContext from "./Context";



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

//попытка залить на гит

const AccountRole = ({ role }) => {
  const {status} = useContext(ThemeContext)
  const classes = useStyles();

  if (role === 'учитель') { 
    return (
      <>
      <AppBarTop/>
      <Container className={classes.main}> {/*Нужен для центровки содержимого*/}
      
      {(status === 'false')
      ?(<ListSubject className={classes.main} />) :
      <GridGroup/>
      }
      
      </Container>
      </>
    );
  } else  if (role === 'ученик'){
    return (
      <>
      <AppBarTop/>
      <Container className={classes.main}>  
      <GridGroup/>
      </Container>
      </>
    );
  } else if (role === 'куратор') {
    return (
      <>
      <AppBarTop/>
      <Container className={classes.main}> 
      
      {(status === 'false')
      ?(<ListSubject className={classes.main} />) :
      <GridGroup/>
      }
      
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
}

const App = () => {
  const [role1, setRole1] = useState('учитель')
  return(
    <>
    <AccountRole role={role1}/>
    <AppBarTop role = {role1} handleCloseEnter={role1 => setRole1(role1)}/>
    </>
  )
}

export default App;
