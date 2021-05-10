import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import ThemeContext from './Context'
import { useAuth } from './Hooks/auth.hook';

function Main() {
  const [status, setstatus] = useState('false');
  const [course, setCourse] = useState(0);
  const [module, setModule] = useState(0);
  const [group, setGroup] = useState(0);
  const {token, login, logout, userId} = useAuth();
  const isAuthenticated = !!token;
  const userLogin = '';

  return (
      <ThemeContext.Provider value={{status, setstatus , course, setCourse, module, setModule, group, setGroup, token, login, logout, userId, isAuthenticated, userLogin}}>
        <App />
      </ThemeContext.Provider>
  )
}

ReactDOM.render(

  <Main />,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
