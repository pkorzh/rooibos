module.exports = function(pattern) {
	pattern('Use function declarations to hide implementation details. Keep your bindable members up top. When you need to bind a function in a controller, point it to a function declaration that appears later in the file', {
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
		var controller     = node.arguments[1].name;

		var controllerNode = rootScope.variables.filter(function(variable) {
			return variable.name === controller;
		})[0].defs[0].node;

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
											type: 'FunctionExpression'
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