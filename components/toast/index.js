
const defaultOptions = {
  type: 'info',
  mask: false,
  message: '',
  show: true,
  zIndex: 1000,
  duration: 2000,
  position: 'middle',
  forbidClick: false,
  loadingType: 'circular',
  selector: '#zebra-toast',
};
let queue = [];

let currentOptions = Object.assign({}, defaultOptions);

function parseOptions(message) {
  return typeof (message) === 'string' ? { message } : message;
}

function getContext() {
  const pages = getCurrentPages();
  return pages[pages.length - 1];
}

const Toast = function Toast($options = {}) {
  const options = Object.assign({}, currentOptions, parseOptions($options));
  const context = options.context || getContext();
  const toast = context.selectComponent(options.selector);

  if (!toast) {
    console.warn('未找到 zebra-toast 节点，请确认 selector 及 context 是否正确');
    return null;
  }

  delete options.context;
  delete options.selector;
  queue.push(toast);
  toast.setData(options);
  clearTimeout(toast.timer);

  if (options.duration > 0) {
    const timer = setTimeout(() => {
      toast.clear();
      queue = queue.filter(item => item !== toast);
    }, options.duration);
    toast.setData({ timer });
  }

  return toast;
};

const createMethod = function createMethod(type) {
  return function (options) {
    return Toast(Object.assign({
      type,
    }, parseOptions(options)));
  };
};

['loading', 'success', 'fail', 'error', 'info', 'warning'].forEach((method) => {
  Toast[method] = createMethod(method);
});

Toast.clear = function clear() {
  queue.forEach((toast) => {
    toast.clear();
  });
  queue = [];
};

Toast.setDefaultOptions = function setDefaultOptions(options) {
  Object.assign(currentOptions, options);
};

Toast.resetDefaultOptions = function resetDefaultOptions() {
  currentOptions = Object.assign({}, defaultOptions);
};

export default Toast;
