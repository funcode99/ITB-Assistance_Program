import { useStore } from 'vuex';
import Api from '@/utils/Api';
import router from '@/router';

const setTrial = async () => {
    
    const store = useStore()
    // store.commit('isLoading', true)
    const token = JSON.parse(localStorage.getItem('token'))
    Api.defaults.headers.common.Authorization = `Bearer ${token}`;
    const api = await Api.post('/set-trial')
    // store.commit('isLoading', false)
    router.push('/home')
}

export default setTrial