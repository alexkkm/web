# JavaScript Tips

- [JavaScript Tips](#javascript-tips)
  * [Frontend (ES6 syntax)](#frontend-es6-syntax)
    + [Module import](#module-import)
    + [JSX](#jsx)
    + [React components](#react-components)
    + [Props](#props)
    + [React hooks](#react-hooks)
    + [useEffect](#useeffect)
  * [Backend (CommonJS syntax)](#backend-commonjs-syntax)
    + [Module import](#module-import-1)
  * [General JavaScript Tips](#general-javascript-tips)
    + [Equality](#equality)
    + [String interpolation](#string-interpolation)
    + [Functions](#functions)
    + [Variables and Objects](#variables-and-objects)
    + [Object destructuring](#object-destructuring)
    + [Spread](#spread)
    + [Array destructuring](#array-destructuring)
    + [Array methods](#array-methods)
    + [Async/await](#asyncawait)

## Frontend (ES6 syntax)

### Module import

To import a library:

```jsx
import name from 'library-name';
```

To import a file in our own project:

```jsx
import name from './myFile.jsx';
//Note that the path is relative to the current code file, and you have to
//put ./ in front
```

For files outside the current folder, go up a folder with `..`:

```jsx
import name from './../anotherFile.jsx';
// which can be simplified to
import name from '../anotherFile.jsx';
```

You can import anything: `.js`, `.jsx`, `.css`, `.png`, etc

### JSX

Files ending with `.jsx` are javascript files with react code, it allows you
to write html inside javascript:

```jsx
function returnParagraph() {
  return <p>A paragraph...</p>;
}
```

There are minor differences between real HTML and JSX:
HTML:

```html
<div class="my-class" style="display: block">Some text...</div>
```

JSX:

```jsx
return (
  <div className="my-class" style={{ display: 'block' }}>
    Some text...
  </div>
);
```

### React components

Our app is split into react components and sub-components, and each component
is a function that returns the html of that component

```jsx
function MyComponent() {
  return (
    <div>
      <h1>A title</h1>
      <p>A paragraph</p>
    </div>
  );
}
```

### Props

To pass arguments (called props) to children components:

```jsx
function ChildComponent(props) {
  return <p>{props.helloText}</p>;
}
function ParentComponent() {
  return <ChildComponent helloText="hello world" />;
}
```

The above can be written as:

```jsx
// Using object destructuring, see below
function ChildComponent({ helloText }) {
  return <p>{helloText}</p>;
}
function ParentComponent() {
  return <ChildComponent helloText="hello world" />;
}
```

### React hooks

React Hooks are common in function components, read how to use them in
https://reactjs.org/docs/hooks-overview.html

### useEffect

One quick tip is:
React re-renders your component each time something changes
in the component:

```jsx
import { Button } from 'react-bootstrap';
import { useState } from 'react';
function MyComponentWithState() {
  const [counter, setCounter] = useState(0);
  console.log('Render!');
  return (
    <div>
      <p>{counter}</p>
      <Button onClick={() => setCounter(counter + 1)}>Add 1</Button>
    </div>
  );
}
// You will see a lot of console.log when you click the button even though the
// whole page didn't reload
```

To only execute code when the component is first loaded, use useEffect:

```jsx
import { Button } from 'react-bootstrap';
import { useEffect, useState } from 'react';
function MyComponentWithState2() {
  const [counter, setCounter] = useState(0);
  useEffect(() => {
    console.log('only printed once');
  }, []); // empty array is necessary here!
  return (
    <div>
      <p>{counter}</p>
      <Button onClick={() => setCounter(counter + 1)}>Add 1</Button>
    </div>
  );
}
```

To execute code when a value changes, include that value in useEffect:

```jsx
import { Button } from 'react-bootstrap';
import { useEffect, useState } from 'react';
function MyComponentWithState3() {
  const [counter, setCounter] = useState(0);
  useEffect(() => {
    console.log('counter changed');
  }, [counter]); // including counter in the array causes this
  // function to be run every time counter changes
  return (
    <div>
      <p>{counter}</p>
      <Button onClick={() => setCounter(counter + 1)}>Add 1</Button>
    </div>
  );
}
```

## Backend (CommonJS syntax)

### Module import

To import a library

```js
const name = require('library-name');
```

To import our own file

```js
const name = require('./myFile.js');
// the way to write a path is the same as frontend, we just use require here
// instead of import
```

## General JavaScript Tips

### Equality

To check if two things are equal:

```js
let a = '1';
let b = 1;
console.log(a == b); // true // NEVER use this, VERY confusing
console.log(a === b); // false // Always use this

console.log(a != b); // false // NEVER use this, VERY confusing
console.log(a !== b); // true // Always use this
```

### String interpolation

```js
let a = 10;
let b = 20;
console.log('a = ' + a + ', b = ' + b);
```

Can be written as:

```js
let a = 10;
let b = 20;
console.log(`a = ${a}, b = ${b}`);
```

### Functions

To define a function:

```js
function functionName(parameter1, parameter2) {
  // do sth
  return 'some value';
}
```

You can also define arrow functions

```js
functionName = (parameter1, parameter2) => {
  return 'some value';
};
```

And if an arrow function has 1 line only, you can omit the `{}`:

```js
functionName = (parameter1, parameter2) => 'some value';
// 'some value' is returned directly above
```

If an arrow function has 1 parameter only, you can omit the `()`:

```js
functionName = (parameter) => console.log(parameter);
```

Quick function tutorial:
https://www.youtube.com/watch?v=gigtS_5KOqo (12m30s)

### Variables and Objects

There are 3 ways to define a variable

```js
var a = 0; // NEVER USE THIS
let b = 0; // ok to use
const c = 0; // value can never be changed
```

To define an empty object

```js
let a = {};
```

To define an object with content

```js
let short = null;
let b = {
  propertyA: 'sth',
  propertyB: false,
  short: short,
};
```

You can add properties to object by just assigning them

```js
let obj = {};
obj.propA = 'hello';
obj['propB'] = 'world'; // Same as obj.propB = 'world';
console.log(obj); // { propA: 'hello', propB: 'world' }
```

In the above, we are a property `short` on the object, and its value is stored
in the variable that is also called `short`, so we can use a short form here:

```js
let short = null;
let b = {
  propertyA: 'sth',
  propertyB: false,
  short, // short for short: short
};
```

### Object destructuring

If we want to use some variables to store the value of some properties in an
object:

```js
let obj = { propA: 10, propB: 20, propC: 30, propD: 40 };
let propA = obj.propA;
let propB = obj.propB;
// propA = 10
// propB = 20
```

We can use object destructuring:
https://www.youtube.com/watch?v=UgEaJBz3bjY (3m30s)

```js
let obj = { propA: 10, propB: 20, propC: 30, propD: 40 };
let { propA, propB } = obj;
// propA = 10
// propB = 20
```

Object destructuring can be used when importing libraries:

```js
// frontend
import { Button, Form } from 'react-bootstrap';
// Importing react-bootstrap returns an object with many properties, we just
// want Button and Form here

// backend
const {
  requireAccessToken,
  requireAdminAccess,
} = require('./helpers/requireAuth');
// Only import requireAccessToken and requireAdminAccess from requireAuth.js
```

### Spread

To merge two objects, use the spread syntax

```js
let a = { p1: 123, p2: 456 };
let b = { p3: 234, p4: 567 };
let c = { ...a, ...b }; // { p1: 123, p2: 456, p3: 234, p4: 567 }
```

Combining object destructuring and the spread operator:

```js
let obj = { propA: 10, propB: 20, propC: 30, propD: 40 };
let { propA, propB, ...others } = obj;
// propA = 10
// propB = 20
// others = { propC: 30, propD: 40 }
```

### Array destructuring

Same thing for arrays

```js
let a = []; // empty array
let b = [1, 2, 3];
let c = [4, 5, 6];
let d = [...b, ...c]; // [1, 2, 3, 4, 5, 6]
```

```js
let arr = ['hello', 'world', 'js', 'jsx'];
let [a, b, ...c] = arr; // array destructuring depends on index (a gets the first element, b gets the second)
// a = 'hello'
// b = 'world'
// c = ['js', 'jsx']
```

### Array methods

There are useful functions that help us with arrays, e.g. `reduce`, `map`, `sort`, `forEach`, `includes`, `some`, `find`, `findIndex`, ...

- `reduce`: https://www.youtube.com/watch?v=tVCYa_bnITg (1m30s)
- `map`: https://www.youtube.com/watch?v=DC471a9qrU4 (1m30s)

### Async/await

Async/await is very common in our code. Learn more here:

- https://www.youtube.com/watch?v=RvYYCGs45L4 (1m30s)
- https://www.youtube.com/watch?v=vn3tm0quoqE (12m)
