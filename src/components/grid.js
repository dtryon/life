'use strict';

var React = require('react');

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

module.exports = Grid;