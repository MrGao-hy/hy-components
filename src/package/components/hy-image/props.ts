import type IProps from "./typing";
import { IconConfig } from "../../config";

const defaultProps: IProps = {
  src: "",
  mode: "aspectFill",
  width: "200",
  height: "150",
  shape: "square",
  radius: 0,
  lazyLoad: true,
  showMenuByLongPress: true,
  loadingIcon: IconConfig.LOADING,
  errorIcon: IconConfig.NOTICE,
  showLoading: true,
  showError: true,
  fade: true,
  webp: false,
  duration: 500,
  bgColor: "",
  previewImage: false,
};

export default defaultProps;
