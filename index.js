require('dotenv').config();
const fs = require("fs");
const { parse } = require("csv-parse");
const api = require('./ea-api');

async function main() {
    let groups = await api.getGroups();
    teams = groups.filter(({ attributes }) => attributes.level === 'Team')
        .map(team => ({ id: team.id, name: team.attributes.name }));

    fs.createReadStream("./agents.csv")
        .pipe(parse({ delimiter: ",", from_line: 2 }))
        .on("data", ([agent, requestedTeam]) => setAgentsTeam(teams, agent, requestedTeam));
}

async function setAgentsTeam(teams, agent, requestedTeam) {
    console.log('Attempting to move ' + agent + ' to ' + requestedTeam);

    const matchedTeam = teams.find(({ name }) => name === requestedTeam);
    if (!matchedTeam) {
        console.error('No team found named ' + requestedTeam);
        return;
    }

    let user = await api.getUserByUsername(agent);
    if (!user) {
        console.error('No user found with username ' + agent);
        return;
    }
    let agentId = user.id;
    let currentTeamId = user.relationships['agent-team'].data.id;

    if (currentTeamId === matchedTeam.id) {
        console.log('Agent already in ' + matchedTeam.name);
        return;
    }

    let update = await api.moveUserToTeam(agentId, matchedTeam.id);

    if (update.status === 200) {
        console.log('Successfully moved ' + agent + ' to ' + matchedTeam.name);
    }
}

main();