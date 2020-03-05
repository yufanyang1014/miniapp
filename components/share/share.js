// components/share/share.js
import computedBehavior from '../../miniprogram_npm/miniprogram-computed/index';

const classes = 'zebra-share';

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
    visible: {
      type: Boolean,
      value: false,
    },
    customClass: {
      type: String,
      value: '',
    },
    safeAreaInsetBottom: {
      type: Boolean,
      value: true,
    },
    link: {
      type: String,
      value: '',
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    list: [
      {
        icon: 'iconfont-wechat', color: '#00C800', title: '微信', openType: 'share',
      },
      {
        icon: 'iconfont-fuzhi', color: '#FBB223', title: '复制链接', openType: 'copy',
      },
    ],
  },
  computed: {
    classes() {
      return `${classes} ${this.data.customClass}`;
    },
  },
  /**
   * 组件的方法列表
   */
  methods: {
    handlerCancel(e) {
      this.triggerEvent('cancel', e.detail);
    },
    handlerShare(e) {
      const { openType } = e.currentTarget.dataset;
      if (openType === 'copy') {
        wx.setClipboardData({ data: this.data.link });
      }
    },
  },
});
