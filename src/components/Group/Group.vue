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
        :options="options"
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
const name = ref<string>("");
const description = ref<string>("");
const selectedLang = ref<string>("");
const option = reactive<any>([]);
const langId = ref<string>(props.group ? props.group.langId : "");
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
const onNameChange = (name) => {
  name.value = name;
};
const onDescriptionChange = (description) => {
  description.value = description;
};
const onSelect = (option) => {
  selectedLang.value = option.label;
  langId.value = option.value;
};
const getLang = async (langId) => {
  const lang = await getLangById(langId);
  if (lang) {
    selectedLang.value = lang.name;
    langId.value = lang._id;
  }
};
</script>
