'use strict';

var React = require('react'),
	Game = require('../game/game'),
  Grid = require('./grid'),
  GameControl = require('./game-control');

var GameOfLife = React.createClass({displayName: 'GameOfLife',
  getInitialState: function() {
  	var defaultSize = 30;
  	var game = Game(defaultSize);
    return {game: game, size: defaultSize, speed: 10};
  },
  sizeChanged: function(size) {
  	var game = Game(size);
  	this.setState({game: game, size: size, generationCount: 0});
  },
  speedChanged: function(speed) {
  	this.setState({speed: speed});
  },
  cellClicked: function(x, y) {
  	this.state.game.setCell(x, y);
  	this.setState({game: this.state.game});
  },
  startGame: function() {
  	if (this.state.startedId) {
  		clearInterval(this.state.startedId);
  		this.setState({startedId: null});
  	} else {
  		var count = 0;
  		var startedId = setInterval(function() {
  			this.state.game.nextFrame();
  			this.setState({game: this.state.game, generationCount: count++});
  		}.bind(this), this.state.speed);
  		this.setState({game: this.state.game, startedId: startedId});
  	}
  },
  setAcorn: function() {
  	this.state.game.setAcorn(12, 7);
  	this.setState({game: this.state.game});
  },
  clearGrid: function() {
  	var game = Game(this.state.size);
    this.setState({game: game, generationCount: 0});
  },
  render: function() {
    return (
      <div className="main">
        <Grid data={this.state.game.grid()} 
        	onCellClick={this.cellClicked} 
        	size={this.state.size} 
        	speed={this.state.speed}
        	generationCount={this.state.generationCount} />
        <GameControl size={this.state.size}
        	started={!!this.state.startedId} 
        	speed={this.state.speed} 
        	onSizeChanged={this.sizeChanged} 
        	onSpeedChanged={this.speedChanged} 
        	start={this.startGame} 
        	clear={this.clearGrid}
        	setAcorn={this.setAcorn} />
      </div>
    );
  }
});

module.exports = GameOfLife;