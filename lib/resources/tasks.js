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