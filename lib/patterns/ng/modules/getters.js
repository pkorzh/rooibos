module.exports = function(pattern) {
	pattern('When using a module, avoid using a variable and instead use chaining with the getter syntax', {
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
						length: 1
					}
				}
			}
		}],
		kind: 'var'
	});
};