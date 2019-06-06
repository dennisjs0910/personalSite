import React, { Component } from "react";
import * as Layouts from "./layouts";
import { BlogContainer } from "./blog";
import { LoginContainer } from "./login";
import { RegistrationContainer } from "./registration";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// Styling Imports
import 'antd/dist/antd.css'; // can move to babel
import { Layout } from 'antd';

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
  render() {
    return (
      <Router>
        <div className="App" style={{ height: "100%" }}>
        <Layouts.NavBar />
          <Layout>
            <Switch>
              <Route key="homepage" exact path= "/" component={ Layouts.HomePage } />
              <Route key="blogs" exact path= "/blogs" component={ BlogContainer } />
              <Route key="login" exact path= "/login" component={ LoginContainer } />
              <Route key="signup" exact path= "/signup" component={ RegistrationContainer } />
              <Route key="page404" path="/*" component={Layouts.Page404} />
            </Switch>
            {/** <Footer>footer</Footer> */}
          </Layout>
        </div>
      </Router>
    );
  }
}

export default App;

