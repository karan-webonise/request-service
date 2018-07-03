import $ from 'jquery';
import jQuery from 'jquery';
window.$ = jQuery;
var _ = require('lodash');
function Request() {
}

var _request = function (param) {
	var access_token = true;//StorageProvider.getAccessToken();
	return new Promise(function (resolve, reject) {

		var successHandler = function (data) {

			return resolve(data);
		};

		var errorHandler = function (error) {
			return reject(error);
		};

		if (access_token) {
			param.headers = param.headers || {};
			_.extend(param.headers, { Authorization: access_token });
		}


		$.ajax({
			url: param.url,
			headers: param.headers,
			success: successHandler,
			error: errorHandler
		});


	});
};

var _doGet = function (url, data) {
	var param = {
		data: data,
		url: url,
		method: "GET"
	};
	return _request(param);
};

var _doPost = function (url, data, authHeader = BASIC_AUTH) {
	var param = {
		data: JSON.stringify(data),
		url: url,
		method: "POST",
		headers: _.extend({ 'Content-Type': 'application/json' }, authHeader)
	};
	return _request(param);
};

var _doPut = function (url, data) {
	var param = {
		data: JSON.stringify(data),
		url: url,
		method: "PUT",
		headers: { 'Content-Type': 'application/json' }
	};
	return _request(param);
};

var _doDelete = function (url, data) {
	var param = {
		data: data,
		url: url,
		method: "DELETE",
		headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
	};
	return _request(param);
};

var _doUpload = function (url, data) {
	var param = {
		data: data,
		url: url,
		method: "POST",
		processData: false,
		contentType: false,
	};
	return _request(param);
};

Request.prototype.save = function (url, data, authData) {
	return _doPost(url, data, authData);
};

Request.prototype.fetch = function (url, data) {
	return _doGet(url, data);
};

Request.prototype.upload = function (url, data) {
	return _doUpload(url, data);
};

Request.prototype.update = function (url, data) {
	return _doPut(url, data);
};

Request.prototype.delete = function (url, data) {
	return _doDelete(url, data);
};

var request = new Request();

export default request;
