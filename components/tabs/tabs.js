// components/tabs/tabs.js
import regeneratorRuntime from '../../miniprogram_npm/regenerator-runtime/index';
import computedBehavior from '../../miniprogram_npm/miniprogram-computed/index';

Component({
  behaviors: [computedBehavior],
  options: {
    addGlobalClass: true,
    multipleSlots: true,
  },
  relations: {
    '../tab/tab': { // './path_to_b'是对方组件的相对路径
      type: 'descendant', //  type可选择两组：parent和child、ancestor和descendant
      linked(child) {
        if (!this.child) {
          this.child = [];
        }
        const index = this.child.length;
        child.setData({ index });
        this.child.push(child);
        this.updateTabs(this.data.tabs.concat(child.data));
      }, // 钩子函数，在组件linked时候被调用 target是组件的实例，
      linkChanged(child) {
        const index = this.child.indexOf(child);
        const { tabs } = this.data;
        // child.setData({ index });
        // tabs.splice(index, 1);
        // this.child.splice(index, 1);
        // this.updateTabs(tabs);
        this.child[index] = child;
        tabs[index] = child.data;
        this.updateTabs(tabs);
      },
    },
  },
  child: [],
  /**
   * 组件的属性列表
   */
  properties: {
    customClass: {
      type: String,
      value: '',
    },
    navClass: {
      type: String,
      value: '',
    },
    tabClass: {
      type: String,
      value: '',
    },
    tabActiveClass: {
      type: String,
      value: '',
    },
    navLineClass: {
      type: String,
      value: '',
    },
    active: {
      type: Number,
      value: 0,
    },
    zIndex: {
      type: Number,
      value: 9,
    },
    swipeThreshold: {
      type: Number,
      value: 4,
    },
    stickyClass: {
      type: String,
      value: '',
    },
    offsetTop: {
      type: Number,
      value: 0,
    },
    scrollTop: {
      type: Number,
      value: 0,
    },
    lineWidth: {
      type: Number,
      value: -1,
    },
    lineHeight: {
      type: Number,
      value: 0,
    },
    color: {
      type: String,
      value: '#f00',
    },
    duration: {
      type: Number,
      value: 0.3,
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    lineStyle: '',
    tabs: [],
    scrollLeft: 0,
  },
  compunted: {
  },
  observers: {
    active() {
      if (this.child) {
        this.setActiveTab();
      }
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
    async scrollIntoView() {
      const childTabs = this.getRelationNodes('../tab/tab');
      const tabRectsPromise = Promise.all(childTabs.map(item => item.getRects('.zebra-tab')));
      const navRectPromise = this.getRects('.zebra-tabs-nav');
      const [tabRects, navRect] = await Promise.all([tabRectsPromise, navRectPromise]);
      const navWidth = navRect.width;
      const tabRect = tabRects[this.data.active];
      const offsetLeft = tabRects.slice(0, this.data.active).reduce((prev, curr) => prev + curr.width, 0);
      const tabWidth = tabRect.width;
      this.setData({
        scrollLeft: offsetLeft - (navWidth - tabWidth) / 2,
      });
    },
    async setLine(skipTransition) {
      const {
        color, duration, lineWidth, lineHeight,
      } = this.data;
      const { active, tabClass, tabActiveClass } = this.data;
      const childTabs = this.getRelationNodes('../tab/tab');
      childTabs.forEach((child, index) => {
        child.setData({
          active, index, tabClass, tabActiveClass,
        });
      });
      const tabRects = await Promise.all(childTabs.map(item => item.getRects('.zebra-tab')));
      const rect = tabRects[active];
      const width = lineWidth !== -1 ? lineWidth : rect.width;
      const height = lineHeight !== -1 ? `height: ${lineHeight}px;` : '';
      let left = tabRects.slice(0, active).map(item => item.width).reduce((prev, curr) => prev + curr, 0);
      left += (rect.width - width) / 2;
      const transition = skipTransition ? '' : `transition-duration: ${duration}s; -webkit-transition-duration: ${duration}s;`;

      this.setData({
        lineStyle: `\n            ${height}\n            width: ${width}px;\n            background-color: ${color};\n            -webkit-transform: translateX(${left}px);\n            transform: translateX(${left}px);\n            ${transition}\n          `,
      });
    },
    updateTabs: function updateTabs(tabs = this.data.tabs) {
      this.setData({
        tabs,
        scrollable: tabs.length > this.data.swipeThreshold,
      });
      this.setActiveTab();
    },
    async setActiveTab() {
      await new Promise(reslove => setTimeout(reslove, 0));
      this.scrollIntoView();
      this.setLine();
    },
    handlerActive(e, child) {
      const index = this.child.findIndex(item => item === child);
      this.triggerEvent('change', { index, title: child.data.title });
    },
  },

  lifetimes: {
    ready() {

    },
  },
});
