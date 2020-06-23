import axios, { AxiosResponse, AxiosRequestConfig } from 'axios';
import { ApiConfig } from '../config/api.config';

export default function api(
    path: string, 
    method: 'get' | 'post' | 'patch' | 'delete',
    body: any | undefined, 
    role: 'user' | 'administrator' ='user'
    )
    {
        return new Promise<ApiResponse>((resolve) =>{
            const requestData = {
                method: method,
                url: path,
                baseURL: ApiConfig.API_URL,
                data: JSON.stringify(body),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': getToken(),
                }, 
            };

        axios(requestData)
        .then(res => responseHandler(res,resolve))
        .catch(err => {
            const response: ApiResponse = {
                status: 'error',
                data: null
            };

            resolve(response); });
        });
}

export interface ApiResponse {
        status: 'ok' | 'error' |'login';
        data: any;
}

    function responseHandler(
        res: AxiosResponse<any>,
        resolve: (value?: ApiResponse) => void,
        ){
            if(res.status <200 || res.status >=300){
                //STATUS CODE -401 - Bad Token
                //TODO: ....
                /*if(res.status === -401){
                    refreshToken(requestData,resolve);
                }*/


                const response: ApiResponse ={
                    status: 'error',
                    data: res.data
                };
                return resolve(response);
            }
            const response: ApiResponse = {
                status: 'ok',
                data: res.data,
            };

            resolve(response); //OVDE JE STAJALO resolve(res.data) i zbog toga mi nije radio log in :(
    }

    function getToken(): string {
        const token = localStorage.getItem('api_token');
        return 'Berer ' + token;
    }

    export function saveToken(token: string){
        localStorage.setItem('api_token',token);
    }

    /*function refreshToken(requestData: AxiosRequestConfig, resolve: (value?: unknown) => void): string | null{

    }*/