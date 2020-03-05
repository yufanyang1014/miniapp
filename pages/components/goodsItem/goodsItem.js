// pages/components/goodsItem/goodsItem.js
import regeneratorRuntime from '../../../miniprogram_npm/regenerator-runtime/index';
import computedBehavior from '../../../miniprogram_npm/miniprogram-computed/index';
import { covertRoute } from '../../../utils/index';

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
    customClass: {
      type: String,
      value: '',
    },
    imgClass: {
      type: String,
      value: '',
    },
    sku: {
      type: String,
      value: '',
    },
    level: {
      type: Number,
      value: 1,
    },
    img: {
      type: String,
      value: '',
    },
    title: {
      type: String,
      value: '',
    },
    price: {
      type: Number,
      value: 0,
    },
    vipPrice: {
      type: Number,
      value: 0,
    },
    agentPrice: {
      type: Number,
      value: 0,
    },
    originPrice: {
      type: Number,
      value: 0,
    },
    promote: {
      type: Number,
      value: 0,
    },
    storage: {
      type: Number,
      value: 1,
    },
    hdHandsel: {
      type: String,
      value: '',
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

  },
  computed: {
    row() {
      const {
        customClass, imgClass, agentPrice, vipPrice, price, promote, hdHandsel,
      } = this.data;

      const classes = `zebra-goods-item ${customClass}`;
      const imgClasses = `item-image ${imgClass}`;
      const agentPriceStr = (Number(agentPrice)).toFixed(2);
      const priceStr = (Number(vipPrice)).toFixed(2);
      const originPriceStr = (Number(price)).toFixed(2);
      const promoteStr = (Number(promote));
      const hdHandselStr = (Number(hdHandsel));

      return {
        classes, imgClasses, agentPriceStr, priceStr, originPriceStr, promoteStr, hdHandselStr,
      };
    },
  },
  observers: {

  },
  /**
   * 组件的方法列表
   */
  methods: {
    handlerNavigation() {
      const { link, sku } = this.data;
      if (link) {
        wx.navigateTo({ url: covertRoute(link) });
      } else {
        wx.navigateTo({ url: `/pages/home/detail/detail?sku=${sku}` });
      }
    },
  },
});
