// App.js

import React from "react";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Registration from "./Registration/RequestForAccount";
import MyLogin from "./Registration/MyLogin"; // Import your login component
import AdminLogin from "./Registration/AdminLogin";
import PendingRequestsPage from "./Registration/PendingRequestsPage";

import AlumniDashboard from "./Home/AlumniDashboard";
import userProfile from "./Home/Profile";
import editProfile from "./Home/EditProfile";

import JobPost from "./JobPost/JobPostArena";

import PostingJobRedirect from "./JobPost/PostJobPage";

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={Registration} />
          <Route path="/alumni-login" component={MyLogin} />
          <Route path="/admin-login" component={AdminLogin} />
          <Route path="/PendingRequestsPage" component={PendingRequestsPage} />
          <Route path="/Alumni-registration" component={Registration} />
          
          <Route path="/Home" component={AlumniDashboard}></Route>
          <Route path="/User-Profile" component={userProfile}></Route>
          <Route path="/edit-profile" component={editProfile}></Route>
          
          <Route path="/Job-Arena" component={JobPost} />
          
          <Route path="/PostingJob" component={PostingJobRedirect} />
          
          {/* Add more routes here if needed */}
        </Switch>
      </div>
    </Router>
  );
}

export default App;

/*import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;*/
