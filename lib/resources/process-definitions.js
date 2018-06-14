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