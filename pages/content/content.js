// components/content/content.js
import regeneratorRuntime from '../../miniprogram_npm/regenerator-runtime/index';
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
  },

  /**
   * 组件的初始数据
   */
  data: {
    elementId: `editor-content-${new Date().getTime()}`,
  },
  computed: {

  },
  observers: {
    value(value) {
      const { elementId } = this.data;
      const html = this.filterHTML(value);
      const query = wx.createSelectorQuery().in(this);
      query.select(`#${elementId}`).context((res) => {
        this.editorContext = res.context;
        res.context.setContents({
          html,
        });
      }).exec();
    },
  },
  /**
   * 组件的方法列表
   */
  methods: {
    filterHTML(value = '') {
      let desc = value.replace(/(<img[^>]+>)/g, match => match.replace(/height="[\d]+[\\.]?[\d]*"/g, '').replace(/class="[^"]+"/g, '').replace(/<img /g, '<img class="rich_img" '));
      desc = desc.replace(/(<p[^>]+>)/g, match => match.replace(/style="[\d]+[\\.]?[\d]*"/g, '').replace(/class="[^"]+"/g, '').replace(/<p/g, '<p class="rich_p" '));
      desc = desc.replace(/(<table[^>]+>)/g, match => match.replace(/height="[\d]+[\\.]?[\d]*"/g, ''));
      desc = desc.replace(/(<video[^>]+>)/g, match => match.replace(/controls=""/, '').replace(/>/, ' controls="" playback-rate="1" x5-playsinline="true" playsinline="true" webkit-playsinline="true" x-webkit-airplay="allow" x5-video-orientation="portrait" preload="true" autoplay style="object-fit: scale-down;min-width: 100%;width:100%;min-height:46vw;height: auto;">'));
      return desc;
    },
  },
  lifetimes: {

  },
});
