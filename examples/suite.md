Your test suite
===============

Sub-suite 1
-----------

Descriptionary text can be placed here.

### Test title

Any text is treated as a test description. *bold*, _italic_, `inline code`, etc
can be used here without affecting the test.

Each code block below is added to the `test.values` map. Optionally, code blocks
may be prepended with a single `<!-- meta={"some":"json"} -->`. Such metadata
is parsed and stored in `test.meta` map.

<!-- meta={"some":"json"} -->
```js
const a = { b: 1 };
```

Text can be interleaved too.

```json
{
  "b": 1
}
```

```extra
CHECK-WARNING: ...
```

### Another test

Same as above.

## Test for top-level group

This test is treated as a child of `Your test suite`, not `Sub-suite 1`.

```html
<b>input</b>
```

```html
<b>output</b>
```
