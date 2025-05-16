import type IProps from "./typing";
import { ColorConfig } from "../../config";

const defaultProps: IProps = {
  list: [],
  title: "",
  titleBorder: false,
  border: true,
  verticalColor: ColorConfig.primary,
  showVertical: true,
  disabled: false,
  clickable: false,
  size: "medium",
  value: "",
  arrange: "right",
  rightIcon: {},
  arrowDirection: "right",
};

export default defaultProps;
