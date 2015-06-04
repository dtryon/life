'use strict';

var React = require('react'),
	Game = require("../game/game.js");

var GameControl = React.createClass({displayName: 'GameControl',
	sizeChanged: function() {
		var size = React.findDOMNode(this.refs.size).value.trim();
		this.props.onSizeChanged(size);
	},
	speedChanged: function() {
		var speed = React.findDOMNode(this.refs.speed).value.trim();
		this.props.onSpeedChanged(speed);
	},
	start: function() {
		this.props.start();
	},
	clear: function() {
		this.props.clear();
	},
	setAcorn: function() {
		this.props.setAcorn();
	},
	render: function() {
		var startButtonLabel = this.props.started ? "Stop" : "Start";
	    return (
	      <div className="game-control">
	      	<legend>
		      	<span className="label">Size:</span> <input type="text" placeholder="size" onChange={this.sizeChanged} value={this.props.size} ref="size" />
		        <span className="label">Speed:</span> <input type="text" placeholder="speed" onChange={this.speedChanged} value={this.props.speed} ref="speed" />
		        <button onClick={this.start}>{startButtonLabel}</button>
		        <button onClick={this.clear}>Clear</button>
		        <br/>
		        <button onClick={this.setAcorn}>Acorn</button>
	        </legend>
	      </div>
	    );
  }
});

var Grid = React.createClass({displayName: 'Grid',
	cellClick: function(x, y) {
		this.props.onCellClick(x, y);
	},
	render: function() {
		var rows = [];
		for (var x = 0; x < this.props.data.length; x++) {
			var columns = [];
			for (var y = 0; y < this.props.data[x].length; y++) {
				var cellClassString = this.props.data[x][y] ? "grid-column-set" : "grid-column";
				columns.push(<td className={cellClassString} onClick={this.cellClick.bind(this,x,y)} key={"column" + y}></td>);
			}
			rows.push(<tr className="grid-row" key={"row" + x}>
		        		{columns}
		        	  </tr>);
		}
	    return (
	      <div className="game">
	        <table className="grid">
	        	<tbody>
	        		{rows}
	        	</tbody>
	        </table>
	        <div>
	        	<span className="label">Generations: {this.props.generationCount}</span>
	        </div>
	      </div>
	    );
  }
});

var GameOfLife = React.createClass({displayName: 'GameOfLife',
  getInitialState: function() {
  	var defaultSize = 30;
  	var game = Game.make(defaultSize);
    return {game: game, size: defaultSize, speed: 10};
  },
  sizeChanged: function(size) {
  	var game = Game.make(size);
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
  	var game = Game.make(this.state.size);
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