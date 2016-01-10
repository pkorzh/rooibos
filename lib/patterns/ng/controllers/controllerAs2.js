module.exports = function(pattern) {
	pattern('Use a capture variable for this when using the controllerAs syntax. ' + 
			'Choose a consistent variable name such as vm, which stands for ViewModel', {
		type: 'CallExpression',
		callee: {
			type: 'MemberExpression',
			object: {
				_meta: {
					present: true
				}
			},
			property: {
				type: 'Identifier',
				name: 'controller'
			}
		},
		arguments: {
			_meta: {
				present: true
			}
		}
	}, function(node, parent, rootScope) {
		var controller = node.arguments[1].name,
			controllerNode;

		var scopeVariables = rootScope.variables.filter(function(variable) {
			return variable.name === controller;
		})

		if (scopeVariables.length && scopeVariables[0].defs.length) {
			controllerNode = scopeVariables[0].defs[0].node;
		} else {
			return false;
		}

		return controllerNode.match({
			type: 'FunctionDeclaration',
			body: {
				type: 'BlockStatement',
				body: {
					_meta: {
						contains: {
							type: 'VariableDeclaration',
							declarations: {
								_meta: {
									contains: {
										type: 'VariableDeclarator',
										id: {
											type: 'Identifier',
										},
										init: {
											type: 'ThisExpression'
										}
									}
								}
							}
						}
					}
				}
			}
		});
	});
};