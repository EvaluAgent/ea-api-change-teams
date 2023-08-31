# EvaluAgent API Example - Change teams

An example in JavaScript of how to move agents between teams using the EvaluAgent API.

## Installation

Requires an installation of node.js to run.

Enter `npm install` in a terminal to install the required dependencies.

Create an API key and secret in EvaluAgent. See the following guide for details on how to do this. https://support.evaluagent.com/hc/en-us/articles/4402423299985

Copy the `.env.example` file to `.env` and paste in the key and secret that were generate in the previous step. You may also need to change the `API_BASE_URL` depending on your region. See the following documentation for this https://docs.evaluagent.com/#section/Introduction/Evaluagent-API

## Usage

Populate the `agents.csv` file with a list of agent usernames and their respective new teams.

Run the code by entering `node index.js` in the terminal.

You should see output similar to the following.

```
Attempting to move aairah.garza@evaluagent.co to Team Orange
Attempting to move Dolly.Kreiger637d21a122d28@sandbox-evaluagent.com to Team Orange
No user found with username aairah.garza@evaluagent.co
Agent already in Team Orange
```
