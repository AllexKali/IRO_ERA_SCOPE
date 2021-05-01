import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import ThemeContext from './Context'

function Main() {
  const [status, setstatus] = useState('false')
  const [course, setCourse] = useState(0)
  const [module, setModule] = useState(0)
  const [group, setGroup] = useState(0)
  return (
    <React.StrictMode>
      <ThemeContext.Provider value={{status, setstatus , course, setCourse, module, setModule, group, setGroup}}>
        
        <App />
      </ThemeContext.Provider>
    </React.StrictMode>  
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
