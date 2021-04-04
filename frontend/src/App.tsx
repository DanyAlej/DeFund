import React from 'react';
import Charities from './containers/Charities';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
    return (
        <div className="App">
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
                    </Route>
                </Switch>
            </Router>
        </div>
  );
}

export default App;
