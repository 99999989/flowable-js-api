(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.flowable = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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
},{"./resources/process-definitions":2,"./resources/process-instances":3,"./resources/task-variables":4,"./resources/tasks":5,"axios":6}],2:[function(require,module,exports){
'use strict';

const resourcePath = '/repository/process-definitions';

function ProcessDefinitionsResource(options, http) {

    /**
     * List of process definitions
     * @param queryParams
     * @returns {AxiosPromise<any> | *}
     */
    this.getProcessDefinitions = (queryParams) => {
       return http.get(resourcePath,
            getRequestArgs(queryParams)
        );
    };

    /**
     * Get a process definition
     * @param processDefinitionId
     * @returns {AxiosPromise<any> | *}
     */
    this.getProcessDefinitionById = (processDefinitionId) => {
        return http.get(resourcePath + `/${processDefinitionId}`,
            getRequestArgs());
    };

    /**
     * Execute actions for a process definition
     * @param processDefinitionId
     * @param action
     * @returns {AxiosPromise<any> | *}
     */
    this.executeAction = (processDefinitionId, action) => {
        return http.put(resourcePath + `/${processDefinitionId}`, action,
            getRequestArgs(null, action));
    };

    /**
     * List decision tables for a process-definition
     * @param processDefinitionId
     * @returns {AxiosPromise<any> | *}
     */
    this.getDecisionTables = (processDefinitionId) => {
        return http.get(resourcePath + `/${processDefinitionId}/decision-tables`,
            getRequestArgs());
    };

    /**
     * List form definitions for a process-definition
     * @param processDefinitionId
     * @returns {AxiosPromise<any> | *}
     */
    this.getFormDefinitions = (processDefinitionId) => {
        return http.get(resourcePath + `/${processDefinitionId}/form-definitions`,
            getRequestArgs());
    };

    /**
     * List candidate starters for a process-definition
     * @param processDefinitionId
     * @returns {AxiosPromise<any> | *}
     */
    this.getCandidateStarters = (processDefinitionId) => {
        return http.get(resourcePath + `/${processDefinitionId}/identitylinks`,
            getRequestArgs());
    };

    /**
     * Add a candidate starter to a process definition
     * @param processDefinitionId
     * @param restIdentityLink
     * @example {
          "data": [
            {
              "id": "187",
              "url": "http://localhost:8182/repository/process-definitions/processOne%3A1%3A4",
              "businessKey": "myBusinessKey",
              "suspended": true,
              "ended": true,
              "processDefinitionId": "oneTaskProcess:1:158",
              "processDefinitionUrl": "http://localhost:8182/repository/process-definitions/processOne%3A1%3A4",
              "activityId": "processTask",
              "variables": [
                {
                  "name": "myVariable",
                  "type": "string",
                  "value": "test",
                  "valueUrl": "http://....",
                  "scope": "string"
                }
              ],
              "tenantId": "null",
              "completed": true
            }
          ],
          "total": 0,
          "start": 0,
          "sort": "string",
          "order": "string",
          "size": 0
        }
     * @returns {AxiosPromise<any> | *}
     */
    this.addCandidateStarter = (processDefinitionId, restIdentityLink) => {
        return http.post(resourcePath + `/${processDefinitionId}/identitylinks`, restIdentityLink,
            getRequestArgs());
    };

    /**
     * Delete a candidate starter from a process definition
     * @param processDefinitionId
     * @param family
     * @param identityId
     * @returns {AxiosPromise<any> | *}
     */
    this.deleteCandidateStarter = (processDefinitionId, family, identityId) => {
        return http.delete(resourcePath + `/${processDefinitionId}/identitylinks/${family}/${identityId}`,
            getRequestArgs());
    };

    /**
     * Get a candidate starter from a process definition
     * @param processDefinitionId
     * @param family
     * @param identityId
     * @returns {AxiosPromise<any> | *}
     */
    this.getCandidateStarter = (processDefinitionId, family, identityId) => {
        return http.get(resourcePath + `/${processDefinitionId}/identitylinks/${family}/${identityId}`,
            getRequestArgs());
    };

    /**
     * Get a process definition image
     * @param processDefinitionId
     * @returns {AxiosPromise<any> | *}
     */
    this.getImage = (processDefinitionId) => {
        return http.get(resourcePath + `/${processDefinitionId}/image`,
            getRequestArgs());
    };

    /**
     * Get a process definition BPMN model
     * @param processDefinitionId
     * @returns {AxiosPromise<any> | *}
     */
    this.getModel = (processDefinitionId) => {
        return http.get(resourcePath + `/${processDefinitionId}/model`,
            getRequestArgs());
    };

    /**
     * Get a process definition resource content
     * @param processDefinitionId
     * @returns {AxiosPromise<any> | *}
     */
    this.getResourceData = (processDefinitionId) => {
        return http.get(resourcePath + `/${processDefinitionId}/resourcedata`,
            getRequestArgs());
    };

}


///////////////////

function getRequestArgs(queryParams, data) {
    const args = {};
    queryParams ? args.params = queryParams : undefined;
    data ? args.data = data : undefined;
    return args;
}

module.exports = ProcessDefinitionsResource;
},{}],3:[function(require,module,exports){
'use strict';

const resourcePath = '/runtime/process-instances';
const queryResourcePath = '/query/process-instances';

function ProcessInstancesResource(options, http) {

    /**
     * Query process instances
     * @param processInstanceQueryRequest
     * @example {
          "start": 0,
          "size": 0,
          "sort": "string",
          "order": "string",
          "processInstanceId": "string",
          "processBusinessKey": "string",
          "processDefinitionId": "string",
          "processDefinitionKey": "string",
          "superProcessInstanceId": "string",
          "subProcessInstanceId": "string",
          "excludeSubprocesses": true,
          "involvedUser": "string",
          "suspended": true,
          "includeProcessVariables": true,
          "variables": [
            {
              "name": "string",
              "operation": "string",
              "value": {},
              "type": "string",
              "variableOperation": "EQUALS"
            }
          ],
          "tenantId": "string",
          "tenantIdLike": "string",
          "withoutTenantId": true
        }
     * @returns {AxiosPromise<any> | *}
     */
    this.queryProcessInstances = (processInstanceQueryRequest) => {
       return http.post(queryResourcePath, processInstanceQueryRequest,
            getRequestArgs()
        );
    };

    /**
     * List process instances
     * @param queryParams
     * @returns {AxiosPromise<any> | *}
     */
    this.getProcessInstances = (queryParams) => {
        return http.get(resourcePath,
            getRequestArgs(queryParams)
        );
    };

    /**
     * Start a process instance
     * @param processInstanceCreateRequest
     * @example {
          "processDefinitionId": "oneTaskProcess:1:158",
          "processDefinitionKey": "oneTaskProcess",
          "message": "newOrderMessage",
          "businessKey": "myBusinessKey",
          "variables": [
            {
              "name": "myVariable",
              "type": "string",
              "value": "test",
              "valueUrl": "http://....",
              "scope": "string"
            }
          ],
          "transientVariables": [
            {
              "name": "myVariable",
              "type": "string",
              "value": "test",
              "valueUrl": "http://....",
              "scope": "string"
            }
          ],
          "tenantId": "tenant1",
          "returnVariables": true
        }
     * @returns {AxiosPromise<any> | *}
     */
    this.startProcessInstance = (processInstanceCreateRequest) => {
        return http.post(resourcePath, processInstanceCreateRequest,
            getRequestArgs()
        );
    };

    /**
     * Delete a process instance
     * @param processInstanceId
     * @param queryParams
     * @returns {AxiosPromise<any> | *}
     */
    this.deleteProcessInstance = (processInstanceId, queryParams) => {
        return http.delete(resourcePath + `/${processInstanceId}`,
            getRequestArgs(queryParams)
        );
    };

    /**
     * Get a process instance
     * @param processInstanceId
     * @returns {AxiosPromise<any> | *}
     */
    this.getProcessInstance = (processInstanceId) => {
        return http.get(resourcePath + `/${processInstanceId}`,
            getRequestArgs()
        );
    };

    /**
     * Activate or suspend a process instance
     * @param processInstanceId
     * @param processInstanceActionRequest
     * @example {
          "action": "activate"
        }
     * @returns {AxiosPromise<any> | *}
     */
    this.executeAction = (processInstanceId, processInstanceActionRequest) => {
        return http.put(resourcePath + `/${processInstanceId}`, processInstanceActionRequest,
            getRequestArgs()
        );
    };

    /**
     * Change the state of a process instance
     * @param processInstanceId
     * @param executionChangeActivityStateRequest
     * @example {
          "cancelActivityIds": [
            "string"
          ],
          "startActivityIds": [
            "string"
          ]
        }
     * @returns {AxiosPromise<any> | *}
     */
    this.changeState = (processInstanceId, executionChangeActivityStateRequest) => {
        return http.post(resourcePath + `/${processInstanceId}/change-state`, executionChangeActivityStateRequest,
            getRequestArgs()
        );
    };

    /**
     * Get diagram for a process instance
     * @param processInstanceId
     * @returns {AxiosPromise<any> | *}
     */
    this.getDiagram = (processInstanceId) => {
        return http.get(resourcePath + `/${processInstanceId}/diagram`,
            getRequestArgs()
        );
    };

    /**
     * Inject activity in a process instance
     * @param processInstanceId
     * @param injectActivityRequest
     * @example {
          "injectionType": "string",
          "id": "string",
          "name": "string",
          "assignee": "string",
          "taskId": "string",
          "processDefinitionId": "string",
          "joinParallelActivitiesOnComplete": true
        }
     * @returns {AxiosPromise<any> | *}
     */
    this.injectActivity = (processInstanceId, injectActivityRequest) => {
        return http.post(resourcePath + `/${processInstanceId}/inject`, injectActivityRequest,
            getRequestArgs()
        );
    };

}


///////////////////

function getRequestArgs(queryParams, data) {
    const args = {};
    queryParams ? args.params = queryParams : undefined;
    data ? args.data = data : undefined;
    return args;
}

module.exports = ProcessInstancesResource;
},{}],4:[function(require,module,exports){
'use strict';

const resourcePath = '/runtime/tasks';

function TaskVariablesResource(options, http) {

    /**
     * List variables for a task
     * @param taskId
     * @param queryParams
     * @returns {AxiosPromise<any> | *}
     */
    this.getVariables = (taskId, queryParams) => {
        return http.get(resourcePath + `/${taskId}/variables`,
            getRequestArgs(queryParams)
        );
    };

    /**
     * Create new variables on a task
     * @param taskId
     * @param taskVariableCollectionResource
     * @example [{
        "name" : "variableName",
        "type": "integer",
        "scope": "local"
        }]
     * @returns {AxiosPromise<any> | *}
     */
    this.createVariables = (taskId, taskVariableCollectionResource) => {
        return http.post(resourcePath + `/${taskId}/variables`, taskVariableCollectionResource,
            getRequestArgs()
        );
    };

    /**
     * Delete a variable on a task
     * @param taskId
     * @param variableName
     * @param queryParams
     * @returns {AxiosPromise<any> | *}
     */
    this.deleteVariable = (taskId, variableName, queryParams) => {
        return http.delete(resourcePath + `/${taskId}/variables/${variableName}`,
            getRequestArgs(queryParams)
        );
    };

    /**
     * Get a variable from a task
     * @param taskId
     * @param variableName
     * @param queryParams
     * @returns {AxiosPromise<any> | *}
     */
    this.getVariable = (taskId, variableName, queryParams) => {
        return http.get(resourcePath + `/${taskId}/variables/${variableName}`,
            getRequestArgs(queryParams)
        );
    };

    /**
     * Update an existing variable on a task
     * @param taskId
     * @param variableName
     * @param taskVariableResource
     * @example {
        "name" : "variableName",
        "type": "integer",
        "scope": "local"
        }
     * @returns {AxiosPromise<any> | *}
     */
    this.updateVariable = (taskId, variableName, taskVariableResource) => {
        return http.put(resourcePath + `${taskId}/variables/${variableName}`, taskVariableResource,
            getRequestArgs()
        );
    };

    /**
     * Get the binary data for a variable
     * @param taskId
     * @param variableName
     * @param queryParams
     * @returns {AxiosPromise<any> | *}
     */
    this.getBinaryData = (taskId, variableName, queryParams) => {
        return http.get(resourcePath + `/${taskId}/variables/${variableName}/data`,
            getRequestArgs(queryParams)
        );
    };

}


///////////////////

function getRequestArgs(queryParams, data) {
    const args = {};
    queryParams ? args.params = queryParams : undefined;
    data ? args.data = data : undefined;
    return args;
}

module.exports = TaskVariablesResource;
},{}],5:[function(require,module,exports){
'use strict';

const resourcePath = '/runtime/tasks';
const queryResourcePath = '/query/tasks';

function TasksResource(options, http) {

    /**
     * Query tasks
     * @param taskQueryRequest
     * @example {
          "start": 0,
          "size": 0,
          "sort": "string",
          "order": "string",
          "name": "string",
          "nameLike": "string",
          "description": "string",
          "descriptionLike": "string",
          "priority": 0,
          "minimumPriority": 0,
          "maximumPriority": 0,
          "assignee": "string",
          "assigneeLike": "string",
          "owner": "string",
          "ownerLike": "string",
          "unassigned": true,
          "delegationState": "string",
          "candidateUser": "string",
          "candidateGroup": "string",
          "candidateGroupIn": [
            "string"
          ],
          "involvedUser": "string",
          "processInstanceId": "string",
          "processInstanceBusinessKey": "string",
          "processInstanceBusinessKeyLike": "string",
          "processDefinitionId": "string",
          "processDefinitionKey": "string",
          "processDefinitionName": "string",
          "processDefinitionKeyLike": "string",
          "processDefinitionNameLike": "string",
          "executionId": "string",
          "createdOn": "2018-06-14T13:24:45.733Z",
          "createdBefore": "2018-06-14T13:24:45.733Z",
          "createdAfter": "2018-06-14T13:24:45.733Z",
          "excludeSubTasks": true,
          "taskDefinitionKey": "string",
          "taskDefinitionKeyLike": "string",
          "dueDate": "2018-06-14T13:24:45.733Z",
          "dueBefore": "2018-06-14T13:24:45.733Z",
          "dueAfter": "2018-06-14T13:24:45.733Z",
          "withoutDueDate": true,
          "active": true,
          "includeTaskLocalVariables": true,
          "includeProcessVariables": true,
          "tenantId": "string",
          "tenantIdLike": "string",
          "withoutTenantId": true,
          "candidateOrAssigned": "string",
          "category": "string",
          "taskVariables": [
            {
              "name": "string",
              "operation": "string",
              "value": {},
              "type": "string",
              "variableOperation": "EQUALS"
            }
          ],
          "processInstanceVariables": [
            {
              "name": "string",
              "operation": "string",
              "value": {},
              "type": "string",
              "variableOperation": "EQUALS"
            }
          ]
        }
     * @returns {AxiosPromise<any> | *}
     */
    this.queryTasks = (taskQueryRequest) => {
        return http.post(queryResourcePath, taskQueryRequest,
            getRequestArgs()
        );
    };

    /**
     * List tasks
     * @param queryParams
     * @returns {AxiosPromise<any> | *}
     */
    this.getTasks = (queryParams) => {
        return http.get(resourcePath,
            getRequestArgs(queryParams)
        );
    };

    /**
     * Create a task
     * @param taskCreateRequest
     * @example {
          "owner": "string",
          "assignee": "string",
          "delegationState": "string",
          "name": "string",
          "description": "string",
          "dueDate": "2018-06-14T13:24:45.765Z",
          "priority": 0,
          "parentTaskId": "string",
          "category": "string",
          "tenantId": "string",
          "formKey": "string",
          "ownerSet": true,
          "assigneeSet": true,
          "delegationStateSet": true,
          "nameSet": true,
          "descriptionSet": true,
          "duedateSet": true,
          "prioritySet": true,
          "parentTaskIdSet": true,
          "categorySet": true,
          "tenantIdSet": true,
          "formKeySet": true
        }
     * @returns {AxiosPromise<any> | *}
     */
    this.createTask = (taskCreateRequest) => {
        return http.post(resourcePath, taskCreateRequest,
            getRequestArgs()
        );
    };

    /**
     * Delete a task
     * @param taskId
     * @param queryParams
     * @returns {AxiosPromise<any> | *}
     */
    this.deleteTask = (taskId, queryParams) => {
        return http.delete(resourcePath + `/${taskId}`,
            getRequestArgs(queryParams)
        );
    };

    /**
     * Get a task
     * @param taskId
     * @returns {AxiosPromise<any> | *}
     */
    this.getTask = (taskId) => {
        return http.get(resourcePath + `/${taskId}`,
            getRequestArgs()
        );
    };

    /**
     * Execute an action on a task
     * @param taskId
     * @param taskActionRequest
     * @example {
          "action": "complete",
          "assignee": "userWhoClaims/userToDelegateTo",
          "variables": [
            {
              "name": "myVariable",
              "type": "string",
              "value": "test",
              "valueUrl": "http://....",
              "scope": "string"
            }
          ],
          "transientVariables": [
            {
              "name": "myVariable",
              "type": "string",
              "value": "test",
              "valueUrl": "http://....",
              "scope": "string"
            }
          ]
        }
     * @returns {AxiosPromise<any> | *}
     */
    this.executeAction = (taskId, taskActionRequest) => {
        return http.post(resourcePath + `/${taskId}`, taskActionRequest,
            getRequestArgs()
        );
    };

    /**
     * Update a task
     * @param taskId
     * @param taskRequest
     * @example {
          "owner": "string",
          "assignee": "string",
          "delegationState": "string",
          "name": "string",
          "description": "string",
          "dueDate": "2018-06-14T13:24:45.783Z",
          "priority": 0,
          "parentTaskId": "string",
          "category": "string",
          "tenantId": "string",
          "formKey": "string",
          "ownerSet": true,
          "assigneeSet": true,
          "delegationStateSet": true,
          "nameSet": true,
          "descriptionSet": true,
          "duedateSet": true,
          "prioritySet": true,
          "parentTaskIdSet": true,
          "categorySet": true,
          "tenantIdSet": true,
          "formKeySet": true
        }
     * @returns {AxiosPromise<any> | *}
     */
    this.updateTask = (taskId, taskRequest) => {
        return http.put(resourcePath + `/${taskId}`, taskRequest,
            getRequestArgs()
        );
    };

    /**
     * List events for a task
     * @param taskId
     * @returns {AxiosPromise<any> | *}
     */
    this.getTask = (taskId) => {
        return http.get(resourcePath + `/${taskId}/events`,
            getRequestArgs()
        );
    };

    /**
     * Delete an event on a task
     * @param taskId
     * @param eventId
     * @returns {AxiosPromise<any> | *}
     */
    this.deleteEvent = (taskId, eventId) => {
        return http.delete(resourcePath + `/${taskId}/events/${eventId}`,
            getRequestArgs()
        );
    };

    /**
     * Get an event on a task
     * @param taskId
     * @param eventId
     * @returns {AxiosPromise<any> | *}
     */
    this.getEvent = (taskId, eventId) => {
        return http.get(resourcePath + `/${taskId}/events/${eventId}`,
            getRequestArgs()
        );
    };


    /**
     * List of sub tasks for a task
     * @param taskId
     * @returns {AxiosPromise<any> | *}
     */
    this.getSubTasks = (taskId) => {
        return http.get(resourcePath + `/${taskId}/subtasks`,
            getRequestArgs()
        );
    };

    /**
     * Delete all local variables on a task
     * @param taskId
     * @returns {AxiosPromise<any> | *}
     */
    this.deleteVariables = (taskId) => {
        return http.delete(resourcePath + `/${taskId}/variables`,
            getRequestArgs()
        );
    };

    /**
     * Create new variables on a task
     * @param taskId
     * @param taskVariableCollectionResource
     * @example [{
        "name" : "variableName",
        "type": "integer",
        "scope": "local"
        }]
     * @returns {AxiosPromise<any> | *}
     */
    this.createVariables = (taskId, taskVariableCollectionResource) => {
        return http.post(resourcePath + `/${taskId}/variables`, taskVariableCollectionResource,
            getRequestArgs()
        );
    };
}


///////////////////

function getRequestArgs(queryParams, data) {
    const args = {};
    queryParams ? args.params = queryParams : undefined;
    data ? args.data = data : undefined;
    return args;
}

module.exports = TasksResource;
},{}],6:[function(require,module,exports){
module.exports = require('./lib/axios');
},{"./lib/axios":8}],7:[function(require,module,exports){
(function (process){
'use strict';

var utils = require('./../utils');
var settle = require('./../core/settle');
var buildURL = require('./../helpers/buildURL');
var parseHeaders = require('./../helpers/parseHeaders');
var isURLSameOrigin = require('./../helpers/isURLSameOrigin');
var createError = require('../core/createError');
var btoa = (typeof window !== 'undefined' && window.btoa && window.btoa.bind(window)) || require('./../helpers/btoa');

module.exports = function xhrAdapter(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    var requestData = config.data;
    var requestHeaders = config.headers;

    if (utils.isFormData(requestData)) {
      delete requestHeaders['Content-Type']; // Let the browser set it
    }

    var request = new XMLHttpRequest();
    var loadEvent = 'onreadystatechange';
    var xDomain = false;

    // For IE 8/9 CORS support
    // Only supports POST and GET calls and doesn't returns the response headers.
    // DON'T do this for testing b/c XMLHttpRequest is mocked, not XDomainRequest.
    if (process.env.NODE_ENV !== 'test' &&
        typeof window !== 'undefined' &&
        window.XDomainRequest && !('withCredentials' in request) &&
        !isURLSameOrigin(config.url)) {
      request = new window.XDomainRequest();
      loadEvent = 'onload';
      xDomain = true;
      request.onprogress = function handleProgress() {};
      request.ontimeout = function handleTimeout() {};
    }

    // HTTP basic authentication
    if (config.auth) {
      var username = config.auth.username || '';
      var password = config.auth.password || '';
      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
    }

    request.open(config.method.toUpperCase(), buildURL(config.url, config.params, config.paramsSerializer), true);

    // Set the request timeout in MS
    request.timeout = config.timeout;

    // Listen for ready state
    request[loadEvent] = function handleLoad() {
      if (!request || (request.readyState !== 4 && !xDomain)) {
        return;
      }

      // The request errored out and we didn't get a response, this will be
      // handled by onerror instead
      // With one exception: request that using file: protocol, most browsers
      // will return status as 0 even though it's a successful request
      if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
        return;
      }

      // Prepare the response
      var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
      var responseData = !config.responseType || config.responseType === 'text' ? request.responseText : request.response;
      var response = {
        data: responseData,
        // IE sends 1223 instead of 204 (https://github.com/axios/axios/issues/201)
        status: request.status === 1223 ? 204 : request.status,
        statusText: request.status === 1223 ? 'No Content' : request.statusText,
        headers: responseHeaders,
        config: config,
        request: request
      };

      settle(resolve, reject, response);

      // Clean up request
      request = null;
    };

    // Handle low level network errors
    request.onerror = function handleError() {
      // Real errors are hidden from us by the browser
      // onerror should only fire if it's a network error
      reject(createError('Network Error', config, null, request));

      // Clean up request
      request = null;
    };

    // Handle timeout
    request.ontimeout = function handleTimeout() {
      reject(createError('timeout of ' + config.timeout + 'ms exceeded', config, 'ECONNABORTED',
        request));

      // Clean up request
      request = null;
    };

    // Add xsrf header
    // This is only done if running in a standard browser environment.
    // Specifically not if we're in a web worker, or react-native.
    if (utils.isStandardBrowserEnv()) {
      var cookies = require('./../helpers/cookies');

      // Add xsrf header
      var xsrfValue = (config.withCredentials || isURLSameOrigin(config.url)) && config.xsrfCookieName ?
          cookies.read(config.xsrfCookieName) :
          undefined;

      if (xsrfValue) {
        requestHeaders[config.xsrfHeaderName] = xsrfValue;
      }
    }

    // Add headers to the request
    if ('setRequestHeader' in request) {
      utils.forEach(requestHeaders, function setRequestHeader(val, key) {
        if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
          // Remove Content-Type if data is undefined
          delete requestHeaders[key];
        } else {
          // Otherwise add header to the request
          request.setRequestHeader(key, val);
        }
      });
    }

    // Add withCredentials to request if needed
    if (config.withCredentials) {
      request.withCredentials = true;
    }

    // Add responseType to request if needed
    if (config.responseType) {
      try {
        request.responseType = config.responseType;
      } catch (e) {
        // Expected DOMException thrown by browsers not compatible XMLHttpRequest Level 2.
        // But, this can be suppressed for 'json' type as it can be parsed by default 'transformResponse' function.
        if (config.responseType !== 'json') {
          throw e;
        }
      }
    }

    // Handle progress if needed
    if (typeof config.onDownloadProgress === 'function') {
      request.addEventListener('progress', config.onDownloadProgress);
    }

    // Not all browsers support upload events
    if (typeof config.onUploadProgress === 'function' && request.upload) {
      request.upload.addEventListener('progress', config.onUploadProgress);
    }

    if (config.cancelToken) {
      // Handle cancellation
      config.cancelToken.promise.then(function onCanceled(cancel) {
        if (!request) {
          return;
        }

        request.abort();
        reject(cancel);
        // Clean up request
        request = null;
      });
    }

    if (requestData === undefined) {
      requestData = null;
    }

    // Send the request
    request.send(requestData);
  });
};

}).call(this,require('_process'))
},{"../core/createError":14,"./../core/settle":17,"./../helpers/btoa":21,"./../helpers/buildURL":22,"./../helpers/cookies":24,"./../helpers/isURLSameOrigin":26,"./../helpers/parseHeaders":28,"./../utils":30,"_process":32}],8:[function(require,module,exports){
'use strict';

var utils = require('./utils');
var bind = require('./helpers/bind');
var Axios = require('./core/Axios');
var defaults = require('./defaults');

/**
 * Create an instance of Axios
 *
 * @param {Object} defaultConfig The default config for the instance
 * @return {Axios} A new instance of Axios
 */
function createInstance(defaultConfig) {
  var context = new Axios(defaultConfig);
  var instance = bind(Axios.prototype.request, context);

  // Copy axios.prototype to instance
  utils.extend(instance, Axios.prototype, context);

  // Copy context to instance
  utils.extend(instance, context);

  return instance;
}

// Create the default instance to be exported
var axios = createInstance(defaults);

// Expose Axios class to allow class inheritance
axios.Axios = Axios;

// Factory for creating new instances
axios.create = function create(instanceConfig) {
  return createInstance(utils.merge(defaults, instanceConfig));
};

// Expose Cancel & CancelToken
axios.Cancel = require('./cancel/Cancel');
axios.CancelToken = require('./cancel/CancelToken');
axios.isCancel = require('./cancel/isCancel');

// Expose all/spread
axios.all = function all(promises) {
  return Promise.all(promises);
};
axios.spread = require('./helpers/spread');

module.exports = axios;

// Allow use of default import syntax in TypeScript
module.exports.default = axios;

},{"./cancel/Cancel":9,"./cancel/CancelToken":10,"./cancel/isCancel":11,"./core/Axios":12,"./defaults":19,"./helpers/bind":20,"./helpers/spread":29,"./utils":30}],9:[function(require,module,exports){
'use strict';

/**
 * A `Cancel` is an object that is thrown when an operation is canceled.
 *
 * @class
 * @param {string=} message The message.
 */
function Cancel(message) {
  this.message = message;
}

Cancel.prototype.toString = function toString() {
  return 'Cancel' + (this.message ? ': ' + this.message : '');
};

Cancel.prototype.__CANCEL__ = true;

module.exports = Cancel;

},{}],10:[function(require,module,exports){
'use strict';

var Cancel = require('./Cancel');

/**
 * A `CancelToken` is an object that can be used to request cancellation of an operation.
 *
 * @class
 * @param {Function} executor The executor function.
 */
function CancelToken(executor) {
  if (typeof executor !== 'function') {
    throw new TypeError('executor must be a function.');
  }

  var resolvePromise;
  this.promise = new Promise(function promiseExecutor(resolve) {
    resolvePromise = resolve;
  });

  var token = this;
  executor(function cancel(message) {
    if (token.reason) {
      // Cancellation has already been requested
      return;
    }

    token.reason = new Cancel(message);
    resolvePromise(token.reason);
  });
}

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
CancelToken.prototype.throwIfRequested = function throwIfRequested() {
  if (this.reason) {
    throw this.reason;
  }
};

/**
 * Returns an object that contains a new `CancelToken` and a function that, when called,
 * cancels the `CancelToken`.
 */
CancelToken.source = function source() {
  var cancel;
  var token = new CancelToken(function executor(c) {
    cancel = c;
  });
  return {
    token: token,
    cancel: cancel
  };
};

module.exports = CancelToken;

},{"./Cancel":9}],11:[function(require,module,exports){
'use strict';

module.exports = function isCancel(value) {
  return !!(value && value.__CANCEL__);
};

},{}],12:[function(require,module,exports){
'use strict';

var defaults = require('./../defaults');
var utils = require('./../utils');
var InterceptorManager = require('./InterceptorManager');
var dispatchRequest = require('./dispatchRequest');

/**
 * Create a new instance of Axios
 *
 * @param {Object} instanceConfig The default config for the instance
 */
function Axios(instanceConfig) {
  this.defaults = instanceConfig;
  this.interceptors = {
    request: new InterceptorManager(),
    response: new InterceptorManager()
  };
}

/**
 * Dispatch a request
 *
 * @param {Object} config The config specific for this request (merged with this.defaults)
 */
Axios.prototype.request = function request(config) {
  /*eslint no-param-reassign:0*/
  // Allow for axios('example/url'[, config]) a la fetch API
  if (typeof config === 'string') {
    config = utils.merge({
      url: arguments[0]
    }, arguments[1]);
  }

  config = utils.merge(defaults, {method: 'get'}, this.defaults, config);
  config.method = config.method.toLowerCase();

  // Hook up interceptors middleware
  var chain = [dispatchRequest, undefined];
  var promise = Promise.resolve(config);

  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
    chain.unshift(interceptor.fulfilled, interceptor.rejected);
  });

  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
    chain.push(interceptor.fulfilled, interceptor.rejected);
  });

  while (chain.length) {
    promise = promise.then(chain.shift(), chain.shift());
  }

  return promise;
};

