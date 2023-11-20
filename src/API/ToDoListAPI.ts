import axios, { AxiosError } from "axios";
import { Item } from "../App"
const url = "https://onlinetodolist.onrender.com"
export const getPublicList = async (listid: string) => {
    try {
        console.log(listid);

        const response = await axios.get(`${url}/getPublicList`, {
            headers: { listid: listid }
        });
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const axiosError = error as AxiosError;

            if (axiosError.response?.status === 404) {
                console.log('List not found. Handling 404 error...');
                return { ok: false, msg: 'List not found.' };
            }
        }
        console.error(error);
        return { ok: false, msg: 'Error getting public list.' };
    }
}
export const addToList = async (listid: string, listitem: Item) => {
    try {
        const response = await axios.post(`${url}/addToList`, { data: { listid: listid, listitem: listitem } });
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const axiosError = error as AxiosError;

            if (axiosError.response?.status === 404) {
                console.log('List not found. Handling 404 error...');
                return { ok: false, msg: 'List not found.' };
            }
        }
        console.error(error);
        return { ok: false, msg: 'Error adding to the list.' };
    }
}
export const deleteFromList = async (listid: string, listitemid: Item["id"]) => {
    try {
        const response = await axios.delete(`${url}/deleteFromList`, { data: { listid: listid, listitemid: listitemid } });
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const axiosError = error as AxiosError;

            if (axiosError.response?.status === 404) {
                console.log('List not found. Handling 404 error...');
                return { ok: false, msg: 'List not found.' };
            }
        }
        console.error(error);
        return { ok: false, msg: 'Error deleting from the list.' };
    }
}
export const fromLocalToPublicList = async (listItems: Item[]) => {
    try {
        console.log(listItems);

        const response = await axios.post(`${url}/fromLocalToPublicList`, { data: { listItems: listItems } });
        return response.data;
    } catch (error) {
        console.error(error);
        return { ok: false, msg: 'Error converting local list to public list.' };
    }
}

export const deletePublicList = async (listId: string) => {
    try {
        const response = await axios.delete(`${url}/deletePublicList`, { data: { listId: listId } });
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const axiosError = error as AxiosError;

            if (axiosError.response?.status === 404) {
                console.log('List not found. Handling 404 error...');
                return { ok: false, msg: 'List not found.' };
            }
        }
        console.error(error);
        return { ok: false, msg: 'Error deleting public list.' };
    }
}

export const changeCompletedTask = async (listid: string, listitemid: Item["id"], completedBoolean: boolean) => {
    try {
        console.log(listid, listitemid, completedBoolean);
        
        const response = await axios.post(`${url}/changeCompletedTask`, { data: { listid: listid, listitemid: listitemid, completedBoolean: completedBoolean } });
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const axiosError = error as AxiosError;

            if (axiosError.response?.status === 404) {
                console.log('List not found. Handling 404 error...');
                return { ok: false, msg: 'List not found.' };
            }
        }
        console.error(error);
        return { ok: false, msg: 'Error updating the list.' };
    }
}