/* jshint node: true */

var fs = require('fs');
var jsonSchema = require('json-schema');
var jsYaml = require('js-yaml');
var referenceSchema = require('./draft-04-schema.json');

module.exports = Validator;

function Validator(schema) {
  var result;

  this.schema = JSON.parse(schema);
  delete this.schema.$schema;

  result = jsonSchema.validate(this.schema, referenceSchema);

  if (!result.valid) {
    throw new Error('JSON Schema is invalid: ', result.errors);
  }
}

Validator.prototype.validate = function (yamlContents) {
  var jsonContents,
      result;

  try {
    jsonContents = jsYaml.safeLoad(yamlContents);
  } catch (err) {
    return [err.toString()];
  }

  result = jsonSchema.validate(jsonContents, this.schema);

  if (!result.valid) {
    return result.errors;
  }
};

Validator.prototype.validateFile = function (filePath, callback) {
  var that = this;

  fs.readFile(filePath, 'utf8', function(err, data) {
    callback(err || that.validate(data));
  });
};
