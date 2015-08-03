'use strict';

var React = require('react');

var GameControl = React.createClass({displayName: 'GameControl',
	sizeChanged: function(e) {
		this.props.onSizeChanged(e.target.value);
	},
	speedChanged: function(e) {
		this.props.onSpeedChanged(e.target.value);
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
		      	<span className="label">Size:</span> <input type="text" placeholder="size" onChange={this.sizeChanged} value={this.props.size} />
		        <span className="label">Speed:</span> <input type="text" placeholder="speed" onChange={this.speedChanged} value={this.props.speed} />
		        <button className="start-button" onClick={this.start}>{startButtonLabel}</button>
		        <button onClick={this.clear}>Clear</button>
		        <br/>
		        <button onClick={this.setAcorn}>Acorn</button>
	        </legend>
	      </div>
	    );
  }
});

module.exports = GameControl;