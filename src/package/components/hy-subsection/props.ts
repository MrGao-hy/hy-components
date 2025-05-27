import type IProps from "./typing";
import { ColorConfig } from "../../config";

const defaultProps: IProps = {
  modelValue: "",
  current: 0,
  list: [],
  fieldNames: {
    label: "name",
    value: "value",
  },
  activeColor: "",
  inactiveColor: "",
  mode: "button",
  fontSize: 12,
  bold: true,
  bgColor: "",
};

export default defaultProps;
