# mdgator
[![Build Status](https://secure.travis-ci.org/indutny/mdgator.svg)](http://travis-ci.org/indutny/mdgator)

Turn a markdown document into a test suite.

## Usage

```ts
import * as fs from 'fs';
import { MDGator } from 'mdgator';

const md = new MDGator();

const parsed = md.parse(fs.readFileSync('./examples/suite.md').toString());
console.log(parsed);
```

```js
[ Group {
    name: 'Your test suite',
    line: 0,
    children:
     [ Group {
         name: 'Sub-suite 1',
         line: 3,
         children: [],
         tests:
          [ Test {
              name: 'Test title',
              line: 8,
              values:
               Map {
                 'js' => [ 'const a = { b: 1 };\n' ],
                 'json' => [ '{\n  "b": 1\n}\n' ],
                 'extra' => [ 'CHECK-WARNING: ...\n' ] },
              meta: Map { 'js' => [ { some: 'json' } ] } } ] } ],
    tests:
     [ Test {
         name: 'Test for top-level group',
         line: 38,
         values: Map { 'html' => [ '<b>input</b>\n', '<b>output</b>\n' ] },
         meta: Map {} } ] } ]
```

#### LICENSE

This software is licensed under the MIT License.

Copyright Fedor Indutny, 2018.

Permission is hereby granted, free of charge, to any person obtaining a
copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to permit
persons to whom the Software is furnished to do so, subject to the
following conditions:

The above copyright notice and this permission notice shall be included
in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
USE OR OTHER DEALINGS IN THE SOFTWARE.
