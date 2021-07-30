import Login from './Components/Login'
import history from './Components/history'
import BuscarHeroeNavbar from './Components/BuscarHeroeNavbar'
import Inicio from './Components/Inicio'
import PersonajeDetalle from './Components/PersonajeDetalle'

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";


function App() {

  return (
    <Router history={history}>
      <Route component={BuscarHeroeNavbar} path='/' />
      <Switch>
        <Route component={Login} path="/" exact/>
        <Route component={Inicio} path="/Inicio" exact/>
        <Route component={PersonajeDetalle} path="/PersonajeDetalle" exact/>
      </Switch>
    </Router>
  );
}

export default App;
