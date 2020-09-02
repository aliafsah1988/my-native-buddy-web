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

<script>
import "./style.scss";
import Field from "../Form/Field";
import Input from "../Form/Input";
import Select from "../Form/Select";
import { mapState, mapActions } from "vuex";

export default {
  name: "Group",
  components: {
    Field,
    Input,
    Select
  },
  props: {
    group: {
      type: Object,
      default() {
        return {
          name: "",
          description: ""
        };
      }
    },
    type: {
      type: String,
      default: "show"
    }
  },
  data() {
    return {
      name: "",
      description: "",
      selectedLang: "",
      options: [],
      langId: this.group ? this.group.langId : ""
    };
  },
  computed: {
    ...mapState("lang", ["langs", "lang"]),
    inputStyle: function() {
      return { "pointer-events": this.type === "show" ? "none" : "auto" };
    },
    nameError: function() {
      return !this.name || this.name.length === 0 ? "*Required" : "";
    }
  },
  mounted() {
    this.getLangs();
  },
  methods: {
    ...mapActions("lang", ["getLangs", "getLangById"]),
    onNameChange(name) {
      this.name = name;
    },
    onDescriptionChange(description) {
      this.description = description;
    },
    onSelect(option) {
      this.selectedLang = option.label;
      this.langId = option.value;
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
    group: function(val) {
      if (val) {
        this.name = val.name;
        this.description = val.description;
        this.getLang(val.langId);
      }
    },
    name: function(val) {
      this.$emit("change", {
        name: val,
        description: this.description,
        langId: this.langId
      });
    },
    description: function(val) {
      this.$emit("change", {
        name: this.name,
        description: val,
        langId: this.langId
      });
    },
    langId: function(val) {
      this.$emit("change", {
        name: this.name,
        description: this.description,
        langId: val
      });
    },
    langs: function(val) {
      if (!val || val.length < 0) return [];
      this.options = val.map(lang => {
        return {
          value: lang._id,
          label: lang.name
        };
      });
    }
  }
};
</script>
