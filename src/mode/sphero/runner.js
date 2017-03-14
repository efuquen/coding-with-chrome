/**
 * @fileoverview Runner for the Sphero modification.
 *
 * @license Copyright 2015 The Coding with Chrome Authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @author mbordihn@google.com (Markus Bordihn)
 */
goog.provide('cwc.mode.sphero.Runner');

goog.require('cwc.runner.profile.sphero.Command');
goog.require('cwc.runner.profile.sphero.Monitor');
goog.require('cwc.ui.Runner');
goog.require('cwc.ui.Turtle');
goog.require('cwc.utils.Helper');

goog.require('goog.dom');



/**
 * @constructor
 * @param {!cwc.utils.Helper} helper
 * @param {!cwc.mode.sphero.Connection} connection
 * @struct
 * @final
 */
cwc.mode.sphero.Runner = function(helper, connection) {
  /** @type {string} */
  this.name = 'Sphero Runner';

  /** @type {!cwc.utils.Helper} */
  this.helper = helper;

  /** @type {string} */
  this.prefix = helper.getPrefix('sphero-runner');

  /** @type {!cwc.mode.sphero.Connection} */
  this.connection = connection;

  /** @type {!cwc.protocol.sphero.Api} */
  this.api = this.connection.getApi();

  /** @type {!cwc.runner.profile.sphero.Command} */
  this.command = new cwc.runner.profile.sphero.Command(this.api);

  /** @type {string} */
  this.sprite = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAA' +
    'DE6YVjAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAAxAAAAMQBz4pYTAAAABl0RVh0U29mdH' +
    'dhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAKwSURBVEiJtdY9b9NAGAfw/9m5OG9qm6atSB' +
    'NRXhbUJVXldAgqDG2XdELqUGBCiA/AJ2CDhR0GxMJSJFbKgCrEYlTFUlSpHUBVWgWaRDImSW' +
    'Unjs/2sVBU0ryoov6PZ+v53fl0vodgQBRFCUej0ZVYLJYXRXGOc54khIxxzhuEkKrrukXDMD' +
    '6Ypvkxl8u1+9UhvQZVVaXRaPR+JBJ5Qim9MmgiAOA4zlGr1XpeKpVe5PP5zlCkUChcSyQSb0' +
    'OhkDyseHcsyyrour6ezWZLfZFisZibmJh4J4pisleRWq2GcrkMXdfR6XTAOYckSRgdHUUqlc' +
    'LMzAw8z6tomrY2Pz//5Qyiqur1ycnJz5TSVC9AURTs7u4OXMn09DTy+Txc162Vy+Xbi4uL3w' +
    'BAAIC9vb3g+Pj4Rj8AAAzDGAgAgGma4JyDUnopnU6/UVWVAkAAAAghj4btwfLyMvb39//5XJ' +
    '7nIRQKYWxsDMlkErOzsxBFEQAgSdJCOBx+COAlUVU1MjU19TUQCKSHTvWcsW27XKlUbgjBYH' +
    'DFDwAAgsHg5Xg8viTEYrG8H8BJKKWrAiFkzk9EFMU5AUDPM3GBSQqEkLifAiEkIXDOf/mJcM' +
    '5/CgCqfiIAqoLneUU/BcdxikK73d70E2GMvRcsy9pyHOe7H4Bt2+VGo/FJkGW51Wq1nvmBmK' +
    'b5NJfLtQUAMAzjlWVZhYsEbNvebrfbr4E/v3pZlpmu6+uMsaOLABzHqWmadk+WZfYXAYBsNl' +
    'tqNBprrutW/gdwXfdI07Q7p6/gM3f8zs7O1ZGRkQ1JkhbOC9i2vd1sNu9mMpmD0+NC94uZTO' +
    'bg8PDwZrPZfMAYO+h+3iuMsR/Hx8ePTdO81Q0AfVqikyiKEo7H40uU0tVAIHDSd8U553VCSJ' +
    'UxVnQcZ7Ner28N6rt+A5fqLKDwdn52AAAAAElFTkSuQmCC';

  /** @type {!cwc.ui.Turtle} */
  this.turtle = new cwc.ui.Turtle(helper, this.sprite);

  /** @type {!cwc.runner.profile.sphero.Monitor} */
  this.monitor = new cwc.runner.profile.sphero.Monitor(this.turtle);

  /** @type {Element} */
  this.node = null;

  /** @type {!Array} */
  this.listener = [];

  /** @type {!cwc.ui.Runner} */
  this.runner = new cwc.ui.Runner(helper);
};


