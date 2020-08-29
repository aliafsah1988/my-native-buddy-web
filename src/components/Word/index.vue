<template>
  <div class="word-container">
    <Field :label="'Spelling'" :error="textError" class="text-container">
      <Input
        :placeholder="'Your Word Here...'"
        @input="onSpellingChange"
        :error="textError"
        :initValue="text"
      />
      <Button @click="play" :text="'Play'" :theme="buttonType.BRAND_DARK" />
    </Field>

    <Field :label="'Description'">
      <Input
        :placeholder="'Description ...'"
        @input="onDescriptionChange"
        :initValue="description"
      />
    </Field>

    <Field :label="'Synonyms'">
      <Input
        :placeholder="'Synonyms ...'"
        @input="onSynonymsChange"
        :initValue="synonyms"
      />
    </Field>

    <Field :label="'Translation'">
      <Input
        :placeholder="'Translation ...'"
        @input="onTranslationChange"
        :initValue="translation"
      />
    </Field>

    <Field :label="'Group'">
      <Select
        :placeholder="'Choose a Group ...'"
        :value="selectedGroup"
        :options="options"
        :showClose="true"
        @select="onSelect"
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
    type: {
      type: String,
      default: "show"
    }
  },
  mounted() {
    this.getMyGroups();
  },
  data() {
    return {
      text: this.word !== undefined ? this.word.text : "",
      description: this.word !== undefined ? this.word.description : "",
      synonyms: this.word !== undefined ? this.word.synonyms : "",
      translation: this.word !== undefined ? this.word.translation : "",
      groupId: this.word !== undefined ? this.word.groupId : "",
      group: null,
      selectedGroup: "",
      options: [],
      buttonType
    };
  },
  computed: {
    ...mapState("groupList", ["groups"]),
    inputStyle: function() {
      return { "pointer-events": this.type === "show" ? "none" : "auto" };
    },
    textError: function() {
      return this.text.length === 0 ? "*Required" : "";
    }
  },
  methods: {
    ...mapActions("groupList", ["getMyGroups"]),
    ...mapActions("group", ["getGroupById"]),
    play() {
      pronunciationService.play(this.text);
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
    onSelect(option) {
      this.group = option;
      this.selectedGroup = option.label;
      this.groupId = option.value;
    },
    async getGroup(groupId) {
      const group = await this.getGroupById(groupId);
      if (group) {
        this.selectedGroup = group.name;
        this.groupId = group._id;
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
      }
    },
    text: function(val) {
      this.$emit("change", {
        text: val,
        description: this.description,
        synonyms: this.synonyms,
        translation: this.translation,
        groupId: this.groupId
      });
    },
    description: function(val) {
      this.$emit("change", {
        text: this.text,
        description: val,
        synonyms: this.synonyms,
        translation: this.translation,
        groupId: this.groupId
      });
    },
    synonyms: function(val) {
      this.$emit("change", {
        text: this.text,
        description: this.description,
        synonyms: val,
        translation: this.translation,
        groupId: this.groupId
      });
    },
    translation: function(val) {
      this.$emit("change", {
        text: this.text,
        description: this.description,
        synonyms: this.synonyms,
        translation: val,
        groupId: this.groupId
      });
    },
    groupId: function(val) {
      this.$emit("change", {
        text: this.text,
        description: this.description,
        synonyms: this.synonyms,
        translation: this.translation,
        groupId: val
      });
    },
    groups: function(val) {
      if (!val || val.length < 0) return [];
      this.options = val.map(group => {
        return {
          value: group._id,
          label: group.name
        };
      });
    }
  }
};
</script>
