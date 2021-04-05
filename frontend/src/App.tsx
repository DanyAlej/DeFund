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

function App() {
    return (
        <div className="App">
            <header className="App-header">
            <Symfoni autoInit={true}>
                <h1>DeFund: Decentralized funding platform for charities</h1>
                <Router>
                    <div>
                    <nav>
                    <ul>
                    <li>
                        <Link to="/charity">[For Charities] Create a new Project</Link>
                    </li>
                    <li>
                        <Link to="/donor">[For Donors] Find a Project to Contribute</Link>
                    </li>
                    </ul>
                    </nav>
                    </div>
                    <Switch>
                        <Route path="/charity">
                        <Charities />
                        </Route>
                        <Route path="/donor">
                        <Donors />
                        </Route>
                    </Switch>
                </Router>
            </Symfoni>
            </header>
        </div>
  );
}

export default App;
