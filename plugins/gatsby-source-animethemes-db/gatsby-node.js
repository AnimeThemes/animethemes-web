exports.onPreInit = ({ reporter }) => reporter.info("Loaded gatsby-source-animethemes-db");

exports.createSchemaCustomization = require("./src/create-schema-customization");

exports.sourceNodes = require("./src/source-nodes");

exports.createResolvers = require("./src/create-resolvers");
