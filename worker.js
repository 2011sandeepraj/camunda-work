const { Client, logger, Variables, KeycloakAuthInterceptor } = require('camunda-external-task-client-js');
const open = require('open');

const keycloakAuthentication = new KeycloakAuthInterceptor({
  tokenEndpoint: "https://dev.oidc.gov.bc.ca/auth/realms/jxoe2o46/protocol/openid-connect/token",
  clientId: "forms-flow-bpm",
  clientSecret: "ac7e06f8-b47c-40d5-90fa-32273835504f"
});

// configuration for the Client:
//  - 'baseUrl': url to the Process Engine
//  - 'logger': utility to automatically log important events
//  - 'asyncResponseTimeout': long polling timeout (then a new request will be issued)
const config = {
    //baseUrl: 'https://dev-aest-ffa-bpm.apps.silver.devops.gov.bc.ca/camunda/engine-rest',
    baseUrl: "http://localhost:8082/engine-rest",
    //interceptors: keycloakAuthentication,
    use: logger, asyncResponseTimeout: 10000 };

// create a Client instance with custom configuration
const client = new Client(config);

client.subscribe('odd_or_even', async function({ task, taskService }) {
  console.log("Started odd_or_even: ", task.id);
  const value1 = parseInt(task.variables.get("value_1"));
  const oddOrEvenResult = value1 % 2 === 0 ? "even" : "odd";
  console.log(`The number ${value1} is ${oddOrEvenResult}`);
  const vars = new Variables();
  vars.set("number_type", oddOrEvenResult);
  await taskService.complete(task, vars);
  console.log("Finished odd_or_even: ", task.id);
});

client.subscribe('persist-result', async function({ task, taskService }) {
  const resultValue = task.variables.get('result_value');
  console.log(`Result: ${resultValue} for ${task.id}`);
  await taskService.complete(task);
});

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}