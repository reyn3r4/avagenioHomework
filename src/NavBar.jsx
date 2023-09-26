import React from 'react';
import { useContext } from 'react';
import { useNavigate } from 'react-router';
import {UserContext, ThemeContext} from './UserContext';


function Navbar() {

    const {user,setUser}=useContext(UserContext);
    const {theme, setTheme}=useContext(ThemeContext);
    let navigate = useNavigate();

    const changeTheme =()=>{
      setTheme(theme==='ligth'?'dark':'ligth')
      document.body.className=theme;
     }

    const handleClick = () =>{
      navigate('/LoginPage')
    }
   
  return (
    <nav>
    {/* Enlaces de navegación */}
    <ul>
    <li><a href="#"><span className='home'>Home</span></a></li>
    <li><a href="#">Streams</a></li>
    <li><a href="#">Party</a></li>
    <li><a href="#">Premium</a></li>
    </ul>

    {/* Logo del sitio */}
    <div className='logo'> <img src={'logo.png'} alt="logo" /></div>

    {/* Inicio de sessión y crear cuenta*/}
    <nav>
    {user==null?
        <ul>
          <li><button  onClick={handleClick} className='sign' >Sign in</button></li>
          <li><button >Create Account</button></li>
        </ul>
        :<nav>Bienvenido {user}!</nav>}
        {theme=='ligth'?<button className='sun' onClick={changeTheme} >☀</button>:
        <button className='moon' onClick={changeTheme} >🌘​</button>}
    </nav>
    
  </nav>
  );
}

export default Navbar;