// Provide aliases for supported request methods
utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url
    }));
  };
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, data, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url,
      data: data
    }));
  };
});

module.exports = Axios;

},{"./../defaults":19,"./../utils":30,"./InterceptorManager":13,"./dispatchRequest":15}],13:[function(require,module,exports){
'use strict';

var utils = require('./../utils');

function InterceptorManager() {
  this.handlers = [];
}

/**
 * Add a new interceptor to the stack
 *
 * @param {Function} fulfilled The function to handle `then` for a `Promise`
 * @param {Function} rejected The function to handle `reject` for a `Promise`
 *
 * @return {Number} An ID used to remove interceptor later
 */
InterceptorManager.prototype.use = function use(fulfilled, rejected) {
  this.handlers.push({
    fulfilled: fulfilled,
    rejected: rejected
  });
  return this.handlers.length - 1;
};

/**
 * Remove an interceptor from the stack
 *
 * @param {Number} id The ID that was returned by `use`
 */
InterceptorManager.prototype.eject = function eject(id) {
  if (this.handlers[id]) {
    this.handlers[id] = null;
  }
};

/**
 * Iterate over all the registered interceptors
 *
 * This method is particularly useful for skipping over any
 * interceptors that may have become `null` calling `eject`.
 *
 * @param {Function} fn The function to call for each interceptor
 */
InterceptorManager.prototype.forEach = function forEach(fn) {
  utils.forEach(this.handlers, function forEachHandler(h) {
    if (h !== null) {
      fn(h);
    }
  });
};

module.exports = InterceptorManager;

},{"./../utils":30}],14:[function(require,module,exports){
'use strict';

var enhanceError = require('./enhanceError');

/**
 * Create an Error with the specified message, config, error code, request and response.
 *
 * @param {string} message The error message.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The created error.
 */
module.exports = function createError(message, config, code, request, response) {
  var error = new Error(message);
  return enhanceError(error, config, code, request, response);
};

},{"./enhanceError":16}],15:[function(require,module,exports){
'use strict';

var utils = require('./../utils');
var transformData = require('./transformData');
var isCancel = require('../cancel/isCancel');
var defaults = require('../defaults');
var isAbsoluteURL = require('./../helpers/isAbsoluteURL');
var combineURLs = require('./../helpers/combineURLs');

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }
}

