import type IProps from "./typing";
import { ColorConfig } from "../../config";

const defaultProps: IProps = {
  theme: "light",
  themeColor: ColorConfig.primary,
  themeLightColor: "#ecf5ff",
  padding: "10px",
  customClass: "",
  customStyle: {},
};

export default defaultProps;
