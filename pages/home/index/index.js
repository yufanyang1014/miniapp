// pages/home/index/index.js
import computedBehavior from '../../../miniprogram_npm/miniprogram-computed/index';

Component({
  behaviors: [computedBehavior],
  options: {
    addGlobalClass: true,
    multipleSlots: true,
  },
  computed: {

  },
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    swiper: {
      indicatorDots: true,
      vertical: false,
      autoplay: true,
      interval: 2000,
      duration: 500,
      color: 'orangered',
    },
    activeIndex: 0,
    inputVal: '',
    background: ['../../../assets/images/test1.jpeg', '../../../assets/images/test2.jpeg'],
    dataMockBlock: [
      {
        title: '湖东',
      },
      {
        title: '湖西',
      },
      {
        title: '独墅湖高教区',
      },
      {
        title: '高贸区',
      },
      {
        title: '阳澄湖度假区',
      },
      {
        title: '其他区域',
      },
      {
        title: '联合办公',
      },
      {
        title: '产业园',
      }
    ],
    dataMockList: [
      {
        image: '',
        title: '【湖西】国际大厦',
        name: '武侯区楼宇办',
        time: '2020-03-04',
      },
      {
        image: '',
        title: '【华北区】浙江省宁波市鄞州区千户家园3区',
        name: '浙北商务局',
        time: '2020-03-16',
      },
      {
        image: '',
        title: '【华西区】浙江省宁波市鄞州区千户家园3区Life慢生活区享受美好的人生遛狗带娃必备的选择',
        name: '浙西商务局',
        time: '2020-03-26',
      },
    ]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handlerChange(e) {
      const { idx } = e.currentTarget.dataset;
      this.setData({ activeIndex: idx });
    },
    handlerJumpApp() {
      wx.navigateToMiniProgram({
        appId: 'wx9e0b65bedfdb26e7',
        path: '',
      })
    },
    handlerInput(e) {
      const { value } = e.detail;
      this.setData({ inputVal: value });
    },
    clearInput(e) {
      this.setData({ inputVal: '' });
    }
  },
})
