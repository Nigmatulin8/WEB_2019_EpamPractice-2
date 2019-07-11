import './styles.scss';
import Router from './comp/Router.js';
import Route from './comp/Route.js';
import io from 'socket.io-client';
import { url, fn } from './config.js';
import { audioRecord } from './comp/record.js';
import { audioStream } from './comp/stream.js';
import { audioList } from './comp/audioList.js';

const socket = io(url.SERVER_URL);
new Router([
	new Route('microphone', url.MIC_URL, true),
	new Route('voices', url.VOICE_URL),
	new Route('streaming', url.STREAM_URL)
]);

socket.on('connect', () => console.log('CONNECTED'));

window.onload = main;

function  main() {
	const navMenu = document.getElementById('nav');
	const mainApp = document.getElementById('app');

	const observer = new MutationObserver(function(mutations) {
		mutations.forEach(function(mutation) {
			let nodeID = mutation.addedNodes[0].id //microphoneNode streamNode audioList

			switch(nodeID) {
				case 'microphoneNode' :
					audioRecord.startRecordingAudio(socket);
					break;
				case 'streamNode' :
					audioStream.streamAudio(socket);
					break;
				case 'audioList' :
					audioList.getAudioList();
					break
			}
		});
	});

	const config = { childList: true };
	observer.observe(mainApp, config);
}

	//console.log(fetchInject(['./comp/audioList.js']));
	//let hash = window.location.hash.substr(1); //voices, microphone, stream