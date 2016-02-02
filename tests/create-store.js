var test = require('tape')
var createStore = require('../index')

test('create a store', function (t) {
  function modifier (action, state) {
    if (action.type === 'example') {
      return { example: true }
    }
  }

  var store = createStore(modifier, {
    example: false
  })

  store.on('*', function (action, state, previous) {
    t.ok(state.example)
    t.notOk(previous.example)
  })

  store.on('example', function (action, state, previous) {
    t.ok(state.example)
    t.notOk(previous.example)
  })

  store({ type: 'example' })
  t.end()
})

test('missing missing modifier function fails', function (t) {
  try {
    createStore()
  } catch (err) {
    t.ok(err)
    t.equal(err.message, 'first argument must be a function')
  }

  t.end()
})

test('initial state', function (t) {
  var store = createStore(function () {}, { example: true })
  var state = store.initialState()
  t.ok(state)
  t.ok(state.example)
  t.end()
})

test('get state', function (t) {
  function modifier (action, state) {
    if (action.type === 'example') {
      return { example: action.example }
    }
  }

  var store = createStore(modifier, { example: true })

  store.on('example', function () {
    var state = store.getState()
    t.ok(state)
    t.equal(state.example, false)
  })

  store({ type: 'example', example: false })
  t.end()
})
