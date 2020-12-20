module.exports = function (plop) {
  plop.setPartial("name", "{{pascalCase name}}");

  // controller generator
  plop.setGenerator("component", {
    description: "ReactJS component",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "Enter a component name",
      },
    ],
    actions: [
      {
        type: "addMany",
        base: "plop-templates/component",
        templateFiles: "plop-templates/component/**/*",
        destination: "src/components/{{name}}/",
      },
    ],
  });

  plop.setGenerator("page", {
    description: "ReactJS page",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "Enter a page name (NamePage)",
      },
    ],
    actions: [
      {
        type: "addMany",
        base: "plop-templates/page",
        templateFiles: "plop-templates/page/**/*",
        destination: "src/pages/{{name}}/",
      },
    ],
  });

  plop.setGenerator("modal", {
    description: "ReactJS modal",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "Enter a modal name (NameModal)",
      },
    ],
    actions: [
      {
        type: "addMany",
        base: "plop-templates/modal",
        templateFiles: "plop-templates/modal/**/*",
        destination: "src/modals/{{name}}/",
      },
    ],
  });

  plop.setGenerator("icon", {
    description: "ReactJS icon",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "Enter a modal name (NameIcon)",
      },
    ],
    actions: [
      {
        type: "addMany",
        base: "plop-templates/icon",
        templateFiles: "plop-templates/icon/**/*",
        destination: "src/components/icons/",
      },
    ],
  });
};
