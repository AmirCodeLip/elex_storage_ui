import { useState, useRef, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginUser, changePassSchema } from 'services/authService';
import { useAuth } from 'contexts/AuthProvider';
import { useNavigate } from 'react-router-dom';
import { HCaptcha } from "utils/HCaptcha";
import axios from 'axios';




export default function ChangePassword() {
    // const { setIdentityData } = useIdentity();
    const [boxError, setBoxError] = useState<string | null>(null);
    const [isDisabled, setIsDisabled] = useState(false);
    const navigate = useNavigate();
    const { getAuthHeader } = useAuth();
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(changePassSchema),
    });


    const onSubmit = async function (data: any) {
        axios.post(`${process.env.REACT_APP_Server_URI!}/Users/ChangePassword`, data, getAuthHeader()).then(x => {
            if (x.status == 200) {
                navigate("/dashboard");
            }
        });
    };



    return (
        <div className='p-6'>
            <div className='flex rtl text-right bg-color_layer_007 p-4 relative border-1 border-solid'>
                <div>فهرست تراکنش ها</div>
            </div>

            <div className="bg-color_layer_007 p-4 mt-2 overflow-scroll">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2 rtl text-right" htmlFor="newPassword">
                            گذرواژه جدید
                        </label>
                        <input
                            {...register("newPassword")}
                            type='password'
                            className={`local-input  ${errors.newPassword ? 'border-color_layer_070' : 'border-color_layer_039'}`}
                        />
                        {errors.newPassword && <p className="text-red-500 text-sm mt-1 rtl text-right">{errors.newPassword.message}</p>}
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 mb-2 rtl text-right" htmlFor="confirmNewPassword">
                            تکرار گذرواژه جدید
                        </label>
                        <input
                            {...register("confirmNewPassword")}
                            type='password'
                            className={`local-input ${errors.confirmNewPassword ? 'border-color_layer_070' : 'border-color_layer_039'}`}
                        />
                        {errors.confirmNewPassword && <p className="text-red-500 text-sm mt-1 rtl text-right">{errors.confirmNewPassword.message}</p>}

                    </div>
                    {boxError != null && <p className="text-red-500 text-sm mt-1 rtl text-right">{boxError}</p>}
                    <button type="submit" className={(isDisabled ? 'btn-disabled ' : '') + "local-btn local-btn-main"}>
                        تعییر گذرواژه
                    </button>
                </form>
            </div>
        </div>)
}