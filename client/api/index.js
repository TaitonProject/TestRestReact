import axios from 'axios';

import { apiPrefix } from '../../etc/config';

export default {
    listNotes(date) {
        return axios.get(`${apiPrefix}/messagesList.json/${date}`);
    },

    createNote(data) {
        return axios.post(`${apiPrefix}/addMessage`, data);
    },

    deleteNote(idMessage) {
        return axios.delete(`${apiPrefix}/delMessage/${idMessage}`);
    },

    listEmployees(){
        return axios.get(`${apiPrefix}/employeeList.json`);
    }
}

/*
const myApi = axios.create({
    baseURL: 'http://someUrl/someEndpoint',
    timeout: 10000,
    withCredentials: true,
    transformRequest: [(data) => JSON.stringify(data.data)],
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    }
});*/
