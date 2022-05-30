<template>
  <div class="word-container">
    <Field :label="'Spelling'" :error="textError" class="text-container">
      <Input
        :placeholder="'Your Word Here...'"
        @input="onSpellingChange"
        :error="textError"
        :initValue="text"
        :disabled="disabled"
      />
      <Button @click="play" :text="'Play'" :theme="buttonType.BRAND_DARK" />
    </Field>

    <Field :label="'Language'">
      <Select
        :placeholder="'Choose a Language ...'"
        :value="selectedLang"
        :options="langOptions"
        :showClose="true"
        @select="onSelectLang"
        :disabled="disabled"
      />
    </Field>

    <Field :label="'Group'">
      <Select
        :placeholder="'Choose a Group ...'"
        :value="selectedGroup"
        :options="groupOptions"
        :showClose="true"
        @select="onSelectGroup"
        :disabled="disabled"
      />
    </Field>

    <Field :label="'Translation'">
      <Input
        :placeholder="'Translation ...'"
        @input="onTranslationChange"
        :initValue="translation"
        :disabled="disabled"
      />
    </Field>

    <Field :label="'Description'">
      <Input
        :placeholder="'Description ...'"
        @input="onDescriptionChange"
        :initValue="description"
        :disabled="disabled"
      />
    </Field>

    <Field :label="'Synonyms'">
      <Input
        :placeholder="'Synonyms ...'"
        @input="onSynonymsChange"
        :initValue="synonyms"
        :disabled="disabled"
      />
    </Field>
  </div>
</template>

<script setup lang="ts">
import { defineProps, ref, computed } from "vue";
import { reactive } from "vue";
import "./style.scss";
import buttonType from "../../../_old/src/types/buttonType";
import PronunciationService from "../../../_old/src/services/pronunciation.service";
import Field from "../Form/Field/Field.vue";
import Input from "../Form/Input/Input.vue";
import Select from "../Form/Select/Select.vue";
import Button from "../Button/Button.vue";

const props = defineProps({
  word: {
    type: Object,
    default() {
      return {
        text: "",
        description: "",
        synonyms: "",
        translation: "",
      };
    },
  },
  wordType: {
    type: String,
    default: "show",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});
const pronunciationService = new PronunciationService();
const text = ref<string>(props.word !== undefined ? props.word.text : "");
const description = ref<string>(
  props.word !== undefined ? props.word.description : ""
);
const synonyms = ref<string>(
  props.word !== undefined ? props.word.synonyms : ""
);
const translation = ref<string>(
  props.word !== undefined ? props.word.translation : ""
);
const groupId = ref<string>(props.word !== undefined ? props.word.groupId : "");
const langId = ref<string>(props.word !== undefined ? props.word.langId : "");
const group = reactive<any>(null);
const lang = ref<string>("");
const selectedGroup = ref<string>("");
const selectedLang = ref<string>("");
const langOptions = reactive<any[]>([]);
const groupOptions = reactive<any[]>([]);
const inputStyle = computed(() => {
  return {
    "pointer-events": props.wordType === "show" ? "none" : "auto",
  };
});
const textError = computed(() => {
  return text.value && text.value.length === 0 ? "*Required" : "";
});
const play = () => {
  pronunciationService.play({
    text: text,
    langId: langId,
  });
};
const onSpellingChange = (text) => {
  text.value = text;
};
const onDescriptionChange = (description) => {
  description.value = description;
};
const onSynonymsChange = (synonyms) => {
  synonyms.value = synonyms;
};
const onTranslationChange = (translation) => {
  translation.value = translation;
};
const onSelectGroup = (option) => {
  group.value = option;
  selectedGroup.value = option.label;
  groupId.value = option.value;
};
const onSelectLang = (option) => {
  lang.value = option;
  selectedLang.value = option.label;
  langId.value = option.value;
};
const getGroup = async (groupId) => {
  const group = await getGroupById(groupId);
  if (group) {
    selectedGroup.value = group.name;
    groupId = group._id;
  }
};
const getLang = async (langId) => {
  const lang = await getLangById(langId);
  if (lang) {
    selectedLang.value = lang.name;
    langId = lang._id;
  }
};
</script>
