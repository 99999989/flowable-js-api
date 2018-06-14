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