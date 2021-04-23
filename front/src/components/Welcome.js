import React from 'react';
import { Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    main: {
      marginTop: theme.spacing(9),
    }
  }));

function Welcome() {

    const classes = useStyles();

    return (
        <>
            <Container className={classes.main}>
                <h3>Войдите в аккаунт чтобы продолжить</h3>        
            </Container > 
        </>
    );
}
export default Welcome;