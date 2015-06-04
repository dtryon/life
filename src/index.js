var React = require('react'),
	GameOfLife = require('./components/game-of-life'); 

React.render(
  <GameOfLife />,
  document.getElementById('content')
);