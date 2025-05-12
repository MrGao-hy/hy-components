<template>
  <view class="user-login">
    <HyForm ref="form_1Ref" :columns="userColumns" :formData="userForm">
      <template #user="{ record, errorStyle }">
        <HyInput
          v-model="userForm.name"
          :placeholder="userPlaceholder"
          :clearable="true"
          border="bottom"
          :customStyle="errorStyle"
          @change="handleChange($event, record)"
          @blur="handleBlur($event, record)"
        >
          <!-- #ifndef APP-PLUS-NVUE -->
          <template #prefix>
            <HyIcon :name="IconConfig.MINE" :color="themeColor"></HyIcon>
          </template>
          <template #suffix>
            <HyIcon
              :name="
                !showChoice
                  ? IconConfig.ARROW_DOWN_FILL
                  : IconConfig.ARROW_UP_FILL
              "
              @tap="showChoice = !showChoice"
              :color="themeColor"
            ></HyIcon>
            <view class="dialog-view" v-if="showChoice && choiceList.length">
              <view
                class="dialog-title"
                v-for="(item, index) in choiceList"
                :key="index"
                @click="btnChoiceClick(index)"
              >
                {{ item.user }}
              </view>
            </view>
          </template>
          <!-- #endif -->
        </HyInput>
      </template>
      <template #pwd="{ record }">
        <HyInput
          :type="showPwd ? 'text' : 'password'"
          v-model="userForm.pwd"
          :placeholder="pwdPlaceholder"
          :clearable="true"
          border="bottom"
          :password-icon="false"
          @change="handleChange($event, record)"
          @blur="handleBlur($event, record)"
        >
          <!-- #ifndef APP-PLUS-NVUE -->
          <template #prefix>
            <HyIcon :name="IconConfig.LOCK" :color="themeColor"></HyIcon>
          </template>
          <template v-if="isShowPwd" #suffix>
            <HyIcon
              size="16"
              @click="showPasswordFn"
              color="#c8c9cc"
              :name="showPwd ? 'eye-fill' : 'eye-off'"
            ></HyIcon>
          </template>
          <!-- #endif -->
        </HyInput>
      </template>
    </HyForm>

    <!-- 记住密码 -->
    <view class="mui-input-row mui-checkbox">
      <HyCheckbox
        :columns="rememberList"
        shape="square"
        :active-color="themeColor"
        v-model="rememberPassword"
        @change="checkboxChange"
      ></HyCheckbox>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from "vue";
import { onHide } from "@dcloudio/uni-app";
import { storeToRefs } from "pinia";
import { useUserInfo } from "../../store";
import { decryptData, encryptData } from "../../utils";
import type { FormColumnsType } from "../../typing";
import { FormTypeEnum } from "../../typing";
import { IconConfig } from "../../config";

// 组件
import HyCheckbox from "../hy-checkbox/hy-checkbox.vue";
import HyForm from "../hy-form/hy-form.vue";
import HyInput from "../hy-input/hy-input.vue";
import HyIcon from "../hy-icon/hy-icon.vue";

interface IProps {
  themeColor: string;
  prefix: string;
  isShowPwd: boolean;
  userPlaceholder: string;
  pwdPlaceholder: string;
  customUserValidator: Record<string, any>;
  customPwdValidator: Record<string, any>;
  userNumValidator: Record<string, any>;
  pwdNumValidator: Record<string, any>;
}

const props = withDefaults(defineProps<IProps>(), {
  themeColor: "",
  prefix: "gxh",
  isShowPwd: false,
  userPlaceholder: "",
  pwdPlaceholder: "",
  customUserValidator: () => ({}),
  customPwdValidator: () => ({}),
  userNumValidator: () => ({}),
  pwdNumValidator: () => ({}),
});
const emit = defineEmits(["handleHistory", "handleCheckbox"]);
const userInfoStore = useUserInfo();
const { userForm, choiceList, rememberPsw } = storeToRefs(userInfoStore);

