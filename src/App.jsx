import React from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import Loadable from 'react-loadable'

import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'

import counter from './components/Counter/reducers'
// import Counter from './components/Counter'

import counter2 from './components/Counter2/reducers'
// import Counter2 from './components/Counter2'

const AsyncCounter = Loadable({
  loader: () => import("./components/Counter"),
  loading: () => <p>Loading counter 1</p>
})
const AsyncCounter2 = Loadable({
  loader: () => import("./components/Counter2"),
  loading: () => <p>Loading counter 2</p>
})

const store = createStore(
  combineReducers({
    counter: counter,
    counter2: counter2
  }),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

export default class App extends React.Component {
  componentDidMount() {
    AsyncCounter.preload()
    AsyncCounter2.preload()
  }
  render () {
    return (
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
      </Provider>
    )
  }
}

