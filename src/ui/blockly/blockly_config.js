/**
 * @fileoverview Blockly Config for Blockly Editor.
 *
 * @license Copyright 2018 The Coding with Chrome Authors.
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
goog.provide('cwc.ui.BlocklyConfig');


/**
 * @enum {string|objct<string>|array<string>}
 */
cwc.ui.BlocklyConfig = {
  'path': '../external/blockly/',
  'toolbox': '<xml><category></category></xml>',
  'trashcan': true,
  'grid': {
    'spacing': 20,
    'length': 3,
    'colour': '#ccc',
    'snap': true,
  },
  'zoom': {
    'controls': true,
    'wheel': true,
    'startScale': 1.0,
    'maxScale': 3,
    'minScale': 0.5,
    'scaleSpeed': 1.1,
  },
};
