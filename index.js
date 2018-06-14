'use strict';

const flowableAPI = require('./lib/index')({
    apiUri: 'http://localhost:8080',
    auth: {
        username: 'admin',
        password: 'test'
    }
});

flowableAPI.processDefinitions.getProcessDefinitions({name: 'Create timers process'})
    .then(processDefinitions => {

        console.table(processDefinitions.data.data);

        return flowableAPI.processDefinitions.getProcessDefinitionById(processDefinitions.data.data[0].id);
    })
    .then(processDefinition => {

        console.table(processDefinition.data, ['property', 'value']);

        return flowableAPI.processDefinitions.getDecisionTables(processDefinition.data.id).then(decisionTables => {

            console.table(decisionTables.data.data, ['property', 'value']);

            return flowableAPI.processDefinitions.executeAction(processDefinition.data.id, {action: 'suspend'});
        });
    })
    .then(actionResult => {
        console.table(actionResult, ['property', 'value'])
    }).catch(error => console.log(error));
