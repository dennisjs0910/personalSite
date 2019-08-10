import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { connect } from 'react-redux';
import { isEmpty } from "lodash";

import { NavBar, Page404 } from "./layouts";
import { BlogContainer } from "./blog";
import { LoginContainer } from "./login";
import { RegistrationContainer } from "./registration";
import { ResumeContainer } from "./resume";
import { AuthAction } from "../actions";

import { Container } from 'semantic-ui-react';

// import "./App.css";

// const PrivateRoute = ({ component: Component, hasLoggedIn, ...rest }) => {
//   return (
//     <Route
//       {...rest}
//       render={(props) => hasLoggedIn === true ?
//         <Component {...props} /> :
//         <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
//       }
//     />
//   )
// }

class App extends Component {
  constructor(props) {
    super(props);
    this.state={};
  }
  static getDerivedStateFromProps(props, state) {
    if (isEmpty(props.error) && !props.hasLoggedIn) {
      props.dispatch(AuthAction.checkUser());
    }
    return null;
  }

  render() {
    return (
      <Router>
        <div className="App" style={{ height: "100%" }}>
          <NavBar />
          <Container>
            <Switch>
              <Route key="blogs" exact path= "/" component={ BlogContainer } />
              <Route key="login" exact path= "/login" component={ LoginContainer } />
              <Route key="signup" exact path= "/signup" component={ RegistrationContainer } />
              <Route key="resume" exact path= "/resume" component={ ResumeContainer } />
              <Route key="page404" path="/*" component={ Page404 } />
            </Switch>
          </Container>
        </div>
      </Router>
    );
  }
}

const mapStateToProps = state => state.auth;
export default connect(mapStateToProps)(App);

