import {LEVELS}   from '@/constants/levels';
import axios      from 'axios';
import {EventBus} from '@/eventBus';

const provider = axios.create({
    baseURL: process.env.VUE_APP_SERVICE,
});

provider.interceptors.response.use(null, error => {
    EventBus.$emit('showMessage', {
        message: 'Что-то пошло не так: ' + error.response.data,
        level:   LEVELS.error,
    });
});
export default provider;