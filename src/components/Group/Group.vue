<template>
  <div class="group-container">
    <Field :label="'Spelling'" :error="nameError" class="name-container">
      <Input
        :placeholder="'Your Group Here...'"
        :error="nameError"
        @input="onNameChange"
        :initValue="name"
      />
    </Field>

    <Field :label="'Description'" class="name-container">
      <Input
        :placeholder="'Description ...'"
        @input="onDescriptionChange"
        :initValue="description"
      />
    </Field>

    <Field :label="'Language'">
      <Select
        :placeholder="'Choose a Language ...'"
        :value="selectedLang"
        :options="langOptions"
        :showClose="true"
        @select="onSelect"
      />
    </Field>
  </div>
</template>

<script setup lang="ts">
import "./style.scss";
import { defineProps, ref, computed, onMounted, reactive, watch } from "vue";
import Input from "../Form/Input/Input.vue";
import Select from "../Form/Select/Select.vue";
import Field from "../Form/Field/Field.vue";
import { useLangStore } from "../../stores/lang";
const emit = defineEmits(["change"]);
const props = defineProps({
  group: {
    type: Object,
    default() {
      return {
        name: "",
        description: "",
      };
    },
  },
  type: {
    type: String,
    default: "show",
  },
});

const selectedLang = ref<string>("");
const option = reactive<any>([]);
const langId = ref<string>(props.group !== undefined ? props.group.langId : "");
const { langs, getLangs, getLangById } = useLangStore();

const inputStyle = () => {
  return { "pointer-events": props.type === "show" ? "none" : "auto" };
};
const nameError = () => {
  return !props.group.name || props.group.name.length === 0 ? "*Required" : "";
};
onMounted(() => {
  getLangs();
});
const onNameChange = (value: string) => {
  emit("change", {
    name: value,
    description: props.group.description,
    langId: langId.value,
  });
};
const onDescriptionChange = (value: string) => {
  emit("change", {
    name: props.group.name,
    description: value,
    langId: langId.value,
  });
};
const onSelect = (option) => {
  selectedLang.value = option.label;
  langId.value = option.value;
  emit("change", {
    name: props.group.name,
    description: props.group.description,
    langId: option.value,
  });
};
const getLang = async (langId) => {
  const lang = await getLangById(langId);
  if (lang) {
    selectedLang.value = lang.name;
    langId.value = lang._id;
  }
};
watch(
  () => props.group,
  (group, prevGroup) => {
    if (langId.value !== group.langId) getLang(group.langId);
  },
  { deep: true }
);
const langOptions = computed(() => {
  return langs !== null && langs !== undefined
    ? langs.map((group) => {
        return {
          value: group._id,
          label: group.name,
        };
      })
    : [];
});
</script>
