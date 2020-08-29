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
  </div>
</template>

<script>
import "./style.scss";
import Field from "../Form/Field";
import Input from "../Form/Input";

export default {
  name: "Group",
  components: {
    Field,
    Input
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
      description: ""
    };
  },
  computed: {
    inputStyle: function() {
      return { "pointer-events": this.type === "show" ? "none" : "auto" };
    },
    nameError: function() {
      return !this.name || this.name.length === 0 ? "*Required" : "";
    }
  },
  methods: {
    onNameChange(name) {
      this.name = name;
    },
    onDescriptionChange(description) {
      this.description = description;
    }
  },
  watch: {
    group: function(val) {
      if (val) {
        this.name = val.name;
        this.description = val.description;
      }
    },
    name: function(val) {
      this.$emit("change", {
        name: val,
        description: this.description
      });
    },
    description: function(val) {
      this.$emit("change", {
        name: this.name,
        description: val
      });
    }
  }
};
</script>
