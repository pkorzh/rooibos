module.exports = function(pattern) {
	pattern('Possible forgotten debug statement', {
		type: 'DebuggerStatement'
	});
};