/**
 * Dispatch a request to the server using the configured adapter.
 *
 * @param {object} config The config that is to be used for the request
 * @returns {Promise} The Promise to be fulfilled
 */
module.exports = function dispatchRequest(config) {
  throwIfCancellationRequested(config);

  // Support baseURL config
  if (config.baseURL && !isAbsoluteURL(config.url)) {
    config.url = combineURLs(config.baseURL, config.url);
  }

  // Ensure headers exist
  config.headers = config.headers || {};

  // Transform request data
  config.data = transformData(
    config.data,
    config.headers,
    config.transformRequest
  );

  // Flatten headers
  config.headers = utils.merge(
    config.headers.common || {},
    config.headers[config.method] || {},
    config.headers || {}
  );

  utils.forEach(
    ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
    function cleanHeaderConfig(method) {
      delete config.headers[method];
    }
  );

  var adapter = config.adapter || defaults.adapter;

  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config);

    // Transform response data
    response.data = transformData(
      response.data,
      response.headers,
      config.transformResponse
    );

    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel(reason)) {
      throwIfCancellationRequested(config);

      // Transform response data
      if (reason && reason.response) {
        reason.response.data = transformData(
          reason.response.data,
          reason.response.headers,
          config.transformResponse
        );
      }
    }

    return Promise.reject(reason);
  });
};

},{"../cancel/isCancel":11,"../defaults":19,"./../helpers/combineURLs":23,"./../helpers/isAbsoluteURL":25,"./../utils":30,"./transformData":18}],16:[function(require,module,exports){
'use strict';

/**
 * Update an Error with the specified config, error code, and response.
 *
 * @param {Error} error The error to update.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The error.
 */
module.exports = function enhanceError(error, config, code, request, response) {
  error.config = config;
  if (code) {
    error.code = code;
  }
  error.request = request;
  error.response = response;
  return error;
};

},{}],17:[function(require,module,exports){
'use strict';

var createError = require('./createError');

/**
 * Resolve or reject a Promise based on response status.
 *
 * @param {Function} resolve A function that resolves the promise.
 * @param {Function} reject A function that rejects the promise.
 * @param {object} response The response.
 */
module.exports = function settle(resolve, reject, response) {
  var validateStatus = response.config.validateStatus;
  // Note: status is not exposed by XDomainRequest
  if (!response.status || !validateStatus || validateStatus(response.status)) {
    resolve(response);
  } else {
    reject(createError(
      'Request failed with status code ' + response.status,
      response.config,
      null,
      response.request,
      response
    ));
  }
};

},{"./createError":14}],18:[function(require,module,exports){
'use strict';

var utils = require('./../utils');

/**
 * Transform the data for a request or a response
 *
 * @param {Object|String} data The data to be transformed
 * @param {Array} headers The headers for the request or response
 * @param {Array|Function} fns A single function or Array of functions
 * @returns {*} The resulting transformed data
 */
module.exports = function transformData(data, headers, fns) {
  /*eslint no-param-reassign:0*/
  utils.forEach(fns, function transform(fn) {
    data = fn(data, headers);
  });

  return data;
};

},{"./../utils":30}],19:[function(require,module,exports){
(function (process){
'use strict';

var utils = require('./utils');
var normalizeHeaderName = require('./helpers/normalizeHeaderName');

var DEFAULT_CONTENT_TYPE = {
  'Content-Type': 'application/x-www-form-urlencoded'
};

function setContentTypeIfUnset(headers, value) {
  if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
    headers['Content-Type'] = value;
  }
}

function getDefaultAdapter() {
  var adapter;
  if (typeof XMLHttpRequest !== 'undefined') {
    // For browsers use XHR adapter
    adapter = require('./adapters/xhr');
  } else if (typeof process !== 'undefined') {
    // For node use HTTP adapter
    adapter = require('./adapters/http');
  }
  return adapter;
}

var defaults = {
  adapter: getDefaultAdapter(),

  transformRequest: [function transformRequest(data, headers) {
    normalizeHeaderName(headers, 'Content-Type');
    if (utils.isFormData(data) ||
      utils.isArrayBuffer(data) ||
      utils.isBuffer(data) ||
      utils.isStream(data) ||
      utils.isFile(data) ||
      utils.isBlob(data)
    ) {
      return data;
    }
    if (utils.isArrayBufferView(data)) {
      return data.buffer;
    }
    if (utils.isURLSearchParams(data)) {
      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
      return data.toString();
    }
    if (utils.isObject(data)) {
      setContentTypeIfUnset(headers, 'application/json;charset=utf-8');
      return JSON.stringify(data);
    }
    return data;
  }],

  transformResponse: [function transformResponse(data) {
    /*eslint no-param-reassign:0*/
    if (typeof data === 'string') {
      try {
        data = JSON.parse(data);
      } catch (e) { /* Ignore */ }
    }
    return data;
  }],

  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,

  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',

  maxContentLength: -1,

  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  }
};

defaults.headers = {
  common: {
    'Accept': 'application/json, text/plain, */*'
  }
};

utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
  defaults.headers[method] = {};
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
});

