import React, { Component } from 'react';
import { SearchBar, Carousel, Grid, NoticeBar, Card, Badge } from 'antd-mobile'
import axios from '../../http'

const badgeStyle = {
  marginLeft: 12,
  padding: '0 3px',
  backgroundColor: '#fff',
  borderRadius: 2,
  color: '#f19736',
  border: '1px solid #f19736',
  borderRadius: '5px'
}

const thumbStyle = {
  height: '95px',
  width: '125px'
}

class Main extends Component {
  constructor(props) {
    super(props)
    this.state = {
      swipedata: [],
      menuData: [],
      infoData: [],
      faqData: [],
      houseData: [],
      houseDataChanged: [],
      data: Array.from(new Array(8)).map((_val, i) => ({
        id: 1,
        icon: 'https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png',
        text: `name${i}`,
      })),
      imgHeight: 176,
    }
  }

  changeHouseData = (arr, ...newArr) => {
    let arrData = []
    for (let index = 0; index < newArr.length; index++) {
      const temp = arr.splice(0, newArr[index])
      arrData.push(temp)
    }
    return arrData
  }

  // 请求 main.js 中所有数据方法
  getMainData = async (path) => {
    const {
      data,
      meta: { status, msg }
    } = await axios.post(path)
    if (status === 200) {
      return data.list
    }
  }
  async componentDidMount() {
    // 输入框自动获取焦点
    // this.autoFocusInst.focus();
    const swipeData = this.getMainData('/homes/swipe')

    const menuData = this.getMainData('/homes/menu')

    const infoData = this.getMainData('homes/info')

    const faqData = this.getMainData('homes/faq')

    const houseData = this.getMainData('homes/house')


    // 统一处理所有promise对象
    const mainData = await Promise.all([swipeData, menuData, infoData, faqData, houseData])
    this.setState({
      swipedata: mainData[0],
      menuData: mainData[1],
      infoData: mainData[2],
      faqData: mainData[3],
      houseData: mainData[4]
    },
      () => {
        console.log(this.state.swipedata)
        let temp = this.state.menuData.map((item, i) => {
          return {
            id: item.id,
            icon: `http://127.0.0.1:8086/public/0${i + 1}.png`,
            text: item.menu_name,
          }
        })

        let houseDataChanged = this.changeHouseData(this.state.houseData, 2, 2, 3)
        console.log(houseDataChanged)

        this.setState({
          data: temp,
          houseDataChanged
        })
      })
  }
  render() {
    // 轮播图
    const carouselTemplate = this.state.swipedata.map((val, i) => (
      <a
        key={val}
        style={{
          display: 'inline-block',
          width: '100%',
          height: this.state.imgHeight
        }}
      >
        <img
          src={val.original}
          alt=""
          style={{ width: '100%', verticalAlign: 'top' }}
          onLoad={() => {
            // resize 用鼠标拖动浏览器大小时触发 重置大小
            window.dispatchEvent(new Event('resize'));
            this.setState({ imgHeight: 'auto' });
          }}
        />
      </a >
    ))

    // 主页资讯
    const infoTemplate = this.state.infoData.map((item, i) => {
      return (
        <NoticeBar
          marqueeProps={{ loop: true, style: { padding: '0 14px' } }}
          key={item.id} mode="link" action={<span>去看看</span>}>
          {item.info_title}
        </NoticeBar>
      )
    })

    // 房屋问答
    let faqTemplate = this.state.faqData.map((item, i) => {
      return (
        <Card key={i}>
          <Card.Header
            title={item.question_name}
            thumb={<Badge text="HOT" hot style={{ marginLeft: 12 }} />}
          />
          <Card.Body>
            <Badge text={item.question_tag}
              style={badgeStyle}
            />
            <Badge text={item.answer_content}
              style={badgeStyle}
            />
            <Badge text={item.atime}
              style={badgeStyle}
            />
            <Badge text={item.qnum}
              style={badgeStyle}
            />
          </Card.Body>
        </Card>
      )
    })
    // 添加标题
    faqTemplate = [<p key="faqtitle">好客问答</p>, ...faqTemplate]

    // 房屋信息
    const houseTemplate = this.state.houseDataChanged.map((item1, i) => {
      const houseItemTemplate = item1.map((item2, j) => {
        return (
          <Card key={j}>
            <Card.Header
              thumb="http://127.0.0.1:8086/public/home.png"
              thumbStyle={thumbStyle}
              extra={
                <div>
                  <Badge text={item2.home_name} style={badgeStyle} />
                  <Badge text={item2.home_desc} style={badgeStyle} />
                  <Badge text={item2.home_tags} style={badgeStyle} />
                  <Badge text={item2.home_price} style={badgeStyle} />
                </div>
              }
            />
          </Card>
        )
      })
      const titles = ["最新开盘", "二手精选", "组个家"]
      return <div key={i}>
        <p>{titles[i]}</p>
        {houseItemTemplate}
      </div>
    })

    return (
      <div>
        {/* 搜索框 */}
        <SearchBar placeholder="请输入搜索内容" ref={ref => this.autoFocusInst = ref} />

        {/* 轮播图 */}
        <Carousel autoplay={true} infinite>
          {carouselTemplate}
        </Carousel>

        {/* 菜单 */}
        <Grid data={this.state.data} activeStyle={false} />

        {/* 主页资讯 */}
        {infoTemplate}

        {/* 主页问答 */}
        {faqTemplate}

        {/* 房屋信息 */}
        {houseTemplate}

        <div style={{ height: '50px' }}></div>

      </div>
    );
  }
}

export default Main;



// 对响应做出处理 简化数据接收  获取轮播图数据原始代码
// const { data, meta: { status, msg } } = await axios.post('/homes/swipe')
// if (status === 200) {
//   this.setState({
//     swipedata: data.list
//   })
// }
