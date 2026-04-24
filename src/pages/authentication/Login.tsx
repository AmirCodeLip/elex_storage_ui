import { useState } from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import authService, { loginUser } from 'services/authService';
import { useAuth, AuthType } from 'contexts/AuthProvider';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const schema = Yup.object().shape({
    password: Yup.string()
        .required('password is required')
        .min(8, 'minimum password length must be 8'),
    userName: Yup.string().required("user name is required").min(6, 'user name must be email or phone'),
});

type FormValues = Yup.InferType<typeof schema>;

export default function Login() {
    const { setAuthData } = useAuth();
    const [boxError, setBoxError] = useState<string | null>(null);
    const [isDisabled, setIsDisabled] = useState(false);
    const navigate = useNavigate();
    const { register, handleSubmit, setError, getValues, formState: { errors } } =
        useForm({
            resolver: yupResolver(schema),
        });

    const onSubmit = async function (data: any) {
        if (isDisabled)
            return;
        setIsDisabled(true);
        try {
            let response = await authService.login(data);
            // auth.setAuthData!({
            //     accessToken: response.accessToken,
            //     userId: response.userId,
            //     refreshToken: response.refreshToken,
            //     expirationAccessToken: "",
            //     expirationRefreshToken: ""
            // });
        } catch (ex) {
            if (axios.isAxiosError(ex)) {
                if (ex.response?.status) {
                    if (typeof (ex.response.data) === 'string') {
                        setBoxError(ex.response.data)
                    }
                    /// if error was an object
                    else {
                        var values = getValues();
                        /// walk through all the errors
                        for (let key of Object.keys(ex.response.data)) {
                            // make sure the field actually exists in your form
                            if (key in values) {
                                let field = key as keyof FormValues;
                                setError(field, {
                                    type: "server",
                                    message: ex.response.data[field]
                                });
                            } else {
                                setBoxError(ex.response.data[key])
                            }
                        }
                    }
                }
            }
        }
        setIsDisabled(false);
    };



    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
                <label className="block text-gray-700 mb-2 rtl text-right" htmlFor="login-email">
                    user name
                </label>
                <input
                    {...register("userName")}
                    className={`local-input  ${errors.userName ? 'border-color_layer_070' : 'border-color_layer_039'}`}
                />
                {errors.userName && <p className="text-red-500 text-sm mt-1 rtl text-right">{errors.userName.message}</p>}
            </div>
            <div className="mb-6">
                <label className="block text-gray-700 mb-2 rtl text-right" htmlFor="login-password">
                    password
                </label>
                <input
                    {...register("password")}
                    type='password'
                    className={`local-input ${errors.password ? 'border-color_layer_070' : 'border-color_layer_039'}`}
                />
                {errors.password && <p className="text-red-500 text-sm mt-1 rtl text-right">{errors.password.message}</p>}

            </div>
            {boxError != null && <p className="text-red-500 text-sm mt-1 rtl text-right">{boxError}</p>}
            <button type="submit" className={(isDisabled ? 'btn-disabled ' : '') + "local-btn local-btn-main"}>
                ورود
            </button>
        </form>)
}