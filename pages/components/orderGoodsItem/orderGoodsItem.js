// pages/components/orderItem/OrderItem.js
import regeneratorRuntime from '../../../miniprogram_npm/regenerator-runtime/index';
import computedBehavior from '../../../miniprogram_npm/miniprogram-computed/index';
import { REFUND_STATUS } from '../../../constant/index';

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
    sku: {
      type: String,
      value: '',
    },
    title: {
      type: String,
      value: '',
    },
    img: {
      type: String,
      value: '',
    },
    level: {
      type: Number,
      value: 1,
    },
    isGift: {
      type: Number,
      value: null,
    },
    specJson: {
      type: Array,
      value: [],
    },
    price: {
      type: String,
      value: '',
    },
    hdPrice: {
      type: String,
      value: '',
    },
    number: {
      type: Number,
      value: 1,
    },
    refundStatus: {
      type: Number,
      value: 0,
    },
    isRefundable: {
      type: Number,
      value: 0,
    },
    status: {
      type: Number,
      value: 0,
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    REFUND_STATUS,
  },
  computed: {
    specJsonStr() {
      return this.data.specJson.map(spec => spec.val_v).join(' ');
    },
  },
  observers: {},

  /**
   * 组件的方法列表
   */
  methods: {
    handlerRefund() {
      this.triggerEvent('refund');
    },
  },
});
