
import React from 'react';
import Games from './data/games.json';
import Users from './data/users.json';
import {UserContext, ThemeContext} from './UserContext';
import { useContext } from 'react';

function MainBoard() {

  const {user,setUser}=useContext(UserContext);
  const {theme, setTheme}=useContext(ThemeContext);
  const [idGame, setIdGame] = React.useState(1);
  const [idestado, setIdestado] = React.useState(1);
  const momentoActual = new Date();
  const hora = momentoActual.getHours();
  const minuto = momentoActual.getMinutes();
  var horaImprimible = hora + " : " + minuto;
  const [list, setList] = React.useState([]);


  
  const addUser = (name)=>{
    var lista=[...list];
    if(!(list.find((user)=>user===name))){
      lista.push(name)};
    setList(lista);
    console.log(lista)
   }

  return (
    <section className='section-main-board'>
      {/* Contenedor para juegos destacados */}
      {/* Aquí puedes mostrar los juegos destacados */}
      <div className="card stream">
        <h2>
        <div className='text'>
        start <span className='streaming'>streaming</span> games differently</div>
        </h2>
        <h3>
        <div className='text2'>
        gamor now has <span className='streaming2'>stream party</span> platform</div>
        </h3>
        <nav className='stream'>
        {user==null?<ul>
            <li><button className='streambutton' >Create Account</button></li>
            <li><a href="#">Sign in</a></li>
        </ul>:<></>}
    </nav>
      </div>

      <div className="card mid">
        <div className='mid font'>
        <h2>Fornite New Season</h2>
        <h3>Join Live Stream</h3>
        <div className="clock">
        {horaImprimible}
        </div>
        <div className='list'>
          <div>
            {list.map(list=>(
              <div className='added'>{list}</div>
            ))}
          </div>
        </div>
      </div>
        {theme=='ligth'?<div className='logo'> <img className='img2' src={'fornite2.png'} style={{"z-index":"1"}} alt="fornite" /></div>:
        <div className='logo'> <img className='img1' style={{"z-index":"1"}} src={'fornite.png'} alt="fornite" /></div>}
         
      </div>

      <div className="card search">
        <h2>01. Choose Platform</h2>
        <div className="card-options">
        <input type="radio" id="html" name="fav_language" value="HTML"></input>
        <label for="html">Party</label>
        <input type="radio" id="css" name="fav_language" value="CSS"></input>
        <label for="css">Match</label>
        <input type="radio" id="javascript" name="fav_language" value="JavaScript"></input>
        <label for="javascript">Streams</label>
        </div>
         
        <div className='section-searching-game'>
        <h2>02. Searching Game</h2>
        <div className='searching'>
        <div className='custom-select' >
        <select id="game-select" onChange={(event) => setIdestado(parseInt(event.target.value))}>
            {Games.games.map(game=>(
                <option key={game.id} value={game.id}>{game.name}</option>
            ))}
        </select>
        </div>
        
        <div className='card users' >
        <table>
          {Users.users.map(user=>user.game === idGame && (
            <tr value={user.id}>
              <th><span className='number'>{user.id}</span></th>
              <th>{user.name}</th>
              <th><button onClick={()=>addUser(user.name)} className='add'>+</button></th>
            </tr>
            
          ))}

        </table>
        <button className='searchbutton' onClick={() => setIdGame(idestado)}>Search Now</button>
        </div>
        </div>
        </div>
        
      </div>
    </section>
  );
}

export default MainBoard;