import React, { Component } from "react";
import * as Layouts from "components/layouts";
import { BlogContainer, BlogFormContainer } from "components/blog";

// add back "Redirect" to "react-router-dom"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// Styling Imports
import 'antd/dist/antd.css'; // can move to babel
import { Layout } from 'antd';
// const { Content, Footer } = Layout;

// import * as Containers from "components/containers";
// import { isEmpty } from "lodash";

// import { connect } from "react-redux";
// import { Container } from "semantic-ui-react";
// import { AuthAction } from 'actions';


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
    // This is to avoid warning message
    this.state = {};
  }

  // static getDerivedStateFromProps(props, state) {
  //   if (!props.auth.isFetching && isEmpty(props.auth.err) && !props.auth.hasLoggedIn) {
  //     props.dispatch(AuthAction.checkUser());
  //   }
  //   return null;
  // }
  //

  // TODO: CAN REMOVE WHEN NOT IN USE
  // _renderRandomText = () => {
  //   const paragraph = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
  //   let text = [];
  //   for (let i = 0; i < 50; i++) {
  //     text.push(`${paragraph} ${i}`);
  //   }
  //   return text;
  // }

  render() {
    return (
      <Router>
        <div className="App" style={{ height: "100%" }}>
        <Layouts.NavBar />
          <Layout>

            <Switch>
              <Route key="homepage" exact path= "/" component={ Layouts.HomePage } />
              <Route key="blogs" exact path= "/blogs" component={ BlogContainer } />
              {/** TODO: fix uri for blogForm */}
              <Route key="blogForm" exact path= "/blogForm" component={ BlogFormContainer } />
            </Switch>
            {/** <Footer>footer</Footer> */}
          </Layout>
        </div>
      </Router>
    );
  }
}


// render() {
//   return (
//     <Router>
//       <div className="App" style={{ height: "100%" }}>
//         <Layouts.NavBar />
//         <div className="app-body" style={{ width: "100%" }}>
//           <Switch>
//             <Route key="login" exact path="/login" component={Containers.LoginContainer}/>
            // <PrivateRoute key="appointment" exact path="/" component={Containers.CalendarContainer} hasLoggedIn={this.props.auth.hasLoggedIn} />
//             <PrivateRoute key="appointment" path="/appointment" component={Containers.CalendarContainer} hasLoggedIn={this.props.auth.hasLoggedIn} />
//             <PrivateRoute key="report" path="/report" component={Containers.ReportContainer} hasLoggedIn={this.props.auth.hasLoggedIn} />
//             <PrivateRoute key="user" path="/user" component={Containers.UserContainer} hasLoggedIn={this.props.auth.hasLoggedIn} />
//             <Route key="page404" path="/*" component={Layouts.Page404} />
//           </Switch>
//         </div>
//       </div>
//     </Router>
//   );
// }

// const mapStateToProps = state => {
//   const { auth } = state;
//   return { auth };
// };
// export default connect(mapStateToProps)(App);

export default App;

