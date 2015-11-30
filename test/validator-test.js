/* jshint node: true */
/* jshint expr: true */
/* jshint mocha: true */
'use strict';

var fs = require('fs');
var path = require('path');
var jsYaml = require('js-yaml');
var Validator = require(
  path.resolve(path.dirname(__dirname), 'index.js'));
var aboutYmlPath =
    path.resolve(path.dirname(__dirname), '.about.yml');
var schemaPath =
    path.resolve(path.dirname(__dirname), 'lib', 'schema.json');
var chai = require('chai');
var expect = chai.expect;
chai.should();

function check(done, cb) {
  return function(err) { try { cb(err); done(); } catch (e) { done(e); } };
}

describe('validate', function() {
  var aboutYmlData,
      validator;

  beforeEach(function() {
    validator = new Validator(fs.readFileSync(schemaPath, 'utf8'));
    aboutYmlData = fs.readFileSync(aboutYmlPath, 'utf8');
  });

  it('should return an error if the JSON schema is invalid or incomplete',
    function() {
      var jsonSchema = JSON.stringify('garbage'),
          testValidator;

      expect(function() { testValidator = new Validator(jsonSchema); })
        .to.throw('JSON Schema is invalid:');
  });

  it('should return an array of errors if the YAML fails to parse',
    function() {
      var yamlContents = 'lyric: watch out boy: she\'ll chew you up!',
          results = validator.validate(yamlContents);

      expect(results).to.not.be.empty;
      expect(results[0]).to.have.string('YAMLException');
  });

  it('should return nothing if the YAML content is valid', function() {
    var results = validator.validate(aboutYmlData);

    expect(results).to.be.undefined;
  });

  it('should return an array of errors if the YAML content is invalid',
    function() {
      var aboutYmlDataBogus,
          results;

      aboutYmlDataBogus = jsYaml.safeLoad(aboutYmlData);
      aboutYmlDataBogus.contact = 'bogus';
      results = validator.validate(jsYaml.safeDump(aboutYmlDataBogus));

      expect(results).to.eql([{
          'property': 'contact',
          'message': 'string value found, but a array is required'
      }]);
  });
});

describe('validateFile', function() {
  var validator;

  beforeEach(function() {
    validator = new Validator(fs.readFileSync(schemaPath, 'utf8'));
  });

  it('should pass an error to the callback method if the file read fails',
    function(done) {
      var invalidFilePath = '/dev/null/fail';

      validator.validateFile(invalidFilePath, check(done, function(err) {
        expect(err).to.not.be.undefined;
        expect(err.message).to.have.string(
            'ENOTDIR: not a directory, open \'/dev/null/fail\''
        );
      }));
  });

  it('should throw an error if the file contents are invalid',
    function(done) {
      validator.validateFile(__filename, check(done, function(err) {
        expect(err).to.not.be.empty;
        expect(err[0]).to.have.string('YAMLException');
      }));
  });

  it('should not return anything if the file validates successfully',
    function(done) {
      validator.validateFile(aboutYmlPath, check(done, function(err) {
        expect(err).to.be.undefined;
      }));
  });
});
