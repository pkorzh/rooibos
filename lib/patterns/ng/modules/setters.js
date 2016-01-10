module.exports = function(pattern) {
	pattern('Declare modules without a variable using the setter syntax', {
		type: 'VariableDeclaration',
		declarations: [{
			type: 'VariableDeclarator',
			id: {
				type: 'Identifier'
			},
			init: {
				type: 'CallExpression',
				callee: {
					type: 'MemberExpression',
					computed: false,
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
						length: 2
					}
				}
			}
		}],
		kind: 'var'
	});
};