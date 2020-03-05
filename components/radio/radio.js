// components/radio/radio.js
import computedBehavior from '../../miniprogram_npm/miniprogram-computed/index';

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
    value: {
      type: String,
      value: '',
    },
    checked: {
      type: Boolean,
      value: false,
    },
    label: {
      type: String,
      value: '',
    },
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    handlerChange() {
      const { value } = this.data;
      // const instance = this.getRelationNodes('../radioGroup/radioGroup')[0] || this;
      // instance.triggerEvent('input', { value });
      // instance.triggerEvent('change', { value });
      this.triggerEvent('change', { value: Number(value) === 'NaN' ? value : Number(value) });
    },
  },
});
