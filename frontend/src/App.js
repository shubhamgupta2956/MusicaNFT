import './App.css';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Header from './components/Header';
import logo from './logo.svg';
import ListingPage from './views/ListingPage';
import LoginPage from './views/LoginPage';
import MusicBuildingPage from './views/MusicBuildingPage';

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <div style={{ width: '70vw', margin: 'auto', marginTop: 32 }}>
          <Switch>
            <Route exact path="/" component={LoginPage} />
            <Route exact path="/listing" component={ListingPage} />
            <Route exact path="/building" component={MusicBuildingPage} />
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
