/**
 * @fileoverview BUILD configuration for Coding with Chrome satic files.
 *
 * @license Copyright 2017 The Coding with Chrome Authors.
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
let closureBuilder = require('closure-builder');


/**
 * Static files
 */
closureBuilder.build({
  name: 'CwC core files',
  resources: [
    'static_files/icons/',
    'static_files/images/',
    'static_files/resources/',
  ],
  out: 'genfiles/core/',
});


/**
 * Markdown files
 */
closureBuilder.build({
  name: 'CwC Markdown files',
  markdown: [
    'LICENSE.md',
    'NOTICE.md',
    'CHANGELOG.md',
  ],
  replace: [
    ['nw-js', 'nwjs'],
    ['three-js', 'threejs'],
    ['tippy-js', 'tippyjs'],
  ],
  out: 'genfiles/core/',
});
