import React from 'react';
import { Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    main: {
      marginTop: theme.spacing(9),
    }
  }));

function Welcome(props) {

    const classes = useStyles();

    return (
        <>
            <Container className={classes.main}>
                {(props.message !== '')
                ?<h3>{props.message}</h3>:
                <h3>Войдите в аккаунт чтобы продолжить</h3>
                }   
            </Container > 
        </>
    );
}
export default Welcome;