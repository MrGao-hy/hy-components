import type IProps from "./typing";
import { IconConfig } from "../../config";

const defaultProps: IProps = {
  menus: [],
  direction: "column",
  icon: IconConfig.PLUS,
  iconSize: "",
  iconColor: "",
  bottom: 80,
  left: 20,
  zIndex: 10086,
  bgColor: "",
  text: "",
  fontSize: "12px",
  textColor: "",
  size: "medium",
  shape: "circle",
  opacity: 1,
  shadow: true,
  float: true,
  fixed: true,
};

export default defaultProps;
