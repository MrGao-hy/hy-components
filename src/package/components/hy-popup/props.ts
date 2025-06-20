import type IProps from "./typing";

const defaultProps: IProps = {
  show: false,
  overlay: true,
  mode: "bottom",
  duration: 300,
  closeable: false,
  overlayStyle: {},
  overlayOpacity: 0.5,
  closeOnClickOverlay: true,
  zIndex: 10075,
  safeAreaInsetBottom: true,
  safeAreaInsetTop: false,
  closeIconPos: "top-right",
  round: 0,
  zoom: true,
  bgColor: "",
};

export default defaultProps;
