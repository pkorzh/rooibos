#!/usr/bin/env node
var escodegen = require('escodegen');
var traverse  = require('ast-traverse');
var esprima   = require('esprima');
var flatten   = require('flat');
var escope    = require('escope');
var chalk     = require('chalk');
var meow      = require('meow');
var pkg       = require('../package.json');
var fs        = require('fs');

var cli = meow({
	help: false,
	pkg: pkg
});

function _match(syntax, pattern) {
	return Object.keys(pattern).every(function(key) {
		var type = Object.prototype.toString.call(pattern[key]);

		if (!(key in syntax)) {
			return false;
		}

		if (type === '[object Object]') {
			if (pattern[key]._meta) {
				var _meta = pattern[key]._meta;

				return _meta.present ||
					(_meta.length && syntax[key].length === _meta.length) ||
					(_meta.values && _meta.values.indexOf(syntax[key]) !== -1) ||
					(_meta.contains && syntax[key].some(function(node) { return node.match(_meta.contains); }))
					;
			}

			return _match(syntax[key], pattern[key]);
		} else if (type === '[object Array]') {
			return pattern[key].every(function(_item, index) {
				return _match(syntax[key][index], pattern[key][index]);
			});
		} else if (syntax[key] === pattern[key]) {
			return true;
		} else {
			return false;
		}
	});
}

_registrator.patterns = [];
function _registrator(module) {
	return function(desc, ast, callback) {
		_registrator.patterns.push({
			desc: desc,
			ast: ast,
			callback: callback || function() {
				return true;
			},
			module: module
		});
	}
}

var patterns = flatten(require('require-dir')('./patterns', {recurse: true}));
Object.keys(patterns).forEach(function(module) {
	patterns[module](_registrator(module));
})

if (cli.input) {
	var file         = cli.input[0];
	var contents     = fs.readFileSync(file, 'utf8');
	var ast          = esprima.parse(contents);
	var scopeManager = escope.analyze(ast);
	var rootScope    = scopeManager.acquire(ast);

	traverse(ast, {
		pre: function(node, parent, prop, idx) {
			node.match = _match.bind(null, node);
		}
	});

	traverse(ast, {
		pre: function(node, parent, prop, idx) {
			_registrator.patterns.forEach(function(pattern) {
				if (node.match(pattern.ast)) {
					if (pattern.callback.call(null, node, parent, rootScope)) {
						var err = '\n' + chalk.grey('[' + pattern.module + '] ') + chalk.red(pattern.desc) + '\n' +
							chalk.black(escodegen.generate(node)) + '\n';

						console.error(err);
					}
				}
			})
		}
	});
}