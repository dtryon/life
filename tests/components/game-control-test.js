'use strict';

var React = require('react');
var TestUtils = require('react/lib/ReactTestUtils');
var GameControl = require('../../src/components/game-control'); 

describe('game control', function () {
  it('renders without problems', function () {
    var gameControl = TestUtils.renderIntoDocument(<GameControl/>);
    expect(gameControl).not.toBeUndefined();
  });

  it('Button is labelled with start if not started', function () {
    var started = false;
    var gameControl = TestUtils.renderIntoDocument(<GameControl started={started} />);
    var startButton = TestUtils.findRenderedDOMComponentWithClass(gameControl, 'start-button');

    expect(startButton.getDOMNode().textContent).toBe('Start');
  });

  it('Button is labelled with stop if started', function () {   
    var started = true;
    var gameControl = TestUtils.renderIntoDocument(<GameControl started={started} />);
    var startButton = TestUtils.findRenderedDOMComponentWithClass(gameControl, 'start-button');

    expect(startButton.getDOMNode().textContent).toBe('Stop');
  });
});