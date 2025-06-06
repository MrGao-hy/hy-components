import type IProps from "./typing";

const defaultProps: IProps = {
  modelValue: "",
  type: "text",
  fixed: false,
  disabled: false,
  disabledColor: "",
  clearable: false,
  password: false,
  maxlength: 140,
  placeholder: null,
  placeholderClass: "input-placeholder",
  placeholderStyle: {},
  showWordLimit: false,
  confirmType: "done",
  confirmHold: false,
  holdKeyboard: false,
  focus: false,
  autoBlur: false,
  disableDefaultPadding: false,
  cursor: -1,
  cursorSpacing: 30,
  selectionStart: -1,
  selectionEnd: -1,
  adjustPosition: true,
  inputAlign: "left",
  fontSize: "15px",
  color: "",
  prefixIcon: {},
  suffixIcon: {},
  border: "surround",
  readonly: false,
  shape: "square",
  formatter: null,
  customStyle: {},
};

export default defaultProps;
