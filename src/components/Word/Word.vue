<template>
  <div class="word-container">
    <Field :label="'Spelling'" :error="textError" class="text-container">
      <Input
        :placeholder="'Your Word Here...'"
        @input="onSpellingChange"
        :error="textError"
        :initValue="word.text"
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
        :initValue="word.translation"
        :disabled="disabled"
      />
    </Field>

    <Field :label="'Description'">
      <Input
        :placeholder="'Description ...'"
        @input="onDescriptionChange"
        :initValue="word.description"
        :disabled="disabled"
      />
    </Field>

    <Field :label="'Synonyms'">
      <Input
        :placeholder="'Synonyms ...'"
        @input="onSynonymsChange"
        :initValue="word.synonyms"
        :disabled="disabled"
      />
    </Field>
  </div>
</template>

<script setup lang="ts">
import { defineProps, ref, computed, onMounted, reactive, watch } from "vue";
import "./style.scss";
import buttonType from "../../../_old/src/types/buttonType";
import PronunciationService from "../../../_old/src/services/pronunciation.service";
import Field from "../Form/Field/Field.vue";
import Input from "../Form/Input/Input.vue";
import Select from "../Form/Select/Select.vue";
import Button from "../Button/Button.vue";
import { useGroupListStore } from "../../stores/groupList";
import { useLangStore } from "../../stores/lang";
import { useGroupStore } from "../../stores/group";

const emit = defineEmits(["change"]);

const props = defineProps({
  word: {
    type: Object,
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
const { groups, getMyGroups } = useGroupListStore();
const { langs, getLangById, getLangs } = useLangStore();
const { getGroupById } = useGroupStore();
watch(
  () => props.word.value,
  (word, prevWord) => {
    getGroup(word.groupId);
    getLang(word.langId);
  }
);

const pronunciationService = new PronunciationService();

const synonyms = ref<string>(
  props.word.value !== undefined ? props.word.value.synonyms : ""
);
const translation = ref<string>(
  props.word.value !== undefined ? props.word.value.translation : ""
);

onMounted(() => {
  getMyGroups();
  getLangs();
});

const groupId = ref<string>(props.word !== undefined ? props.word.groupId : "");
const langId = ref<string>(props.word !== undefined ? props.word.langId : "");
const group = reactive<any>(null);
const lang = ref<string>("");
const selectedGroup = ref<string>("");
const selectedLang = ref<string>("");
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
const groupOptions = computed(() => {
  return groups.map((group) => {
    return {
      value: group._id,
      label: group.name,
    };
  });
});
const inputStyle = computed(() => {
  return {
    "pointer-events": props.wordType === "show" ? "none" : "auto",
  };
});
const textError = computed(() => {
  return props.word.value !== undefined &&
    props.word.value.text &&
    props.word.value.length === 0
    ? "*Required"
    : "";
});
const play = () => {
  pronunciationService.play({
    text: props.word.value.text,
    langId: langId,
  });
};
const onSpellingChange = (input) => {
  emit("change", {
    text: input,
    description: props.word.value.description,
    synonyms: props.word.value.synonyms,
    translation: props.word.value.translation,
    groupId: groupId.value,
    langId: langId.value,
  });
};
const onDescriptionChange = (input) => {
  emit("change", {
    text: props.word.valu.text,
    description: input,
    synonyms: props.word.value.synonyms,
    translation: props.word.value.translation,
    groupId: groupId.value,
    langId: langId.value,
  });
};
const onSynonymsChange = (input) => {
  synonyms.value = input;
  emit("change", {
    text: props.word.value.text,
    description: props.word.value.description,
    synonyms: input,
    translation: props.word.value.translation,
    groupId: groupId.value,
    langId: langId.value,
  });
};
const onTranslationChange = (input) => {
  translation.value = input;
  emit("change", {
    text: props.word.value.text,
    description: props.word.value.description,
    synonyms: props.word.value.synonyms,
    translation: input,
    groupId: groupId.value,
    langId: langId.value,
  });
};
const onSelectGroup = (option) => {
  group.value = option;
  selectedGroup.value = option.label;
  groupId.value = option.value;
  emit("change", {
    text: props.word.value.text,
    description: props.word.value.description,
    synonyms: props.word.value.synonyms,
    translation: props.word.value.translation,
    groupId: option.value,
    langId: langId.value,
  });
};
const onSelectLang = (option) => {
  lang.value = option;
  selectedLang.value = option.label;
  langId.value = option.value;
  emit("change", {
    text: props.word.value.text,
    description: props.word.value.description,
    synonyms: props.word.value.synonyms,
    translation: props.word.value.translation,
    groupId: groupId.value,
    langId: option.value,
  });
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
