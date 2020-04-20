import React from 'react';
import './App.css';
import Home from './components/Home';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import {Function1,Function2,Function3,Function4,Function5,Function6} from './pages/index';


function App() {
  return (

    <div> 
      <Router>
          <div>
            <Route exact path="/" component={Home} />
            <Route path="/function1" component={Function1} />
            <Route path="/function2" component={Function2} />
            <Route path="/function3" component={Function3} />
            <Route path="/function4" component={Function4} />
            <Route path="/function5" component={Function5} /> 
            <Route path="/function6" component={Function6} />
          </div>
     </Router>
    </div> 
  
  );
}

export default App;
