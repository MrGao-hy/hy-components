import { defineUniPages } from '@uni-helper/vite-plugin-uni-pages'

export default defineUniPages({
  pages: [
    //pages数组中第一项表示应用启动页，参考：https://uniapp.dcloud.io/collocation/pages
    {
      path: 'pages/index/index',
      style: {
        navigationBarTitleText: '华玥组件库',
      },
    },
    {
      path: 'pages/mine/Index',
      style: {
        navigationBarTitleText: '我的',
      },
    },
  ],
  subPackages: [
    {
      root: 'pages/components',
      pages: [
        {
          path: 'icon/icon',
          style: {
            navigationBarTitleText: '图标',
            enablePullDownRefresh: false,
          },
        },
        {
          path: 'list/list',
          style: {
            navigationBarTitleText: '虚拟列表',
            enablePullDownRefresh: false,
          },
        },
        {
          path: 'upload/upload',
          style: {
            navigationBarTitleText: '上传组件',
            enablePullDownRefresh: false,
          },
        },
        {
          path: 'form/form',
          style: {
            navigationBarTitleText: '表单组件',
            enablePullDownRefresh: false,
          },
        },
        {
          path: 'button/button',
          style: {
            navigationBarTitleText: '按钮',
            enablePullDownRefresh: false,
          },
        },
        {
          path: 'cell/cell',
          style: {
            navigationBarTitleText: '单元格',
            enablePullDownRefresh: false,
          },
        },
        {
          path: 'badge/badge',
          style: {
            navigationBarTitleText: '徽标',
            enablePullDownRefresh: false,
          },
        },
        {
          path: 'tag/tag',
          style: {
            navigationBarTitleText: '标签',
            enablePullDownRefresh: false,
          },
        },
        {
          path: 'swiper/swiper',
          style: {
            navigationBarTitleText: '轮播图',
            enablePullDownRefresh: false,
          },
        },
        {
          path: 'picker/picker',
          style: {
            navigationBarTitleText: '选择器',
            enablePullDownRefresh: false,
          },
        },
        {
          path: 'datetimePicker/datetimePicker',
          style: {
            navigationBarTitleText: '时间选择器',
            enablePullDownRefresh: false,
          },
        },
        {
          path: 'addressPicker/addressPicker',
          style: {
            navigationBarTitleText: '地址选择器',
            enablePullDownRefresh: false,
          },
        },
        {
          path: 'search/search',
          style: {
            navigationBarTitleText: '搜索',
            enablePullDownRefresh: false,
          },
        },
        {
          path: 'rate/rate',
          style: {
            navigationBarTitleText: '评分',
            enablePullDownRefresh: false,
          },
        },
        {
          path: 'numberBox/numberBox',
          style: {
            navigationBarTitleText: '步进器',
            enablePullDownRefresh: false,
          },
        },
        {
          path: 'input/input',
          style: {
            navigationBarTitleText: '输入框',
            enablePullDownRefresh: false,
          },
        },
        {
          path: 'textarea/textarea',
          style: {
            navigationBarTitleText: '文本域',
            enablePullDownRefresh: false,
          },
        },
        {
          path: 'checkButton/checkButton',
          style: {
            navigationBarTitleText: '按钮选择',
            enablePullDownRefresh: false,
          },
        },
        {
          path: 'checkbox/checkbox',
          style: {
            navigationBarTitleText: '复选框',
            enablePullDownRefresh: false,
          },
        },
        {
          path: 'radio/radio',
          style: {
            navigationBarTitleText: '单选框',
            enablePullDownRefresh: false,
          },
        },
        {
          path: 'slider/slider',
          style: {
            navigationBarTitleText: '滑块',
            enablePullDownRefresh: false,
          },
        },
        {
          path: 'switch/switch',
          style: {
            navigationBarTitleText: '开关',
            enablePullDownRefresh: false,
          },
        },
        {
          path: 'lineProgress/lineProgress',
          style: {
            navigationBarTitleText: '线形进度条',
            enablePullDownRefresh: false,
          },
        },
        {
          path: 'scrollList/scrollList',
          style: {
            navigationBarTitleText: '横向滚动列表',
            enablePullDownRefresh: false,
          },
        },
        {
          path: 'line/line',
          style: {
            navigationBarTitleText: '线条',
            enablePullDownRefresh: false,
          },
        },
        {
          path: 'card/card',
          style: {
            navigationBarTitleText: '卡片',
            enablePullDownRefresh: false,
          },
        },
        {
          path: 'overlay/overlay',
          style: {
            navigationBarTitleText: '遮罩层',
            enablePullDownRefresh: false,
          },
        },
        {
          path: 'grid/grid',
          style: {
            navigationBarTitleText: '宫格布局',
            enablePullDownRefresh: false,
          },
        },
        {
          path: 'divider/divider',
          style: {
            navigationBarTitleText: '分割线',
            enablePullDownRefresh: false,
          },
        },
        {
          path: 'tooltip/tooltip',
          style: {
            navigationBarTitleText: '长按提示',
            enablePullDownRefresh: false,
          },
        },
        {
          path: 'warn/warn',
          style: {
            navigationBarTitleText: '警告提示',
            enablePullDownRefresh: false,
          },
        },
        {
          path: 'noticeBar/noticeBar',
          style: {
            navigationBarTitleText: '滚动通知',
            enablePullDownRefresh: false,
          },
        },
        {
          path: 'foldingPanel/foldingPanel',
          style: {
            navigationBarTitleText: '折叠面板',
            enablePullDownRefresh: false,
          },
        },
        {
          path: 'popup/popup',
          style: {
            navigationBarTitleText: '弹出层',
            enablePullDownRefresh: false,
          },
        },
        {
          path: 'modal/modal',
          style: {
            navigationBarTitleText: '模态框',
            enablePullDownRefresh: false,
          },
        },
        {
          path: 'readMore/readMore',
          style: {
            navigationBarTitleText: '展开阅读更多',
            enablePullDownRefresh: false,
          },
        },
        {
          path: 'navbar/navbar',
          style: {
            navigationBarTitleText: '顶部导航栏',
            enablePullDownRefresh: false,
          },
        },
        {
          path: 'backTop/backTop',
          style: {
            navigationBarTitleText: '返回顶部',
            enablePullDownRefresh: false,
          },
        },
        {
          path: 'tabs/tabs',
          style: {
            navigationBarTitleText: 'tabs',
            enablePullDownRefresh: false,
          },
        },
        {
          path: 'subsection/subsection',
          style: {
            navigationBarTitleText: '分段器',
            enablePullDownRefresh: false,
          },
        },
        {
          path: 'steps/steps',
          style: {
            navigationBarTitleText: '步骤条',
            enablePullDownRefresh: false,
          },
        },
        {
          path: 'empty/empty',
          style: {
            navigationBarTitleText: '空状态',
            enablePullDownRefresh: false,
          },
        },
        {
          path: 'avatar/avatar',
          style: {
            navigationBarTitleText: '头像',
            enablePullDownRefresh: false,
          },
        },
        {
          path: 'transition/transition',
          style: {
            navigationBarTitleText: '动画',
            enablePullDownRefresh: false,
          },
        },
        {
          path: 'qrcode/qrcode',
          style: {
            navigationBarTitleText: '二维码',
            enablePullDownRefresh: false,
          },
        },
        {
          path: 'loading/loading',
          style: {
            navigationBarTitleText: '加载',
            enablePullDownRefresh: false,
          },
        },
        {
          path: 'calendar/calendar',
          style: {
            navigationBarTitleText: '日历',
            enablePullDownRefresh: false,
          },
        },
        {
          path: 'swipeAction/swipeAction',
          style: {
            navigationBarTitleText: '滑动单元格',
            enablePullDownRefresh: false,
          },
        },
        {
          path: 'image/image',
          style: {
            navigationBarTitleText: '图片',
            enablePullDownRefresh: false,
          },
        },
        {
          path: 'countDown/countDown',
          style: {
            navigationBarTitleText: '倒计时',
            enablePullDownRefresh: false,
          },
        },
        {
          path: 'countTo/countTo',
          style: {
            navigationBarTitleText: '数字滚动',
            enablePullDownRefresh: false,
          },
        },
        {
          path: 'floatButton/floatButton',
          style: {
            navigationBarTitleText: '悬浮按钮',
            enablePullDownRefresh: false,
          },
        },
        {
          path: 'dropdown/dropdown',
          style: {
            navigationBarTitleText: '下拉菜单',
            enablePullDownRefresh: false,
          },
        },
        {
          path: 'text/text',
          style: {
            navigationBarTitleText: '文本',
            enablePullDownRefresh: false,
          },
        },
        {
          path: 'parse/parse',
          style: {
            navigationBarTitleText: '富文本',
            enablePullDownRefresh: false,
          },
        },
        {
          path: 'submitBar/submitBar',
          style: {
            navigationBarTitleText: '提交订单栏',
            enablePullDownRefresh: false,
          },
        },
        {
          path: 'price/price',
          style: {
            navigationBarTitleText: '金额',
            enablePullDownRefresh: false,
          },
        },
        {
          path: 'login/login',
          style: {
            navigationBarTitleText: '登录页面',
            enablePullDownRefresh: false,
          },
        },
        {
          path: 'waterfall/waterfall',
          style: {
            navigationBarTitleText: '瀑布流',
            enablePullDownRefresh: false,
          },
        },
        {
          path: 'toast/toast',
          style: {
            navigationBarTitleText: '消息提示',
            enablePullDownRefresh: false,
          },
        },
        {
          path: 'configProvider/configProvider',
          style: {
            navigationBarTitleText: '页面全局配置',
            enablePullDownRefresh: false,
          },
        },
        {
          path: 'codeInput/codeInput',
          style: {
            navigationBarTitleText: '验证码输入',
            enablePullDownRefresh: false,
          },
        },
        {
          path: 'notify/notify',
          style: {
            navigationBarTitleText: '消息提示',
            enablePullDownRefresh: false,
          },
        },
        {
          path: 'signature/signature',
          style: {
            navigationBarTitleText: '签名',
            enablePullDownRefresh: false,
          },
        },
        {
          path: 'pagination/pagination',
          style: {
            navigationBarTitleText: '分页',
            enablePullDownRefresh: false,
          },
        },
        {
          path: 'menu/menu',
          style: {
            navigationBarTitleText: '侧边菜单栏',
            enablePullDownRefresh: false,
          },
        },
        {
          path: 'watermark/watermark',
          style: {
            navigationBarTitleText: '水印',
            enablePullDownRefresh: false,
          },
        },
        {
          path: 'tabBar/tabBar',
          style: {
            navigationBarTitleText: '底部导航栏',
            enablePullDownRefresh: false,
          },
        },
        {
          path: 'actionSheet/actionSheet',
          style: {
            navigationBarTitleText: '操作菜单',
            enablePullDownRefresh: false,
          },
        },
        {
          path: 'popover/popover',
          style: {
            navigationBarTitleText: '气泡',
            enablePullDownRefresh: false,
          },
        },
      ],
    },
  ],
  globalStyle: {
    navigationStyle: 'default',
    navigationBarTitleText: 'unibest',
    navigationBarBackgroundColor: '#f8f8f8',
    navigationBarTextStyle: 'black',
    backgroundColor: '#FFFFFF',
  },
  easycom: {
    autoscan: true,
    custom: {
      '^wd-(.*)': 'wot-design-uni/components/wd-$1/wd-$1.vue',
      '^(?!z-paging-refresh|z-paging-load-more)z-paging(.*)':
        'z-paging/components/z-paging$1/z-paging$1.vue',
    },
  },
  // 如果不需要tabBar，可以注释掉这个配置，或者直接删除
  tabBar: {
    color: '#999999',
    selectedColor: '#018d71',
    backgroundColor: '#F8F8F8',
    borderStyle: 'black',
    height: '50px',
    fontSize: '10px',
    iconWidth: '24px',
    spacing: '3px',
    list: [
      {
        iconPath: 'static/tabbar/home.png',
        selectedIconPath: 'static/tabbar/homeHL.png',
        pagePath: 'pages/index/index',
        text: '首页',
      },
      {
        iconPath: 'static/tabbar/example.png',
        selectedIconPath: 'static/tabbar/exampleHL.png',
        pagePath: 'pages/mine/Index',
        text: '我的',
      },
    ],
  },
})