module.exports = defaults;

}).call(this,require('_process'))
},{"./adapters/http":7,"./adapters/xhr":7,"./helpers/normalizeHeaderName":27,"./utils":30,"_process":32}],20:[function(require,module,exports){
'use strict';

module.exports = function bind(fn, thisArg) {
  return function wrap() {
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }
    return fn.apply(thisArg, args);
  };
};

},{}],21:[function(require,module,exports){
'use strict';

// btoa polyfill for IE<10 courtesy https://github.com/davidchambers/Base64.js

var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

function E() {
  this.message = 'String contains an invalid character';
}
E.prototype = new Error;
E.prototype.code = 5;
E.prototype.name = 'InvalidCharacterError';

function btoa(input) {
  var str = String(input);
  var output = '';
  for (
    // initialize result and counter
    var block, charCode, idx = 0, map = chars;
    // if the next str index does not exist:
    //   change the mapping table to "="
    //   check if d has no fractional digits
    str.charAt(idx | 0) || (map = '=', idx % 1);
    // "8 - idx % 1 * 8" generates the sequence 2, 4, 6, 8
    output += map.charAt(63 & block >> 8 - idx % 1 * 8)
  ) {
    charCode = str.charCodeAt(idx += 3 / 4);
    if (charCode > 0xFF) {
      throw new E();
    }
    block = block << 8 | charCode;
  }
  return output;
}

module.exports = btoa;

},{}],22:[function(require,module,exports){
'use strict';

var utils = require('./../utils');

function encode(val) {
  return encodeURIComponent(val).
    replace(/%40/gi, '@').
    replace(/%3A/gi, ':').
    replace(/%24/g, '$').
    replace(/%2C/gi, ',').
    replace(/%20/g, '+').
    replace(/%5B/gi, '[').
    replace(/%5D/gi, ']');
}

/**
 * Build a URL by appending params to the end
 *
 * @param {string} url The base of the url (e.g., http://www.google.com)
 * @param {object} [params] The params to be appended
 * @returns {string} The formatted url
 */
module.exports = function buildURL(url, params, paramsSerializer) {
  /*eslint no-param-reassign:0*/
  if (!params) {
    return url;
  }

  var serializedParams;
  if (paramsSerializer) {
    serializedParams = paramsSerializer(params);
  } else if (utils.isURLSearchParams(params)) {
    serializedParams = params.toString();
  } else {
    var parts = [];

    utils.forEach(params, function serialize(val, key) {
      if (val === null || typeof val === 'undefined') {
        return;
      }

      if (utils.isArray(val)) {
        key = key + '[]';
      } else {
        val = [val];
      }

      utils.forEach(val, function parseValue(v) {
        if (utils.isDate(v)) {
          v = v.toISOString();
        } else if (utils.isObject(v)) {
          v = JSON.stringify(v);
        }
        parts.push(encode(key) + '=' + encode(v));
      });
    });

    serializedParams = parts.join('&');
  }

  if (serializedParams) {
    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }

  return url;
};

},{"./../utils":30}],23:[function(require,module,exports){
'use strict';

/**
 * Creates a new URL by combining the specified URLs
 *
 * @param {string} baseURL The base URL
 * @param {string} relativeURL The relative URL
 * @returns {string} The combined URL
 */
module.exports = function combineURLs(baseURL, relativeURL) {
  return relativeURL
    ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
    : baseURL;
};

},{}],24:[function(require,module,exports){
'use strict';

var utils = require('./../utils');

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs support document.cookie
  (function standardBrowserEnv() {
    return {
      write: function write(name, value, expires, path, domain, secure) {
        var cookie = [];
        cookie.push(name + '=' + encodeURIComponent(value));

        if (utils.isNumber(expires)) {
          cookie.push('expires=' + new Date(expires).toGMTString());
        }

        if (utils.isString(path)) {
          cookie.push('path=' + path);
        }

        if (utils.isString(domain)) {
          cookie.push('domain=' + domain);
        }

        if (secure === true) {
          cookie.push('secure');
        }

        document.cookie = cookie.join('; ');
      },

      read: function read(name) {
        var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
        return (match ? decodeURIComponent(match[3]) : null);
      },

      remove: function remove(name) {
        this.write(name, '', Date.now() - 86400000);
      }
    };
  })() :

  // Non standard browser env (web workers, react-native) lack needed support.
  (function nonStandardBrowserEnv() {
    return {
      write: function write() {},
      read: function read() { return null; },
      remove: function remove() {}
    };
  })()
);

},{"./../utils":30}],25:[function(require,module,exports){
'use strict';

/**
 * Determines whether the specified URL is absolute
 *
 * @param {string} url The URL to test
 * @returns {boolean} True if the specified URL is absolute, otherwise false
 */
module.exports = function isAbsoluteURL(url) {
  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
  // by any combination of letters, digits, plus, period, or hyphen.
  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
};

},{}],26:[function(require,module,exports){
'use strict';

var utils = require('./../utils');

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs have full support of the APIs needed to test
  // whether the request URL is of the same origin as current location.
  (function standardBrowserEnv() {
    var msie = /(msie|trident)/i.test(navigator.userAgent);
    var urlParsingNode = document.createElement('a');
    var originURL;

    /**
    * Parse a URL to discover it's components
    *
    * @param {String} url The URL to be parsed
    * @returns {Object}
    */
    function resolveURL(url) {
      var href = url;

      if (msie) {
        // IE needs attribute set twice to normalize properties
        urlParsingNode.setAttribute('href', href);
        href = urlParsingNode.href;
      }

      urlParsingNode.setAttribute('href', href);

      // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
      return {
        href: urlParsingNode.href,
        protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
        host: urlParsingNode.host,
        search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
        hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
        hostname: urlParsingNode.hostname,
        port: urlParsingNode.port,
        pathname: (urlParsingNode.pathname.charAt(0) === '/') ?
                  urlParsingNode.pathname :
                  '/' + urlParsingNode.pathname
      };
    }

    originURL = resolveURL(window.location.href);

    /**
    * Determine if a URL shares the same origin as the current location
    *
    * @param {String} requestURL The URL to test
    * @returns {boolean} True if URL shares the same origin, otherwise false
    */
    return function isURLSameOrigin(requestURL) {
      var parsed = (utils.isString(requestURL)) ? resolveURL(requestURL) : requestURL;
      return (parsed.protocol === originURL.protocol &&
            parsed.host === originURL.host);
    };
  })() :

  // Non standard browser envs (web workers, react-native) lack needed support.
  (function nonStandardBrowserEnv() {
    return function isURLSameOrigin() {
      return true;
    };
  })()
);

},{"./../utils":30}],27:[function(require,module,exports){
'use strict';

var utils = require('../utils');

module.exports = function normalizeHeaderName(headers, normalizedName) {
  utils.forEach(headers, function processHeader(value, name) {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = value;
      delete headers[name];
    }
  });
};

},{"../utils":30}],28:[function(require,module,exports){
'use strict';

var utils = require('./../utils');

// Headers whose duplicates are ignored by node
// c.f. https://nodejs.org/api/http.html#http_message_headers
var ignoreDuplicateOf = [
  'age', 'authorization', 'content-length', 'content-type', 'etag',
  'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since',
  'last-modified', 'location', 'max-forwards', 'proxy-authorization',
  'referer', 'retry-after', 'user-agent'
];

/**
 * Parse headers into an object
 *
 * ```
 * Date: Wed, 27 Aug 2014 08:58:49 GMT
 * Content-Type: application/json
 * Connection: keep-alive
 * Transfer-Encoding: chunked
 * ```
 *
 * @param {String} headers Headers needing to be parsed
 * @returns {Object} Headers parsed into an object
 */
module.exports = function parseHeaders(headers) {
  var parsed = {};
  var key;
  var val;
  var i;

  if (!headers) { return parsed; }

  utils.forEach(headers.split('\n'), function parser(line) {
    i = line.indexOf(':');
    key = utils.trim(line.substr(0, i)).toLowerCase();
    val = utils.trim(line.substr(i + 1));

    if (key) {
      if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
        return;
      }
      if (key === 'set-cookie') {
        parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);
      } else {
        parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
      }
    }
  });

  return parsed;
};

},{"./../utils":30}],29:[function(require,module,exports){
'use strict';

/**
 * Syntactic sugar for invoking a function and expanding an array for arguments.
 *
 * Common use case would be to use `Function.prototype.apply`.
 *
 *  ```js
 *  function f(x, y, z) {}
 *  var args = [1, 2, 3];
 *  f.apply(null, args);
 *  ```
 *
 * With `spread` this example can be re-written.
 *
 *  ```js
 *  spread(function(x, y, z) {})([1, 2, 3]);
 *  ```
 *
 * @param {Function} callback
 * @returns {Function}
 */
module.exports = function spread(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
};

},{}],30:[function(require,module,exports){
'use strict';

var bind = require('./helpers/bind');
var isBuffer = require('is-buffer');

/*global toString:true*/

// utils is a library of generic helper functions non-specific to axios

var toString = Object.prototype.toString;

/**
 * Determine if a value is an Array
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Array, otherwise false
 */
function isArray(val) {
  return toString.call(val) === '[object Array]';
}

/**
 * Determine if a value is an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
 */
function isArrayBuffer(val) {
  return toString.call(val) === '[object ArrayBuffer]';
}

/**
 * Determine if a value is a FormData
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an FormData, otherwise false
 */
function isFormData(val) {
  return (typeof FormData !== 'undefined') && (val instanceof FormData);
}

/**
 * Determine if a value is a view on an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
 */
function isArrayBufferView(val) {
  var result;
  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
    result = ArrayBuffer.isView(val);
  } else {
    result = (val) && (val.buffer) && (val.buffer instanceof ArrayBuffer);
  }
  return result;
}

/**
 * Determine if a value is a String
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a String, otherwise false
 */
function isString(val) {
  return typeof val === 'string';
}

/**
 * Determine if a value is a Number
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Number, otherwise false
 */
function isNumber(val) {
  return typeof val === 'number';
}

/**
 * Determine if a value is undefined
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if the value is undefined, otherwise false
 */
function isUndefined(val) {
  return typeof val === 'undefined';
}

/**
 * Determine if a value is an Object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Object, otherwise false
 */
function isObject(val) {
  return val !== null && typeof val === 'object';
}

/**
 * Determine if a value is a Date
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Date, otherwise false
 */
function isDate(val) {
  return toString.call(val) === '[object Date]';
}

/**
 * Determine if a value is a File
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a File, otherwise false
 */
function isFile(val) {
  return toString.call(val) === '[object File]';
}

/**
 * Determine if a value is a Blob
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Blob, otherwise false
 */
function isBlob(val) {
  return toString.call(val) === '[object Blob]';
}

/**
 * Determine if a value is a Function
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Function, otherwise false
 */
function isFunction(val) {
  return toString.call(val) === '[object Function]';
}

/**
 * Determine if a value is a Stream
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Stream, otherwise false
 */
function isStream(val) {
  return isObject(val) && isFunction(val.pipe);
}

/**
 * Determine if a value is a URLSearchParams object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
 */
function isURLSearchParams(val) {
  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
}

/**
 * Trim excess whitespace off the beginning and end of a string
 *
 * @param {String} str The String to trim
 * @returns {String} The String freed of excess whitespace
 */
function trim(str) {
  return str.replace(/^\s*/, '').replace(/\s*$/, '');
}

/**
 * Determine if we're running in a standard browser environment
 *
 * This allows axios to run in a web worker, and react-native.
 * Both environments support XMLHttpRequest, but not fully standard globals.
 *
 * web workers:
 *  typeof window -> undefined
 *  typeof document -> undefined
 *
 * react-native:
 *  navigator.product -> 'ReactNative'
 */
function isStandardBrowserEnv() {
  if (typeof navigator !== 'undefined' && navigator.product === 'ReactNative') {
    return false;
  }
  return (
    typeof window !== 'undefined' &&
    typeof document !== 'undefined'
  );
}

/**
 * Iterate over an Array or an Object invoking a function for each item.
 *
 * If `obj` is an Array callback will be called passing
 * the value, index, and complete array for each item.
 *
 * If 'obj' is an Object callback will be called passing
 * the value, key, and complete object for each property.
 *
 * @param {Object|Array} obj The object to iterate
 * @param {Function} fn The callback to invoke for each item
 */
function forEach(obj, fn) {
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    return;
  }

  // Force an array if not already something iterable
  if (typeof obj !== 'object') {
    /*eslint no-param-reassign:0*/
    obj = [obj];
  }

  if (isArray(obj)) {
    // Iterate over array values
    for (var i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj);
      }
    }
  }
}

