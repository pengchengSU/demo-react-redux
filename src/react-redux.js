import React, { Component } from 'react'
import PropTypes from 'prop-types'
export const connect = (mapStateToProps, mapDispatchToProps) => (WrappedComponent) => {
  class Connect extends Component {
    // 子组件获取context中数据时用于校验类型
    static contextTypes = {
      store: PropTypes.object
    }

    constructor () {
      super()
      this.state = {
        // 存放转换后的state、转换后的dispatch、组件本身接收的props
        allProps: {}
      }
    }

    componentWillMount () {
      // 获取context中的store
      const { store } = this.context
      this._updateProps()
      // 注册状态数据变化时的回调
      store.subscribe(() => this._updateProps())
    }

    _updateProps () {
      const { store } = this.context
      // 转换state
      let stateProps = mapStateToProps
        ? mapStateToProps(store.getState(), this.props)
        : {} // 防止 mapStateToProps 没有传入
      // 转换dispatch
      let dispatchProps = mapDispatchToProps
        ? mapDispatchToProps(store.dispatch, this.props)
        : {} // 防止 mapDispatchToProps 没有传入

      // 存放转换后的state、转换后的dispatch、组件本身接收的props
      this.setState({
        allProps: {
          ...stateProps,
          ...dispatchProps,
          ...this.props
        }
      })
    }
    render () {
      // 将转换后的state、转换后的dispatch、组件本身接收的props 作为props传给子组件
      return <WrappedComponent {...this.state.allProps} />
    }
  }
  return Connect
}


export class Provider extends Component {
  static propTypes = {
    store: PropTypes.object,
    children: PropTypes.any
  }
  static childContextTypes = {
    store: PropTypes.object
  }
  getChildContext () {
    return {
      store: this.props.store
    }
  }
  render () {
    return (
      <div>{this.props.children}</div>
    )
  }
}