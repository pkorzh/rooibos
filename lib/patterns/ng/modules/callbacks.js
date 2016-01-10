module.exports = function(pattern) {
	pattern('Use named functions instead of passing an anonymous function in as a callback', {
		type: 'CallExpression',
		callee: {
			type: 'MemberExpression',
			object: {
				type: 'CallExpression',
				callee: {
					type: 'MemberExpression',
					object: {
						type: 'Identifier',
						name: 'angular'
					},
					property: {
						type: 'Identifier',
						name: 'module'
					}
				},
				arguments: {
					_meta: {
						length: 1
					}
				}
			},
			property: {
				type: 'Identifier',
				name: {
					_meta: {
						values: ['controller', 'service', 'factory', 'provider', 'constant', 'value', 'directive']
					}
				}
			}
		},
		arguments: [{
			type: 'Literal'
		}, {
			type: 'FunctionExpression'
		}]
	});
};