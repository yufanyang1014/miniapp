// pages/home/detail/detail.js
import computedBehavior from '../../../miniprogram_npm/miniprogram-computed/index';
import { dateFormate } from '../../../utils/index';
import { bannerGetByTypeApi } from '../../../service/home';

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

  },

  /**
   * 组件的初始数据
   */
  data: {
    curDetail: {},
    pagination: {
      pageNum: 1,
      pageSize: 10,
    },
  },

  /**
   * 组件的方法列表
   */
  methods: {
    /**
      * 用户点击右上角分享
      */
    onShareAppMessage() {
      // return {
      //   path: '/pages/share/share?id=123',
      // }
    },
    onPullDownRefresh() {
      wx.stopPullDownRefresh();
    },
    // 获取列表
    async asyncDetail(id) {
      const { pagination } = this.data;
      const { pageNum, pageSize } = pagination;
      const params = {
        pageNum,
        pageSize,
        "type": 1,
        id
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
      const curDetail = resData.data.list[0];
      curDetail.channel = dateFormate('yyyy-MM-dd', new Date(curDetail.channel));
      this.setData({
        curDetail,
      })
    },
    onShow() {
      const { id } = this.options;
      this.asyncDetail(id);
    },

  }
})
