import { createApp } from "vue";
import AlertDialogCom, { type DialogParam } from "./TheDialog.vue";
import type { ResultParam } from "../../typing";

export default class Dialog {
  private static mountNode: HTMLElement | null = null;

  public static show(param: DialogParam) {
    let app = createApp(AlertDialogCom, { ...param });
    this.mountNode = document.createElement("div");
    app.mount(this.mountNode);
    document.body.appendChild(this.mountNode);
  }

  // await用法
  // let res = await DialogAialog.showByAwait({
  //     title: '提示',
  //     content: '确定要作废该条订单吗?',
  // })
  // if (res.confirm) {
  //
  // } else if (res.cancle) {
  //     console.log('web', '用户取消')
  // }
  public static showByAwait(param: DialogParam): Promise<ResultParam> {
    return new Promise((resolve, reject) => {
      param.result = (res: ResultParam) => resolve(res);
      this.show(param);
    });
  }

  public static close() {
    if (!this.mountNode) return;
    document.body.removeChild(this.mountNode);
    this.mountNode = null;
    // console.log('close', 'DialogAialog已销毁')
  }
}
