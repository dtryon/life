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
	render: function() {
		var startButtonLabel = this.props.started ? "Stop" : "Start";
	    return (
	      <div className="game-control">
	      	<legend>
		      	<span className="text-box-label">Size:</span> <input type="text" placeholder="size" onChange={this.sizeChanged} value={this.props.size} ref="size" />
		        <span className="text-box-label">Speed:</span> <input type="text" placeholder="speed" onChange={this.speedChanged} value={this.props.speed} ref="speed" />
		        <button onClick={this.start}>{startButtonLabel}</button>
		        <button onClick={this.clear}>Clear</button>
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
				columns.push(<td className={cellClassString} onClick={this.cellClick.bind(this,x,y)}></td>);
			}
			rows.push(<tr className="grid-row">
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
	      </div>
	    );
  }
});

var GameOfLife = React.createClass({displayName: 'GameOfLife',
  getInitialState: function() {
  	var game = Game.create(10);
    return {game: game, size: 10, speed: 1000};
  },
  sizeChanged: function(size) {
  	var game = Game.create(size);
  	this.setState({game: game, size: size});
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
  		var startedId = setInterval(function() {
  			this.state.game.nextFrame();
  			this.setState({game: this.state.game});
  		}.bind(this), this.state.speed);
  		this.setState({game: this.state.game, startedId: startedId});
  	}
  },
  clearGrid: function() {
  	var game = Game.create(this.state.size);
    this.setState({game: game});
  },
  render: function() {
    return (
      <div className="main">
        <Grid data={this.state.game.grid()} onCellClick={this.cellClicked} size={this.state.size} speed={this.state.speed} />
        <GameControl size={this.state.size}
        	started={!!this.state.startedId} 
        	speed={this.state.speed} 
        	onSizeChanged={this.sizeChanged} 
        	onSpeedChanged={this.speedChanged} 
        	start={this.startGame} 
        	clear={this.clearGrid} />
      </div>
    );
  }
});

React.render(
  <GameOfLife />,
  document.getElementById('content')
);
