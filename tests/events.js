var test = require('tape')
var createStore = require('../index')

test('wildcard to listen to all events', function (t) {
  var store = createStore(function (action, state) {
    return state
  })

  var i = 0
  store.on('*', function (action, state, oldState) {
    t.ok(action)
    i++
  })

  store({ type: 'example' })
  store({ type: 'pizza' })
  store({ type: 'poop' })

  t.equal(i, 3)
  t.end()
})

test('listen to namespaced events', function (t) {
  var store = createStore(function (action, state) {
    return state
  })

  var i = 0
  store.on('example', function (action, state, oldState) {
    t.ok(action)
    i++
  })

  store({ type: 'example:cool' })
  store({ type: 'example:alright' })
  store({ type: 'poop' })

  t.equal(i, 2)
  t.end()
})
