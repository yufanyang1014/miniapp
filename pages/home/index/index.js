// pages/home/index/index.js
import computedBehavior from '../../../miniprogram_npm/miniprogram-computed/index';
import { bannerGetByTypeApi } from '../../../service/home';
import { dateFormate } from '../../../utils/index';

Component({
  behaviors: [computedBehavior],
  options: {
    addGlobalClass: true,
    multipleSlots: true,
  },
  computed: {
    dataState() {
      const { dataState } = this.data.pagination;
      return dataState;
    },
    tip() {
      const { dataState } = this.data.pagination;
      return { 0: '暂无数据', 1: '我是有底线的~', 2: '加载中...' }[dataState];
    },
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
    pagination: {
      pageNum: 1,
      pageSize: 10,
      loading: false,
      finished: false,
      dataState: 2,
    },
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onLoad() {
      this.asyncArea();
      this.getBannerList();
    },
    /**
    * 页面相关事件处理函数--监听用户下拉动作
    */
  async onPullDownRefresh() {
    wx.showNavigationBarLoading();
    wx.setNavigationBarTitle({
      title: '正在刷新',
    });
    await this.asyncAll();
    wx.setNavigationBarTitle({
      title: '楼促会',
    });
    wx.hideNavigationBarLoading();
    wx.stopPullDownRefresh();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
    this.asyncList();
  },
    async asyncArea() {
      const params = {
        pageNum: 1,
        pageSize: 100,
        "type": 7,
      }
      const resData = await bannerGetByTypeApi(params);
      const areaData = resData.data.list;
      const area = areaData && areaData[0].title;
      this.setData({ areaData, area });
      this.asyncList();
    },
    // 轮播图
    async getBannerList() {
      const params = {
        pageNum: 1,
        pageSize: 100,
        "type": 3,
      }
      wx.showLoading({
        title: '努力加载中',
      })
      const resData = await bannerGetByTypeApi(params);
      wx.hideLoading();
      const bannerImages = resData.data.list;
      this.setData({ bannerImages });
    },
    // 获取列表
    async asyncList() {
      const { pagination ,search, area, list } = this.data;
      const { pageNum, pageSize } = pagination;
      const params = {
        pageNum,
        pageSize,
        search,
        area,
        "type": 1,
      }

      const data = {};
      // 上次加载是否结束
      if (pagination.loading === true || pagination.dataState !== 2) { return; }
      pagination.loading = true;
      data.pagination = pagination;
      this.setData(data);
      try {
        const resData = await bannerGetByTypeApi(params);
        if (!Number(resData.code)) { 
          wx.showToast({
            title: resData.msg,
            icon: 'none',
            duration: 2000
          })
          return;
        }
        const allData  = resData.data.list;
        allData && allData.forEach(element => {
          element.channel = dateFormate('yyyy-MM-dd', new Date(element.channel));
        });
        const datalist = [...(pageNum === 1 ? [] : list), ...allData];
        // 分页状态(0:无数据,1:已到底,2:继续加载)
        if (datalist.length === 0) {
          pagination.dataState = 0;
        } else if (allData.length < pagination.pageSize) {
          pagination.dataState = 1;
        } else {
          pagination.dataState = 2;
          pagination.pageNum++;
        }
        data.pagination = pagination;
        data.list = datalist;
      } catch (error) {
        throw new Error(error);
      } finally {
        pagination.loading = false;
        this.setData(data);
      }
    },
    async asyncAll() {
      wx.setNavigationBarTitle({
        title: '楼促会',
      });

      const pagination = {
        pageNum: 1,
        pageSize: 10,
        loading: false,
        finished: false,
        dataState: 2,
      };
      this.setData({ pagination });
      await this.asyncList();
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
      this.asyncAll();
    },
    // clearInput(e) {
    //   this.setData({ search: '' });
    // }
  },
})
