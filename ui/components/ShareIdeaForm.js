import React, { Component } from 'react'

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export default class ShareIdeaForm extends Component {

  state = {
    title: "",
    description: ""
  }

  formSubmit = (e) => {
    e.preventDefault();

  }

  onChange = (e) => {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value })
  }

  render() {
    return (
      <Form onSubmit={e => this.formSubmit(e)}>
        <Form.Group controlId="formBasicTitle">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter title for your idea"
            name="title"
            value={this.state.title}
            onChange={this.onChange}
          />
        </Form.Group>

        <Form.Group controlId="formBasicDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows="3"
            name="description"
            value={this.state.description}
            onChange={this.onChange}
          />
          <Form.Text className="text-muted">
            Describe what you want to change
          </Form.Text>
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    );
  }
}
