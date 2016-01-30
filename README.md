# store-emitter

[![npm](https://img.shields.io/npm/v/store-emitter.svg?style=flat-square)](https://npmjs.org/store-emitter)

A simple redux-inspired state management library that provides more flexible options for listening to changes.

## Example

```js
function modifier (action, state) {
  if (action.type === 'example') {
    return { example: true }
  }
}

var store = createStore(modifier, {
  example: false
})

store.on('*', function (action, state, oldState) {
  console.log()
})

store.on('example', function (action, state, oldState) {
  t.ok(state.example)
  t.notOk(previous.example)
})

store({ type: 'example' })
```

## API

### createStoreEmitter

Create the store

**Parameters**

-   `modifier` **function** 
-   `initialState` **[object]** 

**Examples**

```javascript
var createStore = require('store-emitter')
var store = createStore(function (action, state) {
  if (action.type === 'change_something') {
    return { something: 'changed' }
  }
})
```

### store

Send an action to the store. Takes a single object parameter. Object must include a `type` property with a string value, and can contain any other properties.

**Parameters**

-   `action` **object** 
    -   `action.type` **string** 

**Examples**

```javascript
store({
  type: 'example'
  exampleValue: 'anything'
})
```

### store.initialState

Get the initial state of the store

**Examples**

```javascript
var state = store.initialState()
```

### store.on

Listen to changes to the store

**Parameters**

-   `event` **string** – can be `data` or any action type
-   `callback`  

**Examples**

```javascript
store.on('*', function (action, state, oldState) {

})
```

## See also
- [virtual-app](https://github.com/sethvincent/virtual-app)
- [namespace-emitter](https://github.com/sethvincent/namespace-emitter)

## LICENSE

[MIT](LICENSE.md)
