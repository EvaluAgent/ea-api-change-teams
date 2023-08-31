require('dotenv').config();
const axios = require('axios');

const { API_KEY, API_SECRET, API_BASE_URL } = process.env;

const eaApi = axios.create({
    baseURL: API_BASE_URL + '/v1/',
    auth: {
        username: API_KEY,
        password: API_SECRET,
    }
});

async function getGroups() {
    let groupResponse = await eaApi.get('org/groups');
    return groupResponse.data.data;
}

async function getUserByUsername(username) {
    let agentResponse = await eaApi.get('org/users?filter[username]=' + username);

    return agentResponse.data.data[0];
}

async function updateUser(userId, data) {
    return await eaApi.patch('org/users/' + userId, { data });
}

async function moveUserToTeam(userId, teamId) {
    let payload = {
        type: 'users',
        id: userId,
        relationships: {
            'agent-team': {
                data: {
                    id: teamId,
                    type: "groups"
                }
            }
        }
    }

    return await updateUser(userId, payload);
}

module.exports = { getGroups, getUserByUsername, updateUser, moveUserToTeam };