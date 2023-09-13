import { AxiosResponse } from "axios";
import axiosInstance from "./axiosInstance"

// export async function loginRequest(url: string, {arg}: {arg: {email: string; password: string;}}): Promise<AxiosResponse<any>> {
//     return axiosInstance.post(url, arg)
// }

export const authRequest = async (url: string, {arg}: {arg: {email: string; password: string; name?: string; role?: string}})
    : Promise<AxiosResponse<any>> => {
        return axiosInstance.post(url, arg)
    }

export const sendGetReq = async (url: string, id?: number)
    : Promise<AxiosResponse<any>> => {
    return await axiosInstance.get(url);
}

export const sendPostReq = async (url: string, {arg}: {arg: any})
    : Promise<AxiosResponse<any>> => {
        console.log(!!arg)
    return await axiosInstance.post(url, arg);
}

export const sendPostNoDataReq = async (url: string)
    : Promise<AxiosResponse<any>> => {
    return await axiosInstance.post(url);
}

export const sendPatchReq = async (url: string, {arg}: {arg: any}) 
    : Promise<AxiosResponse<any>> => {
    return await axiosInstance.put(url, arg);
}

export const sendDeleteReq = async (url: string)
    : Promise<AxiosResponse<any>> => {
    return await axiosInstance.delete(url);
}