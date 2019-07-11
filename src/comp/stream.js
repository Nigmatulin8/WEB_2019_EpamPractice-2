export function initAudio(socket) {
	console.log(10000);
	socket.on('audioMessage', function (audioChunks) {
		console.log(1111);
        const audioBlob = new Blob(audioChunks);
        const audioUrl = URL.createObjectURL(audioBlob);
        const audio = new Audio(audioUrl);
        audio.play();
    });
}

// import { fn } from '../config.js';

// export const audioStream = {
// 	streamAudio: function(socket) {
// 		socket.on('audioMessage', play);
// 		socket.removeListener('testComplete', play);
// 	}
// }

// function play(msg) {
// 	console.log('----- AUDIO PLAY -----');
//     fn.audioCreate(msg).play();
// }


