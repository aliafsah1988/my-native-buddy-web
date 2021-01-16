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

    <Field :label="'Translation'">
      <Input
        :placeholder="'Translation ...'"
        @input="onTranslationChange"
        :initValue="translation"
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
      />
    </Field>
  </div>
</template>

<script>
import PronunciationService from "@/services/pronunciation.service";
import buttonType from "../../types/buttonType";
import { mapState, mapActions } from "vuex";
import Field from "../Form/Field";
import Input from "../Form/Input";
import Select from "../Form/Select";
import Button from "../Button";

import "./style.scss";
const pronunciationService = new PronunciationService();

export default {
  name: "Word",
  components: {
    Field,
    Input,
    Button,
    Select
  },
  props: {
    word: {
      type: Object,
      default() {
        return {
          text: "",
          description: "",
          synonyms: "",
          translation: ""
        };
      }
    },
    wordType: {
      type: String,
      default: "show"
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  mounted() {
    this.getMyGroups();
    this.getLangs();
  },
  data() {
    return {
      text: this.word !== undefined ? this.word.text : "",
      description: this.word !== undefined ? this.word.description : "",
      synonyms: this.word !== undefined ? this.word.synonyms : "",
      translation: this.word !== undefined ? this.word.translation : "",
      groupId: this.word !== undefined ? this.word.groupId : "",
      langId: this.word !== undefined ? this.word.langId : "",
      group: null,
      lang: "",
      selectedGroup: "",
      selectedLang: "",
      langOptions: [],
      groupOptions: [],
      buttonType
    };
  },
  computed: {
    ...mapState("groupList", ["groups"]),
    ...mapState("lang", ["langs"]),
    inputStyle: function() {
      return {
        "pointer-events": this.wordType === "show" ? "none" : "auto"
      };
    },
    textError: function() {
      return this.text && this.text.length === 0 ? "*Required" : "";
    }
  },
  methods: {
    ...mapActions("groupList", ["getMyGroups"]),
    ...mapActions("group", ["getGroupById"]),
    ...mapActions("lang", ["getLangs", "getLangById"]),
    play() {
      pronunciationService.play({
        text: this.text,
        langId: this.langId
      });
    },
    onSpellingChange(text) {
      this.text = text;
    },
    onDescriptionChange(description) {
      this.description = description;
    },
    onSynonymsChange(synonyms) {
      this.synonyms = synonyms;
    },
    onTranslationChange(translation) {
      this.translation = translation;
    },
    onSelectGroup(option) {
      this.group = option;
      this.selectedGroup = option.label;
      this.groupId = option.value;
    },
    onSelectLang(option) {
      this.lang = option;
      this.selectedLang = option.label;
      this.langId = option.value;
    },
    async getGroup(groupId) {
      const group = await this.getGroupById(groupId);
      if (group) {
        this.selectedGroup = group.name;
        this.groupId = group._id;
      }
    },
    async getLang(langId) {
      const lang = await this.getLangById(langId);
      if (lang) {
        this.selectedLang = lang.name;
        this.langId = lang._id;
      }
    }
  },
  watch: {
    word: function(val) {
      if (val) {
        this.text = val.text;
        this.description = val.description;
        this.synonyms = val.synonyms;
        this.translation = val.translation;
        this.getGroup(val.groupId);
        this.getLang(val.langId);
      }
    },
    text: function(val) {
      this.$emit("change", {
        text: val,
        description: this.description,
        synonyms: this.synonyms,
        translation: this.translation,
        groupId: this.groupId,
        langId: this.langId
      });
    },
    description: function(val) {
      this.$emit("change", {
        text: this.text,
        description: val,
        synonyms: this.synonyms,
        translation: this.translation,
        groupId: this.groupId,
        langId: this.langId
      });
    },
    synonyms: function(val) {
      this.$emit("change", {
        text: this.text,
        description: this.description,
        synonyms: val,
        translation: this.translation,
        groupId: this.groupId,
        langId: this.langId
      });
    },
    translation: function(val) {
      this.$emit("change", {
        text: this.text,
        description: this.description,
        synonyms: this.synonyms,
        translation: val,
        groupId: this.groupId,
        langId: this.langId
      });
    },
    groupId: function(val) {
      this.$emit("change", {
        text: this.text,
        description: this.description,
        synonyms: this.synonyms,
        translation: this.translation,
        groupId: val,
        langId: this.langId
      });
    },
    langId: function(val) {
      this.$emit("change", {
        text: this.text,
        description: this.description,
        synonyms: this.synonyms,
        translation: this.translation,
        groupId: this.groupId,
        langId: val
      });
    },
    groups: function(val) {
      if (!val || val.length < 0) return [];
      this.groupOptions = val.map(group => {
        return {
          value: group._id,
          label: group.name
        };
      });
    },
    langs: function(val) {
      if (!val || val.length < 0) return [];
      this.langOptions = val.map(lang => {
        return {
          value: lang._id,
          label: lang.name
        };
      });
    }
  }
};
</script>
