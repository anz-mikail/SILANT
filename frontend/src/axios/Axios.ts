import axios from "axios";
import {MachineModel} from '../models/models'


export const API_URL = 'http://localhost:8000/api/';

const API = axios.create({
    baseURL: API_URL,
    headers: {},
})

API.interceptors.request.use((config) => {
    config.headers.Authorization = localStorage.getItem('token')
    return config;
})

export default class AxiosService{
    static getAuthorization(text:any): Promise<any> {
        const url = `${API_URL}authorization/`;
        return axios.post(url, text).then(response => response.data);
    }
    static getMachine(): Promise<any> {
        const url = `${API_URL}machine/`;
        return API.get<MachineModel>(url).then(response => response.data);
    }
    static getMachineId(text:any): Promise<any> {
        const url = `${API_URL}machine_id/`;
        return axios.post<any>(url, text);
    }
    static getMachineList(): Promise<any> {
        const url = `${API_URL}machine/list/`;
        return API.get<MachineModel>(url).then(response => response.data);
    }
    static postMachine(text:any): Promise<any> {
        const url = `${API_URL}machine/`;
        return API.post<any>(url, text);
    }
    static createMachine(text:any): Promise<any> {
        const url = `${API_URL}machine/create/`;
        return API.post<any>(url, text);
    }
    static getMachineCategory(): Promise<any> {
        const url = `${API_URL}machine/category/`;
        return API.get<any>(url).then(response => response.data);
    }
    static deleteMachine(list_id:any): Promise<any> {
        const url = `${API_URL}machine/delete/`;
        return API.post<any>(url, list_id);
    }


    static getService(): Promise<any> {
        const url = `${API_URL}service/`;
        return API.get<any>(url).then(response => response.data);
    }
    static postService(text:any): Promise<any> {
        const url = `${API_URL}service/`;
        return API.post<any>(url, text);
    }
    static createService(text:any): Promise<any> {
        const url = `${API_URL}service/create/`;
        return API.post<any>(url, text);
    }
    static getServiceCategory(): Promise<any> {
        const url = `${API_URL}service/category/`;
        return API.get<any>(url).then(response => response.data);
    }
    static deleteService(list_id:any): Promise<any> {
        const url = `${API_URL}service/delete/`;
        return API.post<any>(url, list_id);
    }


    static getComplaint(): Promise<any> {
        const url = `${API_URL}complaint/`;
        return API.get<any>(url).then(response => response.data);
    }
    static postComplaint(text:any): Promise<any> {
        const url = `${API_URL}complaint/`;
        return API.post<any>(url, text);
    }
    static createComplaint(text:any): Promise<any> {
        const url = `${API_URL}complaint/create/`;
        return API.post<any>(url, text);
    }
    static getComplaintCategory(): Promise<any> {
        const url = `${API_URL}complaint/category/`;
        return API.get<any>(url).then(response => response.data);
    }
    static deleteComplaint(list_id:any): Promise<any> {
        const url = `${API_URL}complaint/delete/`;
        return API.post<any>(url, list_id);
    }


    static ChangeCategory(text:any): Promise<any> {
        const url = `${API_URL}machine/category/`;
        return API.post<any>(url, text);
    }
    static CreateCategory(text:any): Promise<any> {
        const url = `${API_URL}category/create/`;
        return API.post<any>(url, text);
    }
    static deleteCategory(text:any): Promise<any> {
        const url = `${API_URL}category/delete/`;
        return API.post<any>(url, text);
    }

}
