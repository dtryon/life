'use strict';

var React = require('react'),
	Game = require("../game/game.js");

var GameControl = React.createClass({displayName: 'GameControl',
	handleChange: function() {
		var size = React.findDOMNode(this.refs.size).value.trim();
		var speed = React.findDOMNode(this.refs.speed).value.trim();

		this.props.onChangeSettings({size:size, speed:speed});
	},
	render: function() {
	    return (
	      <div className="game-control">
	      	<input type="text" placeholder="size" onChange={this.handleChange} value={this.props.size} ref="size" />
	        <input type="text" placeholder="speed" onChange={this.handleChange} value={this.props.speed} ref="speed" />
	        <button>Start</button><br/>
	        <button>Clear</button>
	      </div>
	    );
  }
});

var Grid = React.createClass({displayName: 'Grid',
	render: function() {
		var columns = [];
		for (var i = 0; i < this.props.size; i++) {
			columns.push(<td className="grid-column"></td>);
		}

		var rows = [];
		for (var i = 0; i < this.props.size; i++) {
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
  	console.log(game);
    return {game: game, size: 10, speed: 1000};
  },
  settingsChanged: function(settings) {
  	var game = Game.create(settings.size);
  	console.log(game);
  	this.setState({game: game, size: settings.size, speed: settings.speed});
  },
  render: function() {
    return (
      <div className="main">
        <Grid data={this.state.game.grid()} size={this.state.size} speed={this.state.speed} />
        <GameControl size={this.state.size} speed={this.state.speed} onChangeSettings={this.settingsChanged} />
      </div>
    );
  }
});

React.render(
  <GameOfLife />,
  document.getElementById('content')
);
