// components/button/button.js
import computedBehavior from '../../miniprogram_npm/miniprogram-computed/index';

const prefixClass = 'zebra-btn';

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
    flex: {
      type: Boolean,
      value: false,
    },
    customClass: {
      type: String,
      value: '',
    },
    plain: {
      type: Boolean,
    },
    openType: {
      type: String,
      value: '',
    },
    type: {
      type: String,
      value: 'primary',
    },
    size: {
      type: String,
      value: 'middle',
    },
    horn: {
      type: String,
      value: 'normal',
      // value: 'square',
      // value: 'radius',
    },
    shadow: {
      type: Boolean,
      value: false,
    },
    disabled: {
      type: Boolean,
      value: false,
    },
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  computed: {
    classes() {
      const ghost = this.data.plain ? '-ghost' : '';
      const horn = this.data.horn === 'normal' ? '' : `${prefixClass}-${this.data.size}-${this.data.horn}`;
      const shadow = this.data.shadow ? 'shadow' : '';
      const disabld = this.data.disabled ? 'disabled' : '';
      return `${prefixClass}${ghost} ${prefixClass}-${this.data.size} ${horn} ${prefixClass}${ghost}-${this.data.type} ${disabld} ${shadow} ${this.data.customClass}`;
    },
    styles() {
      const flexValue = this.data.flex ? '1' : 'none';
      return [`flex: ${flexValue}`].join(';');
    },
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handlerClick(e) {
      this.triggerEvent('click', e.detail);
    },
    //
    handlerGetuserinfo(e) {
      this.triggerEvent('getuserinfo', e.detail);
    },
  },
});
