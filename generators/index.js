'use strict';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _promise = _interopRequireDefault(require("@babel/runtime/core-js/promise"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf3 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _yeomanGenerator = require("yeoman-generator");

var _chalk = _interopRequireDefault(require("chalk"));

var _yosay = _interopRequireDefault(require("yosay"));

var _mkdirp = _interopRequireDefault(require("mkdirp"));

var _lodash = _interopRequireDefault(require("lodash.camelcase"));

var _lodash2 = _interopRequireDefault(require("lodash.kebabcase"));

var _lodash3 = _interopRequireDefault(require("lodash.trim"));

var _child_process = require("child_process");

var _gitConfig = _interopRequireDefault(require("git-config"));

module.exports =
/*#__PURE__*/
function (_Base) {
  (0, _inherits2.default)(GeneratorBabelWebpack, _Base);

  function GeneratorBabelWebpack() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, GeneratorBabelWebpack);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(GeneratorBabelWebpack)).call.apply(_getPrototypeOf2, [this].concat(args)));
    _this.pkg = require('../package.json');
    return _this;
  }

  (0, _createClass2.default)(GeneratorBabelWebpack, [{
    key: "exec",
    value: function exec(cmd) {
      return new _promise.default(function (resolve, reject) {
        (0, _child_process.exec)(cmd, function (error, stdout, stderr) {
          if (error) {
            return reject(error);
          }

          if (stderr) {
            return reject(stderr);
          }

          return resolve(stdout);
        });
      });
    }
  }, {
    key: "prompting",
    value: function prompting() {
      var _this2 = this;

      var done = this.async();
      this.log((0, _yosay.default)("Welcome to the ".concat(_chalk.default.red('Babel Webpack Library'), " generator!")));
      this.exec('npm whoami').then(function (username) {
        _this2.username = (0, _lodash3.default)(username || '');

        _this2._showPrompts(done);
      }).catch(function (error) {
        return console.error('Error getting npm user name: run `npm login`\n', error);
      });
    }
  }, {
    key: "_showPrompts",
    value: function _showPrompts(done) {
      var _this3 = this;

      var config = _gitConfig.default.sync();

      config.user = config.user || {};
      var prompts = [{
        type: 'input',
        name: 'user',
        message: 'What is the Github username/organization for this project?',
        default: this.username,
        store: true
      }, {
        type: 'input',
        name: 'repo',
        message: 'What is the repository/project name?',
        default: (0, _lodash2.default)(this.appname)
      }, {
        type: 'input',
        name: 'description',
        message: 'What is a short description for this project?'
      }, {
        type: 'input',
        name: 'author',
        message: 'Who is the author of this project?',
        default: config.user.name + ' <' + config.user.email + '>',
        store: true
      }, {
        type: 'input',
        name: 'variable',
        message: 'What is the name of this project\'s main variable?',
        default: (0, _lodash.default)(this.appname)
      }];
      this.prompt(prompts, function (props) {
        _this3.user = props.user;
        _this3.repo = props.repo;
        _this3.description = props.description;
        _this3.author = props.author;
        _this3.variable = props.variable;
        _this3.year = new Date().getFullYear();
        done();
      });
    }
  }, {
    key: "writing",
    value: function writing() {
      this.template('babelrc', '.babelrc');
      this.template('bowerrc', '.bowerrc');
      this.template('eslintrc', '.eslintrc');
      this.template('eslintignore', '.eslintignore');
      this.template('editorconfig', '.editorconfig');
      this.template('gitignore', '.gitignore');
      this.template('travis.yml', '.travis.yml');
      this.template('istanbul.yml', '.istanbul.yml');
      this.template('_bower.json', 'bower.json');
      this.template('_package.json', 'package.json');
      this.template('_karma.conf.js', 'karma.conf.js');
      this.template('_LICENSE', 'LICENSE');
      this.template('_README.md', 'README.md');
      this.template('_CHANGELOG.md', 'CHANGELOG.md');

      _mkdirp.default.sync('src');

      this.template('src', 'src');

      _mkdirp.default.sync('test');

      this.template('test/*.js', 'test');
      this.template('test/eslintrc', 'test/.eslintrc');
      this.template('test/_mocha.opts', 'test/mocha.opts');

      _mkdirp.default.sync('webpack');

      this.template('webpack/_webpack.config.base.js', 'webpack/webpack.config.base.js');
      this.template('webpack/_webpack.config.development.js', 'webpack/webpack.config.development.js');
      this.template('webpack/_webpack.config.production.js', 'webpack/webpack.config.production.js');
    }
  }, {
    key: "install",
    value: function install() {
      this.installDependencies({
        bower: false,
        npm: true,
        skipInstall: this.options['skip-install']
      });
    }
  }]);
  return GeneratorBabelWebpack;
}(_yeomanGenerator.Base);
//# sourceMappingURL=index.js.map