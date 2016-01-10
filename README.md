# rooibos

##Usage

	rooibos file1.js file2.js fileN.js
	
##Example

	angular.controller('ctrl', ctrl);

	function ctrl($scope) {
		var a = function() {};

		$scope.a = a;
	}

will output

		test.js Use a capture variable for this when using the controllerAs syntax. Choose a consistent variable name such as vm, which stands for ViewModel
			function ctrl($scope) {
			    var a = function () {
			    };


		test.js Use function declarations to hide implementation details. Keep your bindable members up top. When you need to bind a function in a controller, point it to a function declaration that appears later in the file
			function ctrl($scope) {
			    var a = function () {
			    };


		test.js Use the controllerAs syntax over the classic controller with $scope syntax
			$scope.a = a

