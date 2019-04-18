import React, { Component } from 'react';
import { TabBar } from 'antd-mobile'

import Main from './main/main'
import News from './news/news'
import Chat from './chat/chat'
import Mine from './mine/mine'
import 'antd-mobile/dist/antd-mobile.css';
import '../home.css'

// 相当于后台返回的数据 渲染模板
import { tabBarTemplateDate } from './tableBarData.json'

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedTab: 'blueTab',
      hidden: false,
    }
  }
  renderContent(selectKey) {
    // 判断变化值
    switch (selectKey) {
      case 'main':
        return <Main />
        break
      case 'news':
        return <News />
        break
      case 'chat':
        return <Chat />
        break
      case 'mine':
        return <Mine />
        break
    }
  }

  render() {
    const tabBarTemplate = tabBarTemplateDate.map((item, i) => {
      return <TabBar.Item
        title={item.title}
        key={item.key}
        icon={<div style={{
          width: '22px',
          height: '22px',
          background: item.icon_bg_url
        }}
        />
        }
        selectedIcon={<div style={{
          width: '22px',
          height: '22px',
          background: item.selectedIcon_bg_url
        }}
        />
        }
        selected={this.state.selectedTab === item.selectedPath}
        onPress={() => {
          this.setState({
            selectedTab: `${item.selectedPath}`,
          });
        }}
      >
        {this.renderContent(item.key)}
      </TabBar.Item>
    })
    return (
      <div>
        <TabBar
          unselectedTintColor="#949494"
          tintColor="#33A3F4"
          barTintColor="white"
          hidden={this.state.hidden}
          tabBarPosition="bottom"
        >
          {tabBarTemplate}
        </TabBar>
      </div>
    )
  }
}

export default Home;
