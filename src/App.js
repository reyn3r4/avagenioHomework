import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import MainPage from './MainPage';
import LoginPage from './LoginPage';
import React, {useState,useEffect} from 'react';
import {UserContext, ThemeContext} from './UserContext';
import './Main.css';




function App() {

  const [user, setUser]=useState(null);
  const [theme, setTheme]=useState('ligth');
  //const [user]= useReducer(setUser);

   
  

   useEffect(()=>{
    setTheme(theme==='ligth'?'dark':'ligth')
    document.body.className=theme;
  },[])
    
  return (
    <>
    <UserContext.Provider value={{user,setUser}}>
    <ThemeContext.Provider value={{theme,setTheme}}>
     <Router>
      <Routes>
       <Route path='/' element={<MainPage/>}/>  
       <Route path='/LoginPage' element={<LoginPage/>}/>
      </Routes>
     </Router>
    </ThemeContext.Provider>
    </UserContext.Provider>
    </>
  );
}

export default App;