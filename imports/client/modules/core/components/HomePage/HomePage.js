import React from 'react';

const HomePage = () => (
  <div className="jumbotron text-center">
    <h2>Mantra Base</h2>
    <p>A starting point for Mantra applications.</p>
    <p><a className="btn btn-success btn-lg" href="https://github.com/zksailor534/mantra-base" role="button">
      <i className="fa fa-github fa-lg pull-left" aria-hidden="true"></i> View on Github
    </a></p>
    <br/>
    <p>Based on <strong>Base</strong> by Meteor Chef</p>
    <p><a className="btn btn-success" href="https://themeteorchef.com/base" role="button">Read the Base Documentation</a></p>
    <p style={ { fontSize: '16px', color: '#aaa' } }>
      Currently at v0.3.1<br/>
      <a href="https://www.bithound.io/github/zksailor534/mantra-base">
        <img src="https://www.bithound.io/github/zksailor534/mantra-base/badges/score.svg" alt="bitHound Overall Score" />
      </a>
    </p>
  </div>
);

export default HomePage;
