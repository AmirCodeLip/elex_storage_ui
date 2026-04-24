import { useState } from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { brokers, schema, createTerminal } from 'api/Terminals';
import { useNavigate } from 'react-router-dom';




export default function Create() {
    const navigate = useNavigate();
    const [boxError, setBoxError] = useState<string | null>(null);
    const [isDisabled, setIsDisabled] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = async (data: any) => {
        if (isDisabled)
            return;
        setIsDisabled(true);
        var response = await createTerminal(data, setBoxError);
        if (response != null) {
            navigate("/dashboard/terminals/list");
        }
        setIsDisabled(false);
    }

    return (
        <div className='p-6'>

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
                                ApiKey
                            </label>
                            <input
                                {...register("bankSwitchId")}
                                className={`local-input  ${false ? 'border-color_layer_070' : 'border-color_layer_039'}`}
                            />
                            {errors.bankSwitchId && <p className="text-red-500 text-sm mt-1 rtl text-right">{errors.bankSwitchId.message}</p>}
                        </div>

                        <div className="">
                            <label className="block text-gray-700 mb-2 rtl text-right" htmlFor="login-email">
                                نوع درگاه
                            </label>
                            <select
                                {...register("brokerType", { required: "Please select a broker" })}
                                className={`local-input  ${false ? 'border-color_layer_070' : 'border-color_layer_039'}`}
                            >
                                {
                                    brokers.map((broker) => (
                                        <option key={broker.id} value={broker.id}>
                                            {broker.name}
                                        </option>
                                    ))
                                }
                            </select>
                            {errors.brokerType && <p className="text-red-500 text-sm mt-1 rtl text-right">{errors.brokerType?.message}</p>}

                        </div>

                        <div className="">
                            <label className="block text-gray-700 mb-2 rtl text-right" htmlFor="login-email">
                                کسر کارمزد
                            </label>
                            <select
                                {...register("fee")}
                                className={`local-input  ${false ? 'border-color_layer_070' : 'border-color_layer_039'}`}
                            >
                                <option value="true">کسر کارمزد از پرداخت کننده</option>
                                <option value="false">کسر کارمزد شما</option>
                            </select>
                            {errors.fee && <p className="text-red-500 text-sm mt-1 rtl text-right">{errors.fee.message}</p>}

                        </div>
                    </div>

                    {boxError?.length && boxError.length > 0 && (<div className='text-right rtl text-color_layer_070 mb-2 mt-4'>{boxError}</div>)}

                    <div className='w-64'>
                        <button type="submit" className={(isDisabled ? 'btn-disabled ' : '') + "local-btn local-btn-main"}>
                            ثبت
                        </button>
                    </div>
                </form>
            </div >
        </div >
    );
}