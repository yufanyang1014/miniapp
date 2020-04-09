// components/empty/empty.js
import computedBehavior from '../../miniprogram_npm/miniprogram-computed/index';

const classes = 'zebra-empty';

Component({
  behaviors: [computedBehavior],
  options: {
    addGlobalClass: true,
    multipleSlots: true,
  },
  /**
   * 组件的属性列表
   */
  properties: {
    type: {
      type: String,
      value: 'cart',
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    types: {
      // 购物车
      cart: {
        img: 'https://image.ibuycoinamc.com/uploads/shop/20190506/41acdbeef1970a43904bca9db66665b310389.png', // empty-cart@2x.png
        msg: '购物车竟然是空的～',
      },
      // 订单
      order: {
        img: 'https://image.ibuycoinamc.com/uploads/shop/20190506/d4426f93cb14990e03059d9dcf5c9e2858595.png', // empty-order@2x.png
        msg: '还没有生成订单哟～',
      },
      // 收藏
      collect: {
        img: 'https://image.ibuycoinamc.com/uploads/shop/20190506/059a0809a3ad97589e91c4d933173eef41299.png', // empty-collect@2x.png
        msg: '努力建设中，敬请期待～',
      },
      // 优惠券
      coupon: {
        img: 'https://image.ibuycoinamc.com/uploads/shop/20190506/059a0809a3ad97589e91c4d933173eef41299.png', // empty-collect@2x.png
        msg: '暂无优惠券可用哟～',
      },
      // asset
      asset: {
        img: 'https://image.ibuycoinamc.com/uploads/shop/20190506/7d3915ecd8592116f93d1b2a359e21b065105.png', // empty-asset@2x.png
        msg: '怎么还没资产消息吖～',
      },
      // fans
      fans: {
        img: 'https://image.ibuycoinamc.com/uploads/shop/20190506/d5a016f1ff6fedfa71c55d58eb18357064203.png', // empty-fans@2x.png
        msg: '团队管理都没人呢～',
      },
      // cash
      cash: {
        img: 'https://image.ibuycoinamc.com/uploads/shop/20190506/acd93a6784887c5d764822945ff62e5e65115.png', // empty-cash@2x.png
        msg: '还没有提现记录～',
      },
      // bank
      bank: {
        img: 'https://image.ibuycoinamc.com/uploads/shop/20190506/866de29295c35a42d37a08b94861cba234924.png', // empty-bank@2x.png
        msg: '还没有添加银卡～',
      },
      // 搜索
      zoom: {
        img: 'https://image.ibuycoinamc.com/uploads/shop/20190506/c828021499f1d1a07929ce8fd5f0912f27115.png', // empty-zoom@2x.png
        msg: '抱歉，未能找到您需要的商品',
      },

      // 没有信号
      signal: {
        img: 'https://image.ibuycoinamc.com/uploads/shop/20190506/3676cf633af2ca336f41d21889f7e9a514253.png', // empty-signal@2x.png
        msg: '网络跑哪去了～',
      },
      // 抽奖记录
      turntable: {
        img: 'https://image.ibuycoinamc.com/uploads/shop/20190506/138a68104a7f3e0806d06808db50b21c93051.png', // empty-turntable@2x.png
        msg: '赶紧去抽波奖吧～',
      },

      // 出错
      error: {
        img: 'https://image.ibuycoinamc.com/uploads/shop/20190506/f12a2ab0433c096036762495feef88ff87375.png', // empty-error@2x.png
        msg: '出毛病了你刷新一下～',
      },
    },
  },
  computed: {
    classes() {
      return `${classes}`;
    },
    img() {
      const { types, type } = this.data;
      return types[type].img;
    },
    msg() {
      const { types, type } = this.data;
      return types[type].msg;
    },
  },

  /**
   * 组件的方法列表
   */
  methods: {
    /**
   * 禁止用于下拉刷新
   */
    onPullDownRefresh() {
      wx.stopPullDownRefresh();
    },
  },
});
