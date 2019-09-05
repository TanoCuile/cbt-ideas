import React, { Component } from 'react';
import { connect } from 'react-redux';

import ideasActions from '../actions/ideas';

class ShareIdeaForm extends Component {

  state = {
    title: this.props.title,
    description: this.props.description
  }

  formSubmit = (e) => {
    e.preventDefault();
    const { createIdea } = this.props;
    this.setState({ title:"", description:"" });
    createIdea(this.state);
  }

  onChange = (e) => {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value })
  }

  render() {
    const { loading } = this.props;
    return (
      <form onSubmit={e => this.formSubmit(e)}>
        <fieldset disabled={loading}>
          <div className="form-group">
            <label>Title</label>
            <input
              className="form-control"
              type="text"
              placeholder="Enter title for your idea"
              name="title"
              value={this.state.title}
              onChange={this.onChange}
            />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              className="form-control"
              rows="3"
              name="description"
              value={this.state.description}
              onChange={this.onChange}
            />
            <small className="form-text text-muted">
              Describe what you want to change
            </small>
          </div>
          <button className="btn btn-primary" type="submit">
            {loading ? 'Sending...' : 'Submit'}
          </button>
        </fieldset>
      </form>
    );
  }
}

export default connect(
  state => state.ideasCreate,
  ideasActions
)(ShareIdeaForm);
