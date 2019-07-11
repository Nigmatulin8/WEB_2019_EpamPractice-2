import { fn } from '../config.js';

export const audioStream = {
	streamAudio: function(socket) {
		socket.on('audioMessage', play);
		socket.removeListener('testComplete', play);
	}
}

function play(msg) {
	console.log('----- AUDIO PLAY -----');
    fn.audioCreate(msg).play();
}