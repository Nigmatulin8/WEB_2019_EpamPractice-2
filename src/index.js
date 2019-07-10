import './styles.scss';
import Router from './comp/Router.js';
import Route from './comp/Route.js';
import io from 'socket.io-client';

main();

async function main() {
	await init();

	const socket = io('https://voicy-speaker.herokuapp.com/');
	let stream = await navigator.mediaDevices.getUserMedia({ audio: true});
	const mediaRecorder = new MediaRecorder(stream);
	let audioChunks = [];

	socket.on('connect', () => {
		console.log('CONNECTED');
	});

	addMultiListener(window, 'mousedown touchstart', event => {
		let type = event.target.dataset['set']; //list, microphone, stream;
		event.stopPropagation();

		if (type === 'microphone') {
			mediaRecorder.start();
			socket.emit('recordStarted');
		}
	});

	addMultiListener(window, 'mouseup touchend', event => {
		event.stopPropagation();
		if (mediaRecorder.state != 'inactive') {
			mediaRecorder.stop();
		}
	});

	mediaRecorder.addEventListener("dataavailable", event => {
		audioChunks.push(event.data);
	});

	mediaRecorder.addEventListener("stop", () => {
		socket.emit('audioMessage', audioChunks);
		audioChunks = [];
	});


	socket.on('audioMessage', message => {
		window.addEventListener('click', event => {
			if(event.target.dataset['set'] == 'stream') {
				audioPlay(message).play();
			}
		});
	});
}

function init() {
    new Router([
        new Route('microphone', '../views/microphone.html', true),
		new Route('voices', '../views/voices.html'),
	    new Route('streaming', '../views/streaming.html')
	]);
}

const sleep = time => new Promise(resolve => setTimeout(resolve, time));

function addMultiListener(element, eventNames, listener) {
	let events = eventNames.split(' ');

	for (let i = 0; i < events.length; i++) {
		element.addEventListener(events[i], listener, false);
  	}
}

function audioPlay(blob) {
	const audioBlob = new Blob(blob);
	const audioUrl = URL.createObjectURL(audioBlob);
	return new Audio(audioUrl);
}

    // fetch('https://voicy-speaker.herokuapp.com/voices').then(resp => {
    //  	return resp.json();
    // }).then(data => {
    // 	console.log(data);
    // });