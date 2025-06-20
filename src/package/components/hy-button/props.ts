import type IProps from "./typing";

const defaultProps: IProps = {
  hairline: false,
  type: "primary",
  size: "medium",
  shape: "square",
  plain: false,
  disabled: false,
  loading: false,
  loadingText: "",
  loadingMode: "spinner",
  loadingSize: 13,
  openType: "",
  formType: "",
  appParameter: "",
  hoverStopPropagation: true,
  lang: "en",
  sessionFrom: "",
  sendMessageTitle: "",
  sendMessagePath: "",
  sendMessageImg: "",
  showMessageCard: false,
  dataName: "",
  throttleTime: 0,
  hoverStartTime: 0,
  hoverStayTime: 200,
  text: "",
  icon: {},
  color: "",
  stop: true,
};

export default defaultProps;
