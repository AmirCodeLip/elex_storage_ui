import { useState } from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import axios from 'axios';
import authService, { registerUser } from 'services/authService';
import { useAuth } from 'contexts/AuthProvider';
import { useNavigate } from 'react-router-dom';

const schema = Yup.object({
    name: Yup.string().required('name is required'),
    // Change .notRequired() to .optional() here:
    email: Yup.string().email('email is not valid').optional(),
    password: Yup.string()
        .required('password is required')
        .min(8, 'minimum password length must be 8'),
    phone: Yup.string(),
    confirmPassword: Yup.string()
        .required('confirm password is required')
        .oneOf([Yup.ref('password')], 'password and confirm password are not same'),
});

type FormValues = Yup.InferType<typeof schema>;

export default function Register() {
    const [boxError, setBoxError] = useState<string | null>(null);
    const [isDisabled, setIsDisabled] = useState(false);
    const { register, handleSubmit, setError, getValues, formState: { errors } } =
        useForm({
            resolver: yupResolver(schema),
        });
    const navigate = useNavigate();
    const auth = useAuth();
    var authData = auth.getAuthData();
    const onSubmit = async (data: any) => {
        setIsDisabled(true);
        try {
            let response = await authService.register(data);
            auth.setAuthData!({
                accessToken: response.accessToken,
                userId: response.userId,
                refreshToken: response.refreshToken,
                expirationAccessToken: "",
                expirationRefreshToken: ""
            }); 
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

    return (<form onSubmit={handleSubmit(onSubmit)}>

        <div className="mb-4">
            <label className="block text-gray-700 mb-2 rtl text-right" htmlFor="register-name">
                name
            </label>
            <input
                {...register("name")}
                className={`local-input  rtl text-right ${errors.name ? 'border-color_layer_070' : 'border-color_layer_039'}`}
            />
            {errors.name && <p className="text-right rtl text-color_layer_070 text-sm mt-1">{errors.name.message}</p>}

        </div>

        <div className="mb-4">
            <label className="block text-gray-700 mb-2 rtl text-right" htmlFor="register-email">
                email
            </label>
            <input
                {...register("email")}
                className={`local-input ${errors.email ? 'border-color_layer_070' : 'border-color_layer_039'}`}
            />
            {errors.email && <p className="text-right rtl text-color_layer_070 text-sm mt-1">{errors.email.message}</p>}
        </div>

        <div className="mb-4">
            <label className="block text-gray-700 mb-2 rtl text-right" htmlFor="register-email">
                phone number
            </label>
            <input
                {...register("phone")}
                className={`local-input ${errors.phone ? 'border-color_layer_070' : 'border-color_layer_039'}`}
            />
            {errors.email && <p className="text-right rtl text-color_layer_070 text-sm mt-1">{errors.email.message}</p>}
        </div>

        <div className="mb-4">
            <label className="text-right rtl block text-gray-700 mb-2" htmlFor="register-password">
                password
            </label>
            <input
                {...register("password")}
                type='password'
                className={`local-input ${errors.password ? 'border-color_layer_070' : 'border-color_layer_039'}`}
            />
            {errors.password && <p className="text-right rtl text-color_layer_070 text-sm mt-1">{errors.password.message}</p>}
        </div>

        <div className="mb-6">
            <label className="block text-gray-700 mb-2 rtl text-right" htmlFor="register-confirm">
                confirm Password
            </label>
            <input
                {...register("confirmPassword")}
                type='password'
                className={`local-input ${errors.confirmPassword ? 'border-color_layer_070' : 'border-color_layer_039'}`}
            />
            {errors.confirmPassword && <p className="text-right rtl text-color_layer_070 text-sm mt-1">{errors.confirmPassword.message}</p>}
        </div>

        {boxError?.length && boxError.length > 0 && (<div className='text-right rtl text-color_layer_070 mb-2'>{boxError}</div>)}

        <button type="submit" className={(isDisabled ? 'btn-disabled ' : '') + "local-btn local-btn-main"}>
            ایجاد
        </button>
    </form >)

}