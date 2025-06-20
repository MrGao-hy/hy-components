import { createVNode, render } from "vue";
import Dialog, { type DialogParam } from "./TheMessage.vue";

let instance: any = null;

const successIcon = "https://pic1.imgdb.cn/item/67a74cbdd0e0a243d4fd160b.png";
const errorIcon = "https://pic1.imgdb.cn/item/67b03ba3d0e0a243d4ff9078.png";
const warningIcon = "https://pic1.imgdb.cn/item/67b03ba3d0e0a243d4ff9079.png";
/**
 * @description 创建div添加dialog组件
 * */
const mountDialog = () => {
  if (!instance) {
    const container = document.createElement("div");
    document.body.appendChild(container); // 先添加到 body
    instance = createVNode(Dialog);
    render(instance, container);
  }
};
/**
 * @description 打开传参
 * */
const openParams = (options: DialogParam, icon: string) => {
  instance.component.exposed.open(
    Object.assign(
      {
        icon,
      },
      options,
    ),
  );
};

const DialogService = {
  success(options: DialogParam) {
    mountDialog();
    openParams(options, successIcon);
  },
  error(options: DialogParam) {
    mountDialog();
    openParams(options, errorIcon);
  },
  warning(options: DialogParam) {
    mountDialog();
    openParams(options, warningIcon);
  },
  close() {
    if (instance) {
      instance.component.exposed.close();
    }
  },
};

export default DialogService;
