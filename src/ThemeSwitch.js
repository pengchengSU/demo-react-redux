import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from './react-redux'
class ThemeSwitch extends Component {
  // 类型检查
  static propTypes = {
    themeColor: PropTypes.string,
    onSwitchColor: PropTypes.func
  }
  // 按钮点击操作回调
  handleSwitchColor (color) {
    if (this.props.onSwitchColor) {
      // 调用转换后的 onSwitchColor
      this.props.onSwitchColor(color)
    }
  }
  render () {
    return (
      <div>
        <button
          style={{ color: this.props.themeColor }}
          onClick={this.handleSwitchColor.bind(this, 'red')}>Red</button>
        <button
          style={{ color: this.props.themeColor }}
          onClick={this.handleSwitchColor.bind(this, 'blue')}>Blue</button>
      </div>
    )
  }
}

// 将state转换后通过props注入被包裹的组件
const mapStateToProps = (state) => {
  return {
    themeColor: state.themeColor
  }
}

// 将props转换后通过props注入被包裹的组件
const mapDispatchToProps = (dispatch) => {
  return {
    onSwitchColor: (color) => {
      dispatch({ type: 'CHANGE_COLOR', themeColor: color })
    }
  }
}
ThemeSwitch = connect(mapStateToProps, mapDispatchToProps)(ThemeSwitch)
export default ThemeSwitch