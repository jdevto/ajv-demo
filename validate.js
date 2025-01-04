const Ajv2019 = require("ajv/dist/2019");
const addFormats = require("ajv-formats");
const fs = require("fs");
const path = require("path");

const ajv = new Ajv2019({ strict: false });

const metaSchemas = [
  "core.json",
  "applicator.json",
  "validation.json",
  "meta-data.json",
  "format.json",
  "content.json",
  "json-schema-draft-2019-09.json",
];

metaSchemas.forEach((file) => {
  const schema = JSON.parse(fs.readFileSync(path.join(__dirname, "schemas", file), "utf8"));
  if (!ajv.getSchema(schema.$id)) {
    ajv.addMetaSchema(schema);
  } else {
    console.log(`Meta-schema "${schema.$id}" already added. Skipping.`);
  }
});

addFormats(ajv);

const schema = {
  $schema: "https://json-schema.org/draft/2019-09/schema",
  type: "object",
  properties: {
    name: { type: "string" },
    age: { type: "integer", minimum: 0 },
  },
  required: ["name", "age"],
};

const validData = { name: "Alice", age: 25 };
const invalidData = { name: "Bob", age: -5 };

try {
  const validate = ajv.compile(schema);

  [validData, invalidData].forEach((data, index) => {
    if (validate(data)) {
      console.log(`✅ Validation succeeded for sample ${index + 1}.`);
    } else {
      console.error(`❌ Validation failed for sample ${index + 1}:`);
      console.error(validate.errors);
    }
  });
} catch (error) {
  console.error("❌ Error compiling schema:", error.message);
}
