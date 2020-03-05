// components/tab/tab.js
import regeneratorRuntime from '../../miniprogram_npm/regenerator-runtime/index';
import computedBehavior from '../../miniprogram_npm/miniprogram-computed/index';

const classes = 'zebra-tab';
Component({
  behaviors: [computedBehavior],
  options: {
    addGlobalClass: true,
    multipleSlots: true,
  },
  relations: {
    '../tabs/tabs': { // './path_to_b'是对方组件的相对路径
      type: 'ancestor', //  type可选择两组：parent和child、ancestor和descendant
    },
  },
  /**
   * 组件的属性列表
   */
  properties: {
    disabled: {
      type: Boolean,
      value: false,
    },
    title: {
      type: String,
      value: '',
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    active: 0,
    index: 0,
    tabClass: '',
    tabActiveClass: '',
  },
  computed: {
    classes() {
      const {
        active, index, tabClass, tabActiveClass,
      } = this.data;
      const activeClass = active === index ? ` zebra-tab-active ${tabActiveClass}` : '';
      return `${classes} ${tabClass}${activeClass}`;
    },
  },

  /**
   * 组件的方法列表
   */
  methods: {
    getRects(selector, all) {
      const query = wx.createSelectorQuery().in(this)[all ? 'selectAll' : 'select'](selector);
      return new Promise((reslove) => { query.boundingClientRect(reslove).exec(); });
    },
    handlerTap(e) {
      const { disabled } = this.data;
      if (disabled) { return; }
      const parent = this.getRelationNodes('../tabs/tabs')[0];
      parent.handlerActive(e, this);
    },
  },

  lifetimes: {
    ready() {

    },
  },
});
