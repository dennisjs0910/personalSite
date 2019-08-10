import React, { Component } from "react";
import { Grid, Icon } from 'semantic-ui-react';
import { Link } from "react-router-dom";
import './Page404.css';

export default class Page404 extends Component {
  render() {
    return (
      <Grid className="page404-container">
        <Grid.Row className="page404-top-row">
          <Grid.Column>
            <h1 className='page404-header'>Page 404</h1>
            <Icon className="page404-icon" name="question" size="massive"/>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <h2 className="page404-sub-header">Sorry, we couldn't find this page.</h2>
            <h2><Link to="/">Click here, to go back home.</Link></h2>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}
