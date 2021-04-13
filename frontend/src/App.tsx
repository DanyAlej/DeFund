import React from 'react';
import Charities from './containers/Charities';
import Donors from './containers/Donors';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import {Symfoni} from './hardhat/SymfoniContext';
import './App.css';

function App() {
    return (
        <div className="App">
            <header className="App-header">
            </header>
            <Symfoni autoInit={true}>
                <Router>
                    <div className="navibar">
                    <p className="card__name" style={{marginTop:"20px", marginLeft:"15px"}}>DeFund: Plataforma decentralizada de financiación de fundaciones </p>
                    <nav>
                    <ul>
                    <li>
                        <Link to="/charity" style={{textDecoration: 'none', color: 'white' }}>[Para fundaciones] Crear un nuevo proyecto</Link>
                    </li>
                    <li>
                        <Link to="/donor" style={{textDecoration: 'none', color: 'white'}}>[Para Donantes] Contribuye a un proyecto</Link>
                    </li>
                    </ul>
                    </nav>
                    </div>
                    <div className="rest">
                    <Switch>
                        <Route path="/charity">
                        <Charities />
                        </Route>
                        <Route path="/donor">
                        <Donors />
                        </Route>
                    </Switch>
                    </div>
                </Router>
            </Symfoni>
        </div>
  );
}

export default App;
