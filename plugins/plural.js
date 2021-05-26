import Vue from "vue";
import pluralize from "pluralize";

Vue.filter("plural", value => {
  if (!value) return "";

  return pluralize(value);
});
