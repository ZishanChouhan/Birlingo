import HashExtension from "../../components/HashExtension";

export let ModuleString = {};

const UpdateString = response => {
  return HashExtension.merge(ModuleString, response);
};

module.exports = {
  ...ModuleString,
  UpdateString
};
