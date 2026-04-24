import { useState } from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginUser } from 'services/authService';
import { useAuth, AuthType } from 'contexts/AuthProvider';
import { brokers, schema, createTerminal } from 'api/Terminals';
import { useNavigate, useLocation } from 'react-router-dom';
import { useParams } from 'react-router';
import { publicPages, FormInfoType } from "data"

var fileInput: HTMLInputElement;

function AutoInput(props: { formInfo: FormInfoType }) {
    const uploadFile = () => {
        if (!fileInput) {
            fileInput = document.createElement("input");
            document.body.appendChild(fileInput);
            fileInput.type = "file";
        }
        fileInput.click();
    };
    if (props.formInfo.type == "select") {
        return (
            <div className="">
                <label className="block text-gray-700 mb-2 rtl text-right" htmlFor="login-email">
                    {props.formInfo.label}
                </label>
                <select
                    // {...register("brokerType", { required: "Please select a fruit" })}
                    className={`local-input  ${false ? 'border-color_layer_070' : 'border-color_layer_039'}`}
                >
                    {props.formInfo.options?.map(x => {
                        return (<option key={x.key} value={x.key}>
                            {x.value}
                        </option>);
                    })}
                </select>
                {/* {errors && <p className="text-red-500 text-sm mt-1 rtl text-right">{errors.title.message}</p>} */}
            </div>
        )
    }
    if (props.formInfo.type == "file") {
        return (
            <div className="">
                <label className="block text-gray-700 mb-2 rtl text-right" htmlFor="login-email">
                    {props.formInfo.label}
                </label>
                <input readOnly onClick={uploadFile} value={"آپلود فایل"}
                    // {...register("title")}
                    className={`local-input  ${false ? 'border-color_layer_070' : 'border-color_layer_039'}`}
                />
                {/* {errors && <p className="text-red-500 text-sm mt-1 rtl text-right">{errors.title.message}</p>} */}
            </div>
        )
    }

    return (
        <div className="">
            <label className="block text-gray-700 mb-2 rtl text-right" htmlFor="login-email">
                {props.formInfo.label}
            </label>
            <input
                // {...register("title")}
                className={`local-input  ${false ? 'border-color_layer_070' : 'border-color_layer_039'}`}
            />
            {/* {errors && <p className="text-red-500 text-sm mt-1 rtl text-right">{errors.title.message}</p>} */}
        </div>
    )
}

export default function Create() {
    const location = useLocation();
    const { hash, pathname, search } = location;
    var formUrl = pathname.substring("/forms/".length);
    var form = publicPages.filter(x => x.url == formUrl)[0];


    const navigate = useNavigate();
    const [boxError, setBoxError] = useState<string | null>(null);
    const [isDisabled, setIsDisabled] = useState(false);
    // const { register, handleSubmit, formState: { errors } } = useForm({
    //     resolver: yupResolver(schema),
    // });

    // const onSubmit = async (data: any) => {
    //     if (isDisabled)
    //         return;
    //     setIsDisabled(true);
    //     var response = await createTerminal(data, setBoxError);
    //     if (response != null) {
    //         navigate("/dashboard/terminals/list");
    //     }
    //     setIsDisabled(false);
    // }

    return (
        <div className='p-6'>

            <div className='rtl text-right bg-color_layer_007 p-4 relative border-1 border-solid mt-6'>
                {/* onSubmit={handleSubmit(onSubmit)} */}
                <form >
                    <div className="grid grid-cols-2 gap-4">
                        {form.formInfo.map(x => {
                            return (<AutoInput formInfo={x} />);
                        })}
                    </div>


                    {/* {boxError?.length && boxError.length > 0 && (<div className='text-right rtl text-color_layer_070 mb-2 mt-4'>{boxError}</div>)} */}

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