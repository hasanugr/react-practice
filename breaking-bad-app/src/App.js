import "./App.css";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

// Pages
import Home from "./pages/Home";
import Detail from "./pages/Detail";
import Quotes from "./pages/Quotes";
import QuoteDetail from "./pages/QuoteDetail";

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Characters</Link>
            </li>
            <li>
              <Link to="/quotes">Quotes</Link>
            </li>
          </ul>
        </nav>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/detail/:char_id" component={Detail} />
          <Route path="/quotes" exact component={Quotes} />
          <Route path="/quotes/:quote_id" component={QuoteDetail} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