/**
 * Decorates the runner object for the Sphero modification.
 * @export
 */
cwc.mode.sphero.Runner.prototype.decorate = function() {
  this.node = goog.dom.getElement(this.prefix + 'runner-chrome');
  this.helper.setInstance('runner', this.runner, true);
  this.helper.setInstance('turtle', this.turtle, true);

  this.runner.addCommand('__start__', this.handleStart_, this);

  // Normal Commands
  this.runner.addCommand('boost', this.command.boost, this);
  this.runner.addCommand('setRGB', this.command.setRGB, this);
  this.runner.addCommand('setBackLed', this.command.setBackLed, this);
  this.runner.addCommand('setMotionTimeout', this.command.setMotionTimeout,
    this);

  this.runner.addCommand('roll', this.command.roll, this);
  this.runner.addMonitor('roll', this.monitor.roll, this.monitor);

  this.runner.addCommand('stop', this.command.stop, this);

  // System Commands
  this.runner.addCommand('calibrate', this.command.calibrate, this);
  this.runner.addCommand('sleep', this.command.sleep, this);

  this.runner.setCleanUpFunction(this.handleCleanUp.bind(this));
  this.runner.decorate(this.node);

  // Sphero Events
  var apiEventHandler = this.api.getEventHandler();
  if (!apiEventHandler) {
    console.error('Sphero API event handler is not defined!');
  }
  this.runner.addEvent(apiEventHandler,
    cwc.protocol.sphero.Events.Type.COLLISION, 'collision');

  // Preview output
  var turtleNode = this.runner.getTurtleNode();
  this.turtle.decorate(turtleNode, this.prefix);

  // Unload event
  var layoutInstance = this.helper.getInstance('layout');
  if (layoutInstance) {
    var eventHandler = layoutInstance.getEventHandler();
    this.addEventListener(eventHandler, goog.events.EventType.UNLOAD,
        this.cleanUp, false, this);
  }

};


/**
 * @private
 */
cwc.mode.sphero.Runner.prototype.handleStart_ = function() {
  this.monitor.reset();
  this.turtle.action('speed', 5);
  this.turtle.reset();
};


/**
 * Handles the cleanup and make sure that the Sphero stops.
 */
cwc.mode.sphero.Runner.prototype.handleCleanUp = function() {
  this.api.cleanUp();
};


/**
 * Cleans up the event listener and any other modification.
 */
cwc.mode.sphero.Runner.prototype.cleanUp = function() {
  this.connection.cleanUp();
  this.helper.removeEventListeners(this.listener, this.name);
  this.listener = [];
};


/**
 * Adds an event listener for a specific event on a native event
 * target (such as a DOM element) or an object that has implemented
 * {@link goog.events.Listenable}.
 *
 * @param {EventTarget|goog.events.Listenable} src
 * @param {string} type
 * @param {function(?)} listener
 * @param {boolean=} opt_useCapture
 * @param {Object=} opt_listenerScope
 */
cwc.mode.sphero.Runner.prototype.addEventListener = function(src, type,
    listener, opt_useCapture, opt_listenerScope) {
  var eventListener = goog.events.listen(src, type, listener, opt_useCapture,
      opt_listenerScope);
  goog.array.insert(this.listener, eventListener);
};
