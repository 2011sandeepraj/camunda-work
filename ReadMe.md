# 1. Set up Camunda Server

Read documentation at https://docs.camunda.org/get-started/quick-start/install/

```docker pull camunda/camunda-bpm-platform:latest
docker run -d --name camunda -p 8082:8080 camunda/camunda-bpm-platform:latest
```

Server cockpit can be seen here
http://localhost:8082/camunda/app/cockpit/default/#/dashboard

# 2. Download Camunda Modeller

Load the Odd_Even.bpmn file from the project code

Click on Deploy Icon and point it to your local camunda server at http://localhost:8082/engine-rest

Refresh the Camunda Server to see the processes here
http://localhost:8082/camunda/app/cockpit/default/#/dashboard

You should see the deployed process instance

# 3. Postman

Do a post call to https://localhost:8082/engine-rest/process-definition/key/odd-even/start from postman
Header: Content-Type: application/json
Body: {
"variables": {
"value_1": {
"value": 11,
"type": "integer"
}
}
}

You will notice in the Camunda Server Cockpit Dashboard that the workflow is waiting at step 1 to be moving forward

# 4. Deploy a client and subscribe to the topic of the Odd Even

cd to the current folder and run `npm install` and then run `node ./worker.js`

# 5. Post another request and the workflow should complete.
