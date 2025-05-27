<template>
  <view class="hy-check-button">
    <template v-for="(item, i) in columns_1" :key="i">
      <HyTag
        :text="item?.[fieldNames.label] as string | number"
        :name="i"
        :type="type"
        :size="size"
        :shape="shape"
        :disabled="isDisabled(item.disabled)"
        :plain="!item?.[fieldNames.checked]"
        @click="onCheckbox"
      ></HyTag>
    </template>
  </view>
</template>

<script lang="ts">
export default {
  name: 'hy-check-button',
  options: {
    addGlobalClass: true,
    virtualHost: true,
    styleIsolation: 'shared'
  }
}
</script>

<script setup lang="ts">
import { toRefs, watch, ref } from "vue";
import defaultProps from "./props";
import type IProps from "./typing";
import type { CheckboxColumnsVo } from "./typing";
import HyTag from "../hy-tag/hy-tag.vue";

const props = withDefaults(defineProps<IProps>(), defaultProps);
const { modelValue, columns, fieldNames, disabled, selectType } = toRefs(props);
const emit = defineEmits(["change", "update:modelValue"]);

const isDisabled = (disabledVal?: boolean): boolean =>
  disabled.value || !!disabledVal;

const columns_1 = ref<CheckboxColumnsVo[]>();

watch(
  () => modelValue.value,
  (newValue: string | number | (string | number)[]) => {
    if (!columns.value.length) return;
    columns_1.value = columns.value.map((item) => {
      if (Array.isArray(newValue)) {
        item[fieldNames.value.checked] = newValue.includes(
          item[fieldNames.value.value] as string,
        );
      } else {
        item[fieldNames.value.checked] =
          newValue === item[fieldNames.value.value];
      }
      return item;
    });
  },
  { immediate: true },
);

const onCheckbox = ({ name }: { name: number }) => {
  if (selectType.value === "checkbox") {
    columns.value[name][fieldNames.value.checked] =
      !columns.value[name][fieldNames.value.checked];
    emit(
      "update:modelValue",
      columns.value
        .filter((item) => item[fieldNames.value.checked])
        .map((item) => item[fieldNames.value.value]),
    );
  } else {
    emit("update:modelValue", columns.value[name][fieldNames.value.value]);
  }

  emit("change", columns.value[name]);
};
</script>

<style lang="scss" scoped>
@import "../../libs/css/mixin.scss";
@include b(check-button) {
  display: grid;
  grid-template-columns: v-bind(col);
  gap: v-bind(gap);
}
</style>
