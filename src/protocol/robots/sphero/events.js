/**
 * @fileoverview Sphero Event definitions.
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
goog.provide('cwc.protocol.sphero.Events');



/**
 * Custom events.
 * @enum {string}
 */
cwc.protocol.sphero.Events.Type = {
  CHANGED_LOCATION: 'changed_devices',
  CHANGED_VELOCITY: 'changed_values',
  CHANGED_SPEED: 'changed_speed',
  COLLISION: 'collision'
};


/**
 * @param {Object} data
 * @final
 */
cwc.protocol.sphero.Events.LocationData = function(data) {
  return new cwc.protocol.sphero.Events.Data_(
      cwc.protocol.sphero.Events.Type.CHANGED_LOCATION, data);
};


/**
 * @param {Object} data
 * @final
 */
cwc.protocol.sphero.Events.VelocityData = function(data) {
  return new cwc.protocol.sphero.Events.Data_(
      cwc.protocol.sphero.Events.Type.CHANGED_VELOCITY, data);
};


/**
 * @param {Object} data
 * @final
 */
cwc.protocol.sphero.Events.SpeedValue = function(data) {
  return new cwc.protocol.sphero.Events.Data_(
      cwc.protocol.sphero.Events.Type.CHANGED_SPEED, data);
};


/**
 * @param {Object} data
 * @final
 */
cwc.protocol.sphero.Events.Collision = function(data) {
  return new cwc.protocol.sphero.Events.Data_(
      cwc.protocol.sphero.Events.Type.COLLISION, data);
};


/**
 * @param {!cwc.protocol.sphero.Events.Type} type
 * @param {Object=} opt_data
 * @constructor
 * @final
 * @private
 */
cwc.protocol.sphero.Events.Data_ = function(type, opt_data) {
  /** @type {!cwc.protocol.sphero.Events.Type} */
  this.type = type;

  /** @type {!Object} */
  this.data = opt_data || {};
};
