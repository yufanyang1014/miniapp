// components/formCell/formCell.js
import computedBehavior from '../../miniprogram_npm/miniprogram-computed/index';

const classes = 'zebra-form-cell';

Component({
  behaviors: [computedBehavior],
  options: {
    addGlobalClass: true,
    multipleSlots: true,
  },
  properties: {
    name: {
      type: String,
      value: `ibuy_${new Date().getTime()}`,
    },
    value: {
      type: String,
      value: '',
    },
    type: {
      type: String,
      value: 'text',
    },
    placeholder: {
      type: String,
      value: '',
    },
    maxlength: {
      type: Number,
      value: 256,
    },
    label: {
      type: String,
      value: '',
    },
    labelClass: {
      type: String,
      value: '',
    },
    readonly: {
      type: Boolean,
      value: false,
    },
    confirmType: {
      type: String,
      value: 'done',
    },
    isLink: {
      type: Boolean,
      value: false,
    },
  },
  data: {
    classes,
  },
  computed: {

  },
  observers: {

  },
  methods: {
    handlerInput(e) {
      this.triggerEvent('input', e.detail);
    },
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
