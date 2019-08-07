import React, { Component } from 'react';
import { Button, Modal, Container, Image } from 'semantic-ui-react'
import { BlogAction } from '../../actions';

// import { CommentEditor } from '../comment';
// import "./BlogModal.css";
const ADMIN = "admin";

const Footer = ({ blog, handleClose, currentUser }) => {
  return (
    <Modal.Actions>
      <Button negative content='Delete' />
      <Button color='orange' content='Update' />
      <Button  onClick={() => handleClose(null) } content='Close' />
    </Modal.Actions>
  )
};

const Summary = ({ blog }) => {
  return(
    <Container className="blog-item-body">
      <ItemParagraph summary={ blog.summary } />
    </Container>
  );
};

const BlogMediaContents = ({ contents }) => {
  return contents.map((content, idx) => <ItemBody key={ idx } content={ content }/>);
};

const ItemMedia = ({ content }) => {
  if (!content) return null;
  if (content.is_video) {
    return (
      <video controls className="blog-item-media">
        <source src={ content.media_url } type="video/mp4"/>
      </video>
    );
  } else {
    return (<Image className="blog-item-media" src={ content.media_url } />);
  }
};

const ItemBody = ({ content }) => (
  <Container className="blog-item-body">
    <ItemMedia content={ content } />
    <ItemParagraph summary={ content.summary } />
  </Container>
);

const ItemParagraph = ({ summary }) => {
  const paragraphs = summary.split("\n");
  return (
    <Container>
     { paragraphs.map((paragraph, idx) => <p key={ idx }>{ paragraph }</p>) }
    </Container>
  );
};

class BlogModal extends Component {
  render() {
    const { isVisible, blog, handleClose, currentUser } = this.props;
    return (
      <Modal open={ isVisible }>
        <Modal.Header content={ blog ? blog.title : ""} />
        <Modal.Content>
          <Summary blog={ blog } />
          <BlogMediaContents contents={ blog ? blog.contents : [] } />
        </Modal.Content>
        <Footer blog={ blog } handleClose={ handleClose } currentUser={ currentUser } />
      </Modal>
    );
  };

  handleDeleteOnClick = () => {
    const { deleteBlog, handleClose, blog} = this.props;
    blog.contents.forEach(content => BlogAction.deleteImage({
      public_id: content.public_id,
      resource_type: content.is_video ? 'video' : 'image'
    }));
    deleteBlog(blog);
    handleClose();
  };

  handleUpdateOnClick = () => {
    const { handleUpdateModal, blog } = this.props;
    handleUpdateModal(blog);
  };

  /**
   * This function returns the footor of a main mondal component.
   * If blog belongs to current_user, it will also show Update and Delete Buttons.
   * @param  {Function} handleClose [function that closes modal]
   * @return {ReactComponent[]}     [List of ReactComponent buttons]
   */
  // getFooterElements = (currentUser={}, {user_id}, handleClose) => {
  //   let footer = [];
  //   if (!!currentUser && (currentUser.id === user_id  || currentUser.permission === ADMIN)) {
  //     footer.push(
  //       (<Popconfirm
  //         key="popup"
  //         title="Are you sure you want to delete this blog?"
  //         onConfirm={ this.handleDeleteOnClick }
  //         okText="Yes"
  //         cancelText="No"
  //       >
  //         <Button
  //           type="danger"
  //           key="delete">
  //           Delete
  //         </Button>
  //       </Popconfirm>),
  //       (<Button
  //         onClick={ this.handleUpdateOnClick }
  //         className="warning-button"
  //         key="update">
  //         Update
  //       </Button>)
  //     );
  //   }

  //   footer.push(
  //     (<Button key="back" onClick={ handleClose }>
  //       Close
  //     </Button>)
  //   );
  //   return footer;
  // };

  // getCategoryJSX = ({ category=[] }) => {
  //   return category.map((element, idx) => (
  //     <Tag key={idx} className="blog-tag">
  //       {element}
  //     </Tag>
  //   ));
  // };

  // render() {
  //   const { isVisible, handleClose, blog, currentUser } = this.props;
  //   if (!blog) return null;

  //   return(
  //     <Modal
  //       className="blog-modal-container"
  //       width="70rem"
  //       title={<ModalHeader title={blog.title} />}
  //       visible={ isVisible }
  //       onCancel={() => handleClose(null) }
  //       footer={ this.getFooterElements(currentUser, blog, handleClose) }
  //     >
  //       <BlogSummary summary={ blog.summary }/>
  //       <BlogContents contents={blog.contents}/>
  //       <BlogTags tags={ blog.category } />
  //       <CommentEditor blogId={blog.id} parentId={blog.id} currentUser={currentUser}/>
  //     </Modal>
  //   );
  // };
}

export default BlogModal;