import Axios from 'axios';
import store from '../redux/configureStore';

const baseURL = 'https://vocal-circle-307219.nn.r.appspot.com/api/';

const createGet = (url: string): Promise<any> => (
  new Promise((resolve, reject) => {
    try {
      const { state: { user: { accessToken } } } = store.getState();
      Axios.get(`${baseURL}${url}`, { headers: { Authorization: accessToken } }).then(response => resolve(response));
    } catch (ex) {
      reject(ex);
    }
  })
);

const createPost = (url: string, data: any, headers: any = {}): Promise<any> => (
  new Promise((resolve, reject) => {
    try {
      const { state: { user: { accessToken } } } = store.getState();
      Axios.post(`${baseURL}${url}`, data, { headers: { ...headers, Authorization: accessToken } })
        .then(response => resolve(response));
    } catch (ex) {
      reject(ex);
    }
  })
);

const createPut = (url: string, data: any): Promise<any> => (
  new Promise((resolve, reject) => {
    try {
      const { state: { user: { accessToken } } } = store.getState();
      Axios.put(`${baseURL}${url}`, data, { headers: { Authorization: accessToken } }).then(response => resolve(response));
    } catch (ex) {
      reject(ex);
    }
  })
);

export default {
  callUserRegister: (data: any, headers: any = {}) => createPost('/signup', data, headers),
  callUserLogin: (data: any, headers: any = {}): Promise<any> => createPost('/signin', data, headers),
  callConfigurationUpdate: (id: number, data: any) => createPut(`/configurations/${id}`, data),
  callGetUserProfile: (id: number) => createGet(`/profile/${id}`),
  callGetUsers: () => createGet('/profiles'),
  callGetConfigurations: () => createGet('/configurations'),
};
