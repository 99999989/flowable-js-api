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