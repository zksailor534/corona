import React from 'react';
import { Jumbotron } from 'react-bootstrap';

const HomePage = () => (
  <Jumbotron className="text-center">
    <h2>Mantra Base</h2>
    <p>A starting point for Mantra applications.</p>
    <p>Based on <strong>Base</strong> by Meteor Chef</p>
    <p><a className="btn btn-success" href="https://themeteorchef.com/base" role="button">Read the Base Documentation</a></p>
    <p style={ { fontSize: '16px', color: '#aaa' } }>Currently at v0.2.2</p>
  </Jumbotron>
);

export default HomePage;
