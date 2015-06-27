'use strict';

var React = require('react');
var TestUtils = require('react/lib/ReactTestUtils');
var GameOfLife = require('../../src/components/game-of-life'); 

describe('game of life', function () {
  it('renders without problems', function () {
    var gameOfLife = TestUtils.renderIntoDocument(<GameOfLife/>);
    expect(gameOfLife).not.toBeUndefined();
  });
});