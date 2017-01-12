import axios from 'axios';

import { apiPrefix } from '../../etc/config';

export default {
    listStatements(date) {
        return axios.get(`${apiPrefix}/messagesList.json/${date}`);
    },

    createStatement(statement) {
        return axios.post(`${apiPrefix}/addMessage`, statement);
    },

    deleteStatement(idMessage) {
        return axios.delete(`${apiPrefix}/delMessage/${idMessage}`);
    },

    listEmployees(){
        return axios.get(`${apiPrefix}/employeeList.json`);
    }
}
