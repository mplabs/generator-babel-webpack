'use strict';
import { Base } from 'yeoman-generator';
import chalk from 'chalk';
import yosay from 'yosay';
import mkdirp from 'mkdirp';
import camelcase from 'lodash.camelcase';
import kebabcase from 'lodash.kebabcase';
import trim from 'lodash.trim';
import { exec }  from 'child_process';
import gitConfig from 'git-config';

module.exports = class GeneratorBabelWebpack extends Base {
  constructor(...args) {
    super(...args);
    this.pkg = require('../package.json');
  }

  exec(cmd) {
    return new Promise((resolve, reject) => {
      exec(cmd, (error, stdout, stderr)=> {
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

  prompting() {
    const done = this.async();
    this.log(yosay(`Welcome to the ${chalk.red('Babel Webpack Library')} generator!`));
    this.exec('npm whoami')
      .then(username => {
        this.username = trim(username || '');
        this._showPrompts(done);
      })
      .catch(error => console.error('Error getting npm user name: run `npm login`\n', error));
  }

  _showPrompts(done) {
    const config = gitConfig.sync();
    config.user = config.user || {};
    const prompts = [
      {
        type: 'input',
        name: 'user',
        message: 'What is the Github username/organization for this project?',
        default: this.username,
        store: true
      },
      {
        type: 'input',
        name: 'repo',
        message: 'What is the repository/project name?',
        default: kebabcase(this.appname)
      },
      {
        type: 'input',
        name: 'description',
        message: 'What is a short description for this project?'
      },
      {
        type: 'input',
        name: 'author',
        message: 'Who is the author of this project?',
        default: config.user.name + ' <' + config.user.email + '>',
        store: true
      },
      {
        type: 'input',
        name: 'variable',
        message: 'What is the name of this project\'s main variable?',
        default: camelcase(this.appname)
      }
    ];

    this.prompt(prompts, props => {
      this.user = props.user;
      this.repo = props.repo;
      this.description = props.description;
      this.author = props.author;
      this.variable = props.variable;
      this.year = new Date().getFullYear();
      done();
    });
  }

  writing() {
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
    mkdirp.sync('src');
    this.template('src', 'src');
    mkdirp.sync('test');
    this.template('test/*.js', 'test');
    this.template('test/eslintrc', 'test/.eslintrc');
    this.template('test/_mocha.opts', 'test/mocha.opts');
    mkdirp.sync('webpack');
    this.template('webpack/_webpack.config.base.js', 'webpack/webpack.config.base.js');
    this.template('webpack/_webpack.config.development.js', 'webpack/webpack.config.development.js');
    this.template('webpack/_webpack.config.production.js', 'webpack/webpack.config.production.js');
  }

  install() {
    this.installDependencies({
      bower: false,
      npm: true,
      skipInstall: this.options['skip-install']
    });
  }
};
