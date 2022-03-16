import api from '@/services/api';

export default {
    async fetchPersons() {
        const resp = await api.get('/');
        return resp ? resp.data : [];

    },
    async postPerson(person) {
        const resp = await api.post('/', person);
        return resp?.data;
    },
    async removePerson(uuid) {
        const resp = await api.delete(`/${uuid}`);
        return resp?.data;
    },
    async updatePerson({uuid, firstName, secondName}) {
        const resp = await api.put(`/${uuid}`, {firstName, secondName});
        return resp?.data;
    },
};