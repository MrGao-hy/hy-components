import type IProps from "./typing";
import { ColorConfig } from "../../config";

const defaultProps: IProps = {
  modelValue: false,
  loading: false,
  disabled: false,
  size: "medium",
  activeColor: ColorConfig.primary,
  inactiveColor: "#ffffff",
  activeValue: true,
  inactiveValue: false,
  activeIcon: "",
  inactiveIcon: "",
  asyncChange: false,
  space: 0,
};
export default defaultProps;
