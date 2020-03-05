// components/cell/cell.js
import computedBehavior from '../../miniprogram_npm/miniprogram-computed/index';

const classes = 'zebra-cell';

Component({
  behaviors: [computedBehavior],
  options: {
    addGlobalClass: true,
    multipleSlots: true,
  },
  properties: {
    value: {
      type: String,
      value: '',
    },
    icon: {
      type: String,
      value: '',
    },
    label: {
      type: String,
      value: '',
    },
    labelClass: {
      type: String,
      value: '',
    },
    customClass: {
      type: String,
      value: '',
    },
    isLink: {
      type: Boolean,
      value: false,
    },
    border: {
      type: Boolean,
      value: true,
    },
  },
  data: {

  },
  computed: {
    classes() {
      const border = this.data.border ? `${classes}-border` : '';
      return `${classes} ${border} ${this.data.customClass}`;
    },
  },
  observers: {

  },
  methods: {

  },
  lifetimes: {
    created() {

    },
    attached() {

    },
    ready() {

    },
  },

});
