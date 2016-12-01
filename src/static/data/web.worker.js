onmessage = function(data) {
	postMessage('worker received: ' + data.data);
};
