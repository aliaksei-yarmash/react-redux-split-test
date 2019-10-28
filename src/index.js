import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'

import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import asyncComponent from './components/AsyncComponents'

import counter from './components/Counter/reducers'
// import Counter from './components/Counter'

import counter2 from './components/Counter2/reducers'
// import Counter2 from './components/Counter2'

const AsyncCounter = asyncComponent(() => import("./components/Counter"))
const AsyncCounter2 = asyncComponent(() => import("./components/Counter2"))

const store = createStore(
  combineReducers({
    counter: counter,
    counter2: counter2
  }),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

render(
  <Provider store={store}>
    <Router>
      <section>
        <Link to="/counter">Counter</Link>
        <Link to="/second-counter">Counter 2</Link>
        <Switch>
          <Route path="/counter" component={AsyncCounter}/>
          <Route path="/second-counter" component={AsyncCounter2}/>
        </Switch>
      </section>
    </Router>
  </Provider>,
  document.querySelector('#root')
)
