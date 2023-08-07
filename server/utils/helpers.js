const fetch = require('node-fetch');
const jwt = require('jsonwebtoken');

exports = {};

exports.getToken = async (email, user) => {
	const token = jwt.sign(
		{ identifier: user._id },
		'thisKeyIsSupposedToBeSecret'
	);
	return token;
};

const llmApiUrl = 'https://aad9-110-235-216-64.ngrok-free.app';
exports.getScore = async (url) => {
	const response = await fetch(llmApiUrl + url, {
		method: 'GET'
	});
	const formattedResponse = await response.json();
	return formattedResponse;
}

exports.testLink = async (email) => {
	const response = await fetch(llmApiUrl + '/TestMail?email=' + email, {
		method: 'POST'
	});
	const formattedResponse = await response.json();
	return formattedResponse;
}

exports.interviewLink = async (email) => {
	const response = await fetch(llmApiUrl + '/SelectMail?email=' + email, {
		method: 'POST'
	});
	const formattedResponse = await response.json();
	return formattedResponse;
}

module.exports = exports;