/**
 * Accepts varargs expecting each argument to be an object, then
 * immutably merges the properties of each object and returns result.
 *
 * When multiple objects contain the same key the later object in
 * the arguments list will take precedence.
 *
 * Example:
 *
 * ```js
 * var result = merge({foo: 123}, {foo: 456});
 * console.log(result.foo); // outputs 456
 * ```
 *
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */
function merge(/* obj1, obj2, obj3, ... */) {
  var result = {};
  function assignValue(val, key) {
    if (typeof result[key] === 'object' && typeof val === 'object') {
      result[key] = merge(result[key], val);
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}

/**
 * Extends object a by mutably adding to it the properties of object b.
 *
 * @param {Object} a The object to be extended
 * @param {Object} b The object to copy properties from
 * @param {Object} thisArg The object to bind function to
 * @return {Object} The resulting value of object a
 */
function extend(a, b, thisArg) {
  forEach(b, function assignValue(val, key) {
    if (thisArg && typeof val === 'function') {
      a[key] = bind(val, thisArg);
    } else {
      a[key] = val;
    }
  });
  return a;
}

module.exports = {
  isArray: isArray,
  isArrayBuffer: isArrayBuffer,
  isBuffer: isBuffer,
  isFormData: isFormData,
  isArrayBufferView: isArrayBufferView,
  isString: isString,
  isNumber: isNumber,
  isObject: isObject,
  isUndefined: isUndefined,
  isDate: isDate,
  isFile: isFile,
  isBlob: isBlob,
  isFunction: isFunction,
  isStream: isStream,
  isURLSearchParams: isURLSearchParams,
  isStandardBrowserEnv: isStandardBrowserEnv,
  forEach: forEach,
  merge: merge,
  extend: extend,
  trim: trim
};

},{"./helpers/bind":20,"is-buffer":31}],31:[function(require,module,exports){
/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */

// The _isBuffer check is for Safari 5-7 support, because it's missing
// Object.prototype.constructor. Remove this eventually
module.exports = function (obj) {
  return obj != null && (isBuffer(obj) || isSlowBuffer(obj) || !!obj._isBuffer)
}

function isBuffer (obj) {
  return !!obj.constructor && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj)
}

// For Node v0.10 support. Remove this eventually.
function isSlowBuffer (obj) {
  return typeof obj.readFloatLE === 'function' && typeof obj.slice === 'function' && isBuffer(obj.slice(0, 0))
}

},{}],32:[function(require,module,exports){
// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}]},{},[1])(1)
});
