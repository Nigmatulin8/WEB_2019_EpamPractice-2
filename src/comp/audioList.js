import { url, fn } from '../config.js';

export const audioList = {
	getAudioList: function() {
		fetch(url.SERVER_API_URL).then(response => {
			return response.json();
		}).then(async data => {
			let childNode = document.getElementById('childNode');
			let audioDiv = document.getElementById('audioList');

			let nodes = await this._getAudioList(data);

			audioDiv.removeChild(childNode);
			audioDiv.appendChild(nodes);
		});
	},

	_getAudioList: async function(dataArray) {
		const innerDiv = document.createElement('div');
		const notEmptyBlob = [];


		dataArray.forEach(item => {
			if(item.audioBlob[0] && item.audioBlob[0].data.length) {
				notEmptyBlob.push(item);
			}
		});

	 	for await (let item of notEmptyBlob) {
			let innerAudio = await this._showList(item);

			innerDiv.appendChild(innerAudio);
		}

		return innerDiv;
	},

	_showList: function(item) {
		return new Promise(resolve => {
			let audioElem = document.createElement("audio");
			audioElem.controls = 'controls';

			let dataLenth = item.audioBlob[0].data.length;

			const blob = new Blob([new Uint8Array(item.audioBlob[0].data).buffer]);
			const audioUrl = URL.createObjectURL(blob);
			audioElem.src = audioUrl;

			resolve(audioElem)
		});
	},
}