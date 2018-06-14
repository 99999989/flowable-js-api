'use strict';
const ProcessDefinitionsResource = require('./resources/process-definitions');
const ProcessInstancesResource = require('./resources/process-instances');
const TasksResource = require('./resources/tasks');
const TaskVariablesResource = require('./resources/task-variables');
const axios = require('axios');

const flowableRestEndpoint = '/flowable-rest/service';

module.exports = function (options) {

    const httpClient = axios.create({
        baseURL: getBaseUrlWithCredentials(options) + flowableRestEndpoint,
        timeout: options.timeout || 0,
        headers: {'content-type': 'application/json'},
        withCredentials: false,
        //auth: options.auth
    });

    return {
        processDefinitions: new ProcessDefinitionsResource(options, httpClient),
        processInstances: new ProcessInstancesResource(options, httpClient),
        //processInstanceVariables: new ProcessInstanceVariablesResource(options, httpClient),
        tasks: new TasksResource(options, httpClient),
        taskVariables: new TaskVariablesResource(options, httpClient),
        options: options
    }
};

/*
    TODO: to be removed as soon as CORS in flowable REST API is enabled
 */
function getBaseUrlWithCredentials(options) {
    const protocolLength = options.apiUri.startsWith('https://') ? 8 : 7;
    return options.apiUri.substr(0, protocolLength) + options.auth.username + ':' + options.auth.password + '@' + options.apiUri.substr(protocolLength);
}