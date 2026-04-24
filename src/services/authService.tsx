import axios from 'axios';
import * as Yup from "yup";


export const changePassSchema = Yup.object().shape({
    newPassword: Yup.string().required("گذرواژه جدید").min(6, "حداعقل طول گذرواژه 6 هست"),
    confirmNewPassword: Yup.string().required('تکرار گذرواژه جدید اجباری هست')
        .oneOf([Yup.ref('newPassword')], 'گذرواژه و تکرار آن باهم تطابق ندارد'),
});

export async function registerUser(userData: any) {
    try {
        let url = `${process.env.REACT_APP_Server_URI!}/Users/Register`;
        let data = await axios.post(url, userData);
        return {
            status: 200,
            data: data.data
        };
    } catch (ex: any) {
        return {
            status: ex.response.status,
            message: ex.response.data.detail
        };
    }
}

export async function loginUser(userData: any) {
    try {
        let data = await axios.post(`${process.env.REACT_APP_Server_URI!} / Users / Login`, userData);
        return {
            status: 200,
            data: data.data
        };
    } catch (ex: any) {
        if (ex.response) {
            return {
                status: ex.response.status,
                message: ex.response.data.detail
            };
        }
        else {
            return {
                message: ex.message,
                status: ex.code
            }
        }
    }
}


const authService = {
    async register(userData: any) {
        let url = `${process.env.REACT_APP_Server_URI!}/users/register`;
        let response = await axios.post(url, userData);
        return response.data;
    },
    async login(userData: any) {
        let url = `${process.env.REACT_APP_Server_URI!}/users/login`;
        let response = await axios.post(url, userData);
        return response.data;
    },

    logout() {
        localStorage.removeItem('token');
    },

    getToken() {
        return localStorage.getItem('token');
    },

    isAuthenticated() {
        return !!this.getToken();
    }
};

export default authService;