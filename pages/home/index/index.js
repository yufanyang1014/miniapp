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
    activeIndex: 0,
    dataMockBlock: [
      {
        title: '土地',
      },
      {
        title: '园区',
      },
      {
        title: '写字楼',
      },
      {
        title: '商业体',
      },
      {
        title: '品牌',
      },
      {
        title: '资本',
      },
      {
        title: '运营',
      },
      {
        title: '其他合作单位',
      }
    ],
    dataMockList: [
      {
        image: '',
        title: '【华南区】熊猫小镇',
        name: '浙南商务局',
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
      if (idx === 7) {
        wx.navigateToMiniProgram({
          appId: 'wx9e0b65bedfdb26e7',
          path: '',
        })
      }
    },
  },
})
