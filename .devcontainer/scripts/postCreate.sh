#!/bin/bash

# echo "Installing action dependencies..."
npm init -y
npm install ajv ajv-formats
npm pkg set type=commonjs

mkdir -p schemas
curl -o schemas/json-schema-draft-2019-09.json https://json-schema.org/draft/2019-09/schema
curl -o schemas/core.json https://json-schema.org/draft/2019-09/meta/core
curl -o schemas/applicator.json https://json-schema.org/draft/2019-09/meta/applicator
curl -o schemas/validation.json https://json-schema.org/draft/2019-09/meta/validation
curl -o schemas/meta-data.json https://json-schema.org/draft/2019-09/meta/meta-data
curl -o schemas/format.json https://json-schema.org/draft/2019-09/meta/format
curl -o schemas/content.json https://json-schema.org/draft/2019-09/meta/content
