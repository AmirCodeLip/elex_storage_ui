import { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Outlet, Link } from 'react-router-dom';
import { createPaymentLink, createPaymentLinkSchema } from 'api/PaymentLinks';
import { TerminalDto, getTerminals } from 'api/Terminals';



export default function Create() {
    const [pageIsLoad, setPageIsLoad] = useState<boolean>(false);
    const [terminals, setTerminals] = useState<Array<TerminalDto> | null>(null);
    const [boxError, setBoxError] = useState<string | null>(null);
    const [isDisabled, setIsDisabled] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(createPaymentLinkSchema),
    });
    const navigate = useNavigate();

    useEffect(() => {
        if (pageIsLoad)
            return;
        getTerminals(setTerminals);
        setPageIsLoad(true);
    }, []);

    const onSubmit = async function (data: any) {
        if (isDisabled)
            return;
        setIsDisabled(true);

        var response = await createPaymentLink(data, setBoxError);
        if (response != null) {
            navigate("/dashboard/payments/list");
        }
        setIsDisabled(false);
    };

    return (
        <div className='p-6'>

            <Link to="dashboard/payments/create" className='flex rtl text-right bg-color_layer_007 p-4 relative border-1 border-solid'>
                ایجاد لینک پرداخت جدید
            </Link>
            <div className='rtl text-right bg-color_layer_007 p-4 relative border-1 border-solid mt-6'>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="">
                            <label className="block text-gray-700 mb-2 rtl text-right" htmlFor="login-email">
                                عنوان
                            </label>
                            <input
                                {...register("title")}
                                className={`local-input  ${false ? 'border-color_layer_070' : 'border-color_layer_039'}`}
                            />
                            {errors.title && <p className="text-red-500 text-sm mt-1 rtl text-right">{errors.title.message}</p>}
                        </div>

                        <div className="">
                            <label className="block text-gray-700 mb-2 rtl text-right" htmlFor="login-email">
                                ترمینال
                            </label>
                            <select
                                {...register("terminalId")}
                                className={`local-input  ${false ? 'border-color_layer_070' : 'border-color_layer_039'}`}
                            >
                                <option>انتخاب</option>
                                {
                                    terminals && terminals.map((terminal) => (
                                        <option key={terminal.id} value={terminal.id}>
                                            {terminal.title}
                                        </option>
                                    ))
                                }
                            </select>
                            {errors.terminalId && <p className="text-red-500 text-sm mt-1 rtl text-right">{errors.terminalId?.message}</p>}

                        </div>

                        <div className="">
                            <label className="block text-gray-700 mb-2 rtl text-right" htmlFor="login-email">
                                مبلع
                            </label>
                            <input
                                {...register("price")}
                                className={`local-input all-left ${false ? 'border-color_layer_070' : 'border-color_layer_039'}`} />
                            {errors.price && <p className="text-red-500 text-sm mt-1 rtl text-right">{errors.price.message}</p>}

                        </div>

                        <div className="">
                            <label className="block text-gray-700 mb-2 rtl text-right" htmlFor="login-email">
                                انتقال به آدرس (پرداخت موفق)

                            </label>
                            <input
                                {...register("successRedirect")}
                                className={`local-input  ${false ? 'border-color_layer_070' : 'border-color_layer_039'}`} />
                            {errors.successRedirect && <p className="text-red-500 text-sm mt-1 rtl text-right">{errors.successRedirect.message}</p>}

                        </div>

                        <div className="">
                            <label className="block text-gray-700 mb-2 rtl text-right" htmlFor="login-email">
                                انتقال به آدرس (پرداخت ناموفق)
                            </label>
                            <input
                                {...register("failRedirect")}
                                className={`local-input  ${false ? 'border-color_layer_070' : 'border-color_layer_039'}`} />
                            {errors.failRedirect && <p className="text-red-500 text-sm mt-1 rtl text-right">{errors.failRedirect.message}</p>}

                        </div>
                    </div>

                    {boxError?.length && boxError.length > 0 && (<div className='text-right rtl text-color_layer_070 mb-2 mt-4'>{boxError}</div>)}

                    <div className='w-64'>
                        <button type="submit" className={(isDisabled ? 'btn-disabled ' : '') + "local-btn local-btn-main"}>
                            ثبت
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}