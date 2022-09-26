import React, { Component } from 'react'
import ReactDOM from 'react-dom/client';
import Header from './Header'
import Content from './Content'
// 头部引入 Provider
import { Provider } from './react-redux'

function createStore (reducer) {
  let state = null
  const listeners = []
  const subscribe = (listener) => listeners.push(listener)
  const getState = () => state
  const dispatch = (action) => {
    state = reducer(state, action)
    listeners.forEach((listener) => listener())
  }
  dispatch({}) // 初始化 state
  return { getState, dispatch, subscribe }
}

// 负责主题颜色的 reducer
const themeReducer = (state, action) => {
  if (!state) return {
    themeColor: 'red'	// 状态名themeColor，初始值red
  }
  switch (action.type) {
    case 'CHANGE_COLOR':		// 只允许一种操作：修改themeColor
      return { ...state, themeColor: action.themeColor }
    default:
      return state
  }
}

// 创建store
const store = createStore(themeReducer)


class Index extends Component {
  // 删除 Index 里面所有关于 context 的代码
  // static childContextTypes = {
  //   store: PropTypes.object
  // }
  // getChildContext () {
  //   return { store }
  // }
  render () {
    return (
      <div>
        <Header />
        <Content />
      </div>
    )
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <Index />
  </Provider>
);