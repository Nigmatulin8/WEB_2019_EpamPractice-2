export const url = {
	MIC_URL: '../views/microphone.html',
	VOICE_URL: '../views/voices.html',
	STREAM_URL: '../views/streaming.html',
	SERVER_URL: 'https://voicy-speaker.herokuapp.com/',
	SERVER_API_URL: 'https://voicy-speaker.herokuapp.com/voices'
};

export const fn = {
	sleep: time => {
		new Promise(resolve =>
			setTimeout(resolve, time));
	},

	addMultiListener: function(element, eventNames, listener) {
		let events = eventNames.split(' ');

		for (let i = 0; i < events.length; i++) {
			element.addEventListener(events[i], listener, false);
	  	}
	 },

	 removeMultiListener: function(element, eventNames, listener) {
		let events = eventNames.split(' ');

		for (let i = 0; i < events.length; i++) {
			element.removeEventListener(events[i], listener, false);
	  	}
	 },

	 audioCreate: function(blob) {
	 	const audioBlob = new Blob(blob);
		const audioUrl = URL.createObjectURL(audioBlob);
		return new Audio(audioUrl);
	 }
}