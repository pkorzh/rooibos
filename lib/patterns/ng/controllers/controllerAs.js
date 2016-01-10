module.exports = function(pattern) {
	pattern('Use the controllerAs syntax over the classic controller with $scope syntax', {
		type: 'AssignmentExpression',
		operator: '=',
		left: {
			type: 'MemberExpression',
			object: {
				type: 'Identifier',
				name: '$scope'
			},
			property: {
				_meta: {
					present: true
				}
			}
		},
		right: {
			_meta: {
				present: true
			}
		}
	});
};