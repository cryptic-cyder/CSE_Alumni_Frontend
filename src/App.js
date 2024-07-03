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
import OthersProfile from "./Home/Profile-Others";
import UserJobPost from "./JobPost/UserJobPost";
import forgetPass from "./Registration/ForgetPassEmail";
import PassRecovery from "./Registration/PassRecovery";
import AboutUsPage from "./Home/About";
import Discussion from "./Home/Discussion";
import Members from "./Registration/All-Members";

function App() {
  return (

    <Router>
      <div>
        
        <Switch>
          <Route exact path="/" component={AlumniDashboard} />
          <Route path="/alumni-login" component={MyLogin} />
          <Route path="/admin-login" component={AdminLogin} />
          <Route path="/PendingRequestsPage" component={PendingRequestsPage} />
          <Route path="/Alumni-registration" component={Registration} />
          
          <Route path="/Register" component={Registration}></Route>
          <Route path="/User-Profile" component={userProfile}></Route>
          <Route path="/edit-profile" component={editProfile}></Route>
          
          <Route path="/Job-Arena" component={JobPost} />
          
          <Route path="/PostingJob" component={PostingJobRedirect} />
          <Route path="/othersPerson" component={OthersProfile}></Route>

          <Route path="/my-job-posts" component={UserJobPost}></Route>

          <Route path="/forgetPass" component={forgetPass}></Route>
          <Route path="/Password_Recovery" component={PassRecovery}></Route>
          <Route path="/About-us" component={AboutUsPage}></Route>

          <Route path="/Discussion" component={Discussion}></Route>
          <Route path="/AllMembers" component={Members}></Route>

        </Switch>
      </div>
    </Router>
  );
}

export default App;

