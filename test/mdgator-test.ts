import * as assert from 'assert';
import * as fs from 'fs';
import * as path from 'path';

import { MDGator } from '../src/mdgator';

const INPUTS_DIR = path.join(__dirname, 'inputs');

function input(name: string): string {
  return fs.readFileSync(path.join(INPUTS_DIR, name + '.md')).toString();
}

describe('mdgator', () => {
  let md: MDGator;

  beforeEach(() => {
    md = new MDGator();
  });

  it('should parse markdown', () => {
    const result = md.parse(input('simple'));

    const json = JSON.parse(JSON.stringify(result));

    assert.deepEqual(json, [ {
      children: [ {
        children: [],
        line: 2,
        name: 'Subgroup',
        tests: [ {
          line: 4,
          meta: {},
          name: 'Test 1',
          values: { input: [ 'hello\n' ], output: [ 'world\n' ] },
        }, {
          line: 14,
          meta: {},
          name: 'Test 2',
          values: { input: [ 'ohai\n' ], output: [ 'everyone\n' ] },
        } ],
      }, {
        children: [],
        line: 24,
        name: 'Subgroup 2',
        tests: [ {
          line: 26,
          meta: {},
          name: 'Test 3',
          values: { input: [ 'cool\n' ], output: [ 'story\n' ] },
        } ],
      } ],
      line: 0,
      name: 'Test group',
      tests:
      [ {
        line: 36,
        meta: {
          output: [ { mode: 'strict', type: 'request' } ],
        },
        name: 'Shallow Test 4',
        values: { input: [ 'so\n' ], output: [ 'shallow\n' ] },
      } ],
    } ]);
  });
});