const userColumns = reactive([
  {
    field: "user",
    label: "",
    type: FormTypeEnum.CUSTOM,
    rules: [props.customUserValidator, props.userNumValidator],
  },
  {
    field: "pwd",
    label: "",
    type: FormTypeEnum.CUSTOM,
    rules: [props.customUserValidator, props.pwdNumValidator],
  },
]);
const rememberList = reactive([{ label: "记住密码", value: 1 }]);
const showPwd = ref<boolean>(false);
const showChoice = ref<boolean>(false);
const form_1Ref = ref<InstanceType<typeof HyForm>>();
// 效验用户名和密码
const userRules = reactive({
  name: [
    {
      required: true,
      message: "请先输入账号",
      // 可以单个或者同时写两个触发验证方式
      trigger: ["blur", "change"],
    },
    props.customUserValidator,
    props.userNumValidator,
  ],
  pwd: [
    {
      required: true,
      message: "请输入密码",
      // 可以单个或者同时写两个触发验证方式
      trigger: ["blur", "change"],
    },
    props.pwdNumValidator,
    props.customPwdValidator,
  ],
});
const rememberPassword = ref([0]);
const account = uni.getStorageSync(`${props.prefix}_account`);
const accountList = uni.getStorageSync(`${props.prefix}_choiceList`);

onMounted(() => {
  if (!account) return;
  const result = decryptData(account);
  //有缓存就赋值给文本没有就清空
  rememberPsw.value = result.rememberPsw;
  if (account) {
    //获取缓存的账号和密码
    userForm.value.name = result.userName;
    userForm.value.pwd = result.password;
  } else {
    userForm.value.name = "";
    userForm.value.pwd = "";
  }
  if (accountList) {
    choiceList.value = decryptData(accountList);
  }
});

onHide(() => {
  if (!account) return;
  //获取缓存的账号和密码
  const { userName, password } = decryptData(account);
  if (choiceList.value.length) {
    // 过滤数判断是否有一样的账号
    const filterArr = choiceList.value.filter((item) => {
      return item.user === userName;
    });
    // 有一样的账号退出函数不执行下面的
    if (filterArr.length) return;
  }
  // 判断是否有保存账号和密码
  if (userName && password) {
    // 数组前面加数据
    choiceList.value.unshift({
      user: userName,
      pwd: password,
    });
    // 数组最多只放三个账号
    if (choiceList.value.length >= 5) {
      choiceList.value.splice(5, 1);
    }
    uni.setStorageSync(
      `${props.prefix}_choiceList`,
      encryptData(choiceList.value),
    );
  }
});

/**
 * 登录效验
 * */
const loginFn = () => {
  return new Promise((resolve, reject) => {
    form_1Ref.value
      .handleSubmit()
      .then((res) => {
        resolve("success" + res);
      })
      .catch((err) => {
        reject("error" + err);
      });
  });
};

/**
 * 勾选是否记住密码
 * */
const checkboxChange = () => {
  emit("handleCheckbox", rememberPsw.value);
};

/**
 * 选择历史账号
 * */
const btnChoiceClick = (index: number) => {
  showChoice.value = false;
  userForm.value.name = choiceList.value[index].user;
  userForm.value.pwd = choiceList.value[index].pwd;
  emit("handleHistory");
};

/**
 * 长按操作历史账户
 * 0-复制
 * 1-删除
 * */
const extensionFun = (index: number, username: string) => {
  switch (index) {
    case 0:
      const i = choiceList.value.findIndex((item) => item.user === username);
      choiceList.value.splice(i, 1);
      uni.setStorageSync(
        `${props.prefix}_choiceList`,
        encryptData(choiceList.value),
      );
      break;
    default:
      break;
  }
};

const showPasswordFn = () => {
  showPwd.value = !showPwd.value;
};

const handleChange = (event: string, temp: FormColumnsType) => {
  form_1Ref.value?.validateField(temp.rules, event, temp.field, "change");
};
const handleBlur = (event: string, temp: FormColumnsType) => {
  form_1Ref.value?.validateField(temp.rules, event, temp.field, "blur");
};

defineExpose({
  loginFn,
});
</script>

<style lang="scss" scoped>
.user-login {
  ::v-deep .u-input__content__subfix-icon {
    position: relative;

    .dialog-view {
      display: flex;
      flex-direction: column;
      justify-content: center;
      border-radius: 20rpx;
      border: 1rpx solid #cacaca;
      background-color: white;
      position: absolute;
      overflow: hidden;
      top: 50rpx;
      right: 10rpx;
      z-index: 999;

      .dialog-title {
        white-space: nowrap;
        height: 100%;
        color: #a6a6a6;
        overflow: hidden;
        font-size: 28rpx;
        text-align: center;
        padding: 10rpx 30rpx;
        border-top: 1rpx solid rgba(128, 128, 128, 0.233);
      }
    }
  }

  .iconfont {
    font-size: 40rpx;
  }
}
</style>
