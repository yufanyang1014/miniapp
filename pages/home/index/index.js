// pages/home/index/index.js
import computedBehavior from '../../../miniprogram_npm/miniprogram-computed/index';
import { bannerGetByTypeApi } from '../../../service/home';

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
    swiper: {
      indicatorDots: true,
      vertical: false,
      autoplay: true,
      interval: 2000,
      duration: 500,
      color: 'orangered',
    },
    activeIndex: 0,
    bannerImages: [],
    search: '', // 搜索-名称
    area: '', // 搜索-地段
    areaData: [],
    list: [],
    pageNum: 1,
    total: 0,
    pageSize: 10,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onShow() {
      // this.asyncAll();
      // this.asyncArea();
      // this.getBannerList();
    },
    async asyncArea() {
      const params = {
        pageNum: 0,
        pageSize: 100,
        "type": 7,
      }
      const resData = await bannerGetByTypeApi(params);
      const areaData = resData.data.list;
      this.setData({ areaData });
    },
    async getBannerList() {
      const params = {
        pageNum: 0,
        pageSize: 100,
        "type": 3,
      }
      const resData = await bannerGetByTypeApi(params);
      const bannerImages = resData.data.list;
      this.setData({ bannerImages });
    },
    async asyncAll() {
      const { pageNum, pageSize, search, area } = this.data;
      const params = {
        pageNum,
        pageSize,
        search,
        area,
        "type": 1,
      }
      const resData = await bannerGetByTypeApi(params);
      if (!Number(resData.code)) { 
        wx.showToast({
          title: resData.msg,
          icon: 'none',
          duration: 2000
        })
        return;
      }
      const { total, list } = resData.data;
      this.setData({ list, total })
    },
    handlerChange(e) {
      const { idx, area } = e.currentTarget.dataset;
      this.setData({ activeIndex: idx, area });
      this.asyncAll();
    },
    handlerJumpApp() {
      wx.navigateToMiniProgram({
        appId: 'wx9e0b65bedfdb26e7',
        path: '',
      })
    },
    bindconfirm(e) {
      const { value } = e.detail;
      this.setData({ search: value });
      wx.showToast({
        title: value,
        icon: 'none',
        duration: 2000
      })
      // this.asyncAll();
    },
    // clearInput(e) {
    //   this.setData({ search: '' });
    // }
  },
})
