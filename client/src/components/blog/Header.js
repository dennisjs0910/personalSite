import React, { Component } from 'react';
import { Button, List } from 'antd';
import { Link } from "react-router-dom";
import textFile from './data/blog-paragraph.json';

const BlogCreateButton = ({handleCreateModal}) => {
  return (
    <div>
      <h2 className="blogpage-main">Click 'Create' button to post a blog!</h2>
      <Button
        className="blog-create-button"
        type="primary"
        onClick={ () => handleCreateModal() }
      >
        Create
      </Button>
    </div>
  );
};

const NameResumeContainer = ({}) => {
  return(
    <div>
      <h1 className="blogpage-main">Joonsuk Dennis Yi</h1>
      <h2 className="blogpage-main resume-link">
        to view my resume please click
        <Link to="/resume" >
          {" here."}
        </Link>
      </h2>
    </div>
  );
};

const InfoContainer = () => {
  return (
    <div>
      <h2 className="blogpage-main">Scroll down to view all blogs!</h2>
    </div>
  )
};

const ContentBody = ({ currentUser, handleCreateModal}) => {
  let res = [];
  res.push(<NameResumeContainer key="intro"/>);

  if (!!currentUser) {
    res.push(<BlogCreateButton
      key="create"
      handleCreateModal={ handleCreateModal }
    />);
  }

  res.push(<InfoContainer key="info" />);
  return res;
};

export default class Header extends Component {
  renderContents(currentUser, handleCreateModal) {
    let res = [];
    res.push(<NameResumeContainer key="blogpage-nameResumeContainer"/>);

    if (!!currentUser) {
      res.push(<BlogCreateButton
        key="blogpage-createButtonContainer"
        handleCreateModal={ handleCreateModal }
      />);
    }

    return res;
  }

  render() {
    const { currentUser, handleCreateModal } = this.props;
    return(
      <div className="blog-header-container main-img">
        <ContentBody currentUser={currentUser} handleCreateModal={handleCreateModal} />
      </div>
    );
  }
}