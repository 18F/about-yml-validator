/* jshint node: true */

var fs = require('fs');
var jsonSchema = require('json-schema');
var yamlJs = require('yamljs');
var referenceSchema = require('./lib/draft-04-schema.json');
var aboutSchema = require('./lib/schema.json');
var packageInfo = require('./package.json');

module.exports.versionString = function() {
  return packageInfo.name + ' v' + packageInfo.version;
};

module.exports = Validator;

/**
 * Creates an instance of Validator.
 *
 * @constructor
 * @this {Validator}
 * @param {json} schema (optional) - Schema to validate against.
 */
function Validator(schema) {
  var result;

  this.schema = schema || aboutSchema;
  delete this.schema.$schema;

  result = jsonSchema.validate(this.schema, referenceSchema);

  if (!result.valid) {
    throw new Error('JSON Schema is invalid: ', result.errors);
  }
}

/**
 * Validate against a string.
 *
 * @param {string} yamlContents - String of YML to validate
 * @returns {array} errors - Validation errors, if any. Otherwise returns nothing
 */
Validator.prototype.validate = function (yamlContents) {
  var jsonContents,
      result;

  try {
    jsonContents = yamlJs.parse(yamlContents);
  } catch (err) {
    return [err.toString()];
  }

  result = jsonSchema.validate(jsonContents, this.schema);

  if (!result.valid) {
    return result.errors;
  }
};

/**
 * Validate against a file.
 *
 * @param {string} filePath - Path to file to validate
 * @param {fn} callback - To execute after validation with results
 */
Validator.prototype.validateFile = function (filePath, callback) {
  var that = this;

  fs.readFile(filePath, 'utf8', function(err, data) {
    callback(err || that.validate(data));
  });
};
