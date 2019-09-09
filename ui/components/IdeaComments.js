import React, { Component } from 'react';
import { connect } from 'react-redux';

import ideasActions from '../actions/ideas';

const Comment = ({message, userName}) => (
  <div className="media">
    <img
      style={{ width: '64px', height: '64px' }}
      src="https://res.cloudinary.com/dq7aojv62/image/upload/v1567757889/user_cutuu3.png"
      alt=""
      className="mr-3"
    />
    <div className="media-body">
      <h5 className="mt-0">{ userName || 'User' }</h5>
      <p>{ message }</p>
    </div>
  </div>
);

class IdeaComments extends Component {
  state = {
    message: '',
  };

  componentDidMount() {
    const { ideaId, getIdeaComments } = this.props;
    getIdeaComments(ideaId);
  }

  onSubmit = e => {
    e.preventDefault();
    const { ideaId, createComment } = this.props;

    this.setState({ message: '' });
    createComment({ ideaId, commentData: this.state });
  };

  onChange = e => {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { commentsList, loading } = this.props;
    return (
      <div className="comments" style={{ margin: '15px' }}>
        <h3>Leave Your comments below</h3>
        <div className="comments-input">
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <textarea
                row={3}
                className="form-control"
                name="message"
                value={this.state.message}
                onChange={this.onChange}
              />
            </div>
            <button
              disabled={!this.state.message}
              type="submit"
              className="btn btn-primary"
            >
              Comment
            </button>
          </form>
        </div>
        <hr/>
        <div className="comments-list">
          {Array.isArray(commentsList) &&
            commentsList.map((comment, key) => <Comment key={key} {...comment} />)}
        </div>
      </div>
    );
  }
}

export default connect(
  ({ comments: { list: commentsList, loading } }) => ({
    commentsList,
    loading,
  }),
  ideasActions,
)(IdeaComments);
