'use strict';

/*
Any live cell with fewer than two live neighbours dies, as if caused by under-population.
Any live cell with two or three live neighbours lives on to the next generation.
Any live cell with more than three live neighbours dies, as if by overcrowding.
Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
*/

describe('Game of Life', function () {

	var game;

	beforeEach(function () {
		game = Game(30);
	});

	it('should create a new 10 x 10 grid', function () {
		expect(game.grid().length).toBe(30);
		expect(game.grid()[0].length).toBe(30);
	});

	it('should set cell', function () {
		game.setCell(1,1);
		expect(game.grid()[1][1]).toBe(1);
	});

	it('should unset cell', function () {
		game.setCell(1,1);
		game.unSetCell(1,1);
		expect(game.grid()[1][1]).toBe(0);
	});

	it('should set cells', function () {
		game.setCells([{x:1,y:1},{x:2,y:2}]);
		expect(game.grid()[1][1]).toBe(1);
		expect(game.grid()[2][2]).toBe(1);
	});

	describe('Any live cell with fewer than two live neighbours dies, as if caused by under-population.', function () {
		it('should kill cell with no live neighbours', function () {
			game.setCell(3,3);
			game.nextFrame();
			expect(game.grid()[3][3]).toBe(0);
		});

		it('should kill cell with one live neighbour', function () {
			game.setCell(3,2);

			game.setCell(3,3);
			game.nextFrame();
			expect(game.grid()[3][3]).toBe(0);
		});

		it('should kill cell with one live neighbour in the previous row', function () {
			game.setCell(2,2);

			game.setCell(3,3);
			game.nextFrame();
			expect(game.grid()[3][3]).toBe(0);
		});

		it('should kill cell with one live neighbour in the next row', function () {
			game.setCell(4,4);

			game.setCell(3,3);
			game.nextFrame();
			expect(game.grid()[3][3]).toBe(0);
		});
	});
	
	describe('Any live cell with two or three live neighbours lives on to the next generation.', function () {

		it('should save cell with two live neighbours', function () {
			game.setCell(3,2);
			game.setCell(3,4);

			game.setCell(3,3);
			game.nextFrame();
			expect(game.grid()[3][3]).toBe(1);
		});

		it('should save cell with three live neighbours', function () {
			game.setCell(3,2);
			game.setCell(3,4);
			game.setCell(4,4);

			game.setCell(3,3);
			game.nextFrame();
			expect(game.grid()[3][3]).toBe(1);
		});

		it('should save cell with three live neighbours on different rows', function () {
			game.setCell(2,2);
			game.setCell(3,4);
			game.setCell(4,4);

			game.setCell(3,3);
			game.nextFrame();
			expect(game.grid()[3][3]).toBe(1);
		});
	});

	describe('Any live cell with more than three live neighbours dies, as if by overcrowding.', function () {

		it('should kill cell with four live neighbours on different rows', function () {
			game.setCell(2,2);
			game.setCell(3,4);
			game.setCell(4,4);
			game.setCell(4,3);

			game.setCell(3,3);
			game.nextFrame();
			expect(game.grid()[3][3]).toBe(0);
		});

		it('should kill cell with five live neighbours on different rows', function () {
			game.setCell(2,2);
			game.setCell(3,4);
			game.setCell(4,4);
			game.setCell(4,3);
			game.setCell(4,2);

			game.setCell(3,3);
			game.nextFrame();
			expect(game.grid()[3][3]).toBe(0);
		});
	});

	describe('Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.', function () {

		it('should set cell with three live neighbours on different rows', function () {
			game.setCell(2,2);
			game.setCell(3,4);
			game.setCell(4,4);

			game.nextFrame();
			expect(game.grid()[3][3]).toBe(1);
		});
	});

	describe('Set common patterns', function () {

		it('should set acorn', function () {

			game.setAcorn(12, 7);

			expect(game.grid()[12][7]).toBe(1);
			expect(game.grid()[12][8]).toBe(1);
			expect(game.grid()[10][8]).toBe(1);
			expect(game.grid()[11][10]).toBe(1);
			expect(game.grid()[12][11]).toBe(1);
			expect(game.grid()[12][12]).toBe(1);
			expect(game.grid()[12][13]).toBe(1);
		});
	});
});