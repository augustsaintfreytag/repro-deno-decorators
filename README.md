A reproduction project for Deno on the use of Stage 3 decorators in TypeScript for class properties with applied type mutations. The example code works when compiled using `tsc` and run with Node but not when run with Deno.

Expected output, working in Node:

```
Setting value for property value to undefined
Setting value for property value to 20
Setting value for property value to 10
{
  get: [Function: get],
  set: [Function: set],
  enumerable: true,
  configurable: true
}
```

Actual output, in Deno:

```
{ value: 10, writable: true, enumerable: true, configurable: true }
```