'use strict';

var Game = (function () {
	var _grid;

	var init = function (size) {
		_grid = [];
		for (var x = size - 1; x >= 0; x--) {
			var row = [];
			for (var y = size - 1; y >= 0; y--) {
				row.push(0);
			}
			_grid.push(row);
		}
	}

	var grid = function () {
		return _grid;
	};

	var setCell = function (x, y) {
		_grid[x][y] = 1;
	};

	var unSetCell = function (x, y) {
		_grid[x][y] = 0;
	};

	var setCells = function (arr) {
		for (var i = arr.length - 1; i >= 0; i--) {
			_grid[arr[i].x][arr[i].y] = 1;
		};
	};

	var nextFrame = function () {

		function countRow(row, prevColumn, nextColumn, isNotCurrent) {
			var result = 0;
			if (row) {
				if (prevColumn) {
					result += row[prevColumn];
				}
				if (nextColumn) {
					result += row[nextColumn];
				}
				if (isNotCurrent) {
					result += row[prevColumn + 1]
				}
			}
			return result;
		}

		var gridClone = _grid.map(function (arr) {
			return arr.slice();
		});

		for (var x = gridClone.length - 1; x >= 0; x--) {
			var currentRow = gridClone[x],
				prevRow = null,
				nextRow = null;

			if (x > 0) {
				prevRow = gridClone[x - 1];
			}
			if (x < (gridClone.length - 1)) {
				nextRow = gridClone[x + 1];
			}

			for (var y = currentRow.length - 1; y >= 0; y--) {
				var count = 0,
					prevColumn = null,
					nextColumn = null;

				if (y > 0) {
					prevColumn = y - 1;
				}

				if (y < (currentRow.length - 1)) {
					nextColumn = y + 1;
				}

				count += countRow(prevRow, prevColumn, nextColumn, true);
				count += countRow(nextRow, prevColumn, nextColumn, true);
				count += countRow(currentRow, prevColumn, nextColumn);

				if (count < 2 || count > 3) {
					_grid[x][y] = 0;
				}

				if (count === 3) {
					_grid[x][y] = 1;
				}
			};
		};
	};

	return function (size) {

		init(size);

		return {
			grid: grid,
			setCell: setCell,
			unSetCell: unSetCell,
			setCells: setCells,
			nextFrame: nextFrame
		};
	}

})();

if (typeof exports !== 'undefined') {
	exports.make = Game;
}