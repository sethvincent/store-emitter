var test = require('tape')
var createStore = require('../index')

test('action has a type', function (t) {
  function modifier (action, state) {
    t.ok(action.type)
    t.equal(action.type, 'example')
    return { example: true }
  }

  var store = createStore(modifier, {
    example: false
  })

  store({ type: 'example' })
  t.end()
})

test('missing action fails', function (t) {
  var store = createStore(function () {})

  try {
    store()
  } catch (err) {
    t.ok(err)
    t.equal(err.message, 'action parameter is required and must be a plain object')
  }

  t.end()
})

test('missing type fails', function (t) {
  var store = createStore(function () {})

  try {
    store({ pizza: 'fail' })
  } catch (err) {
    t.ok(err)
    t.equal(err.message, 'type property of action is required and must be a string')
  }

  t.end()
})
