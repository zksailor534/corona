import React from 'react';
import { Jumbotron } from 'react-bootstrap';

const HomePage = () => (
  <Jumbotron className="text-center">
    <h2>Mantra Base</h2>
    <p>A starting point for Mantra applications.</p>
    <p><a className="btn btn-success" href="https://themeteorchef.com/base" role="button">Read the Base Documentation</a></p>
    <p style={ { fontSize: '16px', color: '#aaa' } }>Currently at v1.0.0</p>
  </Jumbotron>
);

export default HomePage;
