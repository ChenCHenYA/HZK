import React, { Component } from 'react';
import { Flex, NavBar, List, InputItem, Button, Toast, WingBlank, WhiteSpace } from 'antd-mobile';
import axios from '../http.js'
import 'antd-mobile/dist/antd-mobile.css';
import './login.css'

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      uname: '',
      pwd: ''
    }
  }
  // val 当前表单的值
  changeInputValue = (key, val) => {
    // console.log(key, val)
    this.setState({
      // 将对象的 key 变成变量 [key]
      [key]: val
    })
  }
  // 登录发送请求
  handleLogin = async () => {
    const {
      data,
      meta: { status, msg }
    } = await axios.post(`/users/login`, {
      uname: this.state.uname,
      pwd: this.state.pwd
    })
    if (status === 200) {
      // console.log(data) // data中有token
      window.localStorage.setItem('token', data.token)
      // 进入首页->改标识->编程式导航
      // 如果组件是路由匹配到的，此时props会多一些东西 history
      const { history } = this.props
      history.push('/')
      // console.log(this.props)

    } else {
      // 提示
      Toast.fail(msg, 4);
    }
  }
  render() {
    return (

      <WingBlank size="sm">
        <Flex direction={'column'} justify={'center'}>
          <Flex.Item>
            <NavBar>登录</NavBar>
          </Flex.Item>
          <Flex.Item>
            <List>
              <InputItem
                value={this.state.uname}
                onChange={(val) => {
                  // 第一个参数是value 第二个参数是输入框输入的值
                  this.changeInputValue('uname', val)
                  // console.log('uname', val)
                }}>姓名</InputItem>
              <InputItem
                value={this.state.pwd}
                onChange={(val) => {
                  this.changeInputValue('pwd', val)
                }}>密码</InputItem>
            </List>
            <Button type="primary"
              onClick={this.handleLogin}>登录</Button>
          </Flex.Item>
        </Flex>
      </WingBlank>
    );
  }
}

export default Login;
