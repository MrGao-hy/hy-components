import type IProps from "./typing";

const defaultProps: IProps = {
  borderBottom: false,
  options: [
    {
      text: "收藏",
      style: {
        backgroundColor: "#3c9cff",
      },
    },
    {
      text: "删除",
      style: {
        backgroundColor: "#f56c6c",
      },
    },
  ],
  duration: 300,
  closeOnClick: true,
};

export default defaultProps;
