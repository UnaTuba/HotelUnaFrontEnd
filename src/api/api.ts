import axios, { AxiosResponse, AxiosRequestConfig } from 'axios';
import { ApiConfig } from '../config/api.config';

export default function api(
    path: string, 
    method: 'get' | 'post' | 'patch' | 'delete',
    body: any | undefined,)
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
        .then(res => responseHandler(res,resolve, requestData))
        .catch(err => {
            const response: ApiResponse = {
                status: 'error',
                data: err
            };

            resolve(response); });
        });
    }

    export interface ApiResponse {
        status: 'ok' | 'error';
        data: any;
    }

    function responseHandler(
        res: AxiosResponse<any>,
        resolve: (value?: ApiResponse) => void,
        requestData: AxiosRequestConfig,
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
            if(res.data.statusCode < 0){
                const response: ApiResponse ={
                    status: 'ok',
                    data: res.data
                };

                return resolve(response);
            }

            resolve(res.data);
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