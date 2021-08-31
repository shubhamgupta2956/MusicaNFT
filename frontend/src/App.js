import logo from "./logo.svg";
import "./App.css";
import ListingPage from "./views/ListingPage";
import Header from "./components/Header";
import { Route, Switch } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Header />
        <Switch>
          <Route exact path="/listing" component={ListingPage} />
          <Route exact path="/building" component={MusicBuildingPage} />
          <Route exact path="/login" component={LoginPage} />
        </Switch>
      </header>
    </div>
  );
}

export default App;
