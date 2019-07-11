import { fn } from '../config.js';
const recordBtn = document.getElementById('record');

export const audioRecord = {
	startRecordingAudio: function(socket) {
		navigator.mediaDevices.getUserMedia({ audio: true}).then((stream) => {
			const mediaRecorder = new MediaRecorder(stream);
			let audioChunks = [];

			recordBtn.addEventListener('mousedown', {
				handleEvent: startRecording,
				mediaRecorder,
				socket
			});

			recordBtn.addEventListener('mouseup', {
				handleEvent: stopRecording,
				mediaRecorder,
				socket
			});

			mediaRecorder.addEventListener("dataavailable", event => {
				audioChunks.push(event.data);
			});

			mediaRecorder.addEventListener("stop", () => {
				socket.emit('audioMessage', audioChunks);
				audioChunks = [];
				console.log('FINISH RECORDING');

				recordBtn.removeEventListener('mousedown', startRecording);
				recordBtn.removeEventListener('mouseup', stopRecording);
			});
		})
	},
}

function startRecording(mediaRecorder, socket) {
	console.log('START RECORDING');
	event.stopPropagation();
	this.mediaRecorder.start();
	this.socket.emit('recordStarted');
}

function stopRecording(mediaRecorder, socket) {
	event.stopPropagation();

	if (mediaRecorder.state != 'inactive') {
		this.mediaRecorder.stop();
	}
}

