import { brokers, getBroker, BrokerType } from "api/Terminals";
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { TerminalDto, getTerminals } from 'api/Terminals';


export default function TerminalsList() {
    const [terminals, setTerminals] = useState<Array<TerminalDto> | null>(null);

    useEffect(() => {
        getTerminals(setTerminals);
    }, []);


    return <div className='p-6'>
        <div className='flex rtl text-right bg-color_layer_007 p-4 relative border-1 border-solid'>
            <div>فهرست ترمینال ها</div>
            <div className="absolute left-10 top-[-10px]">
                <Link to="/dashboard/terminals/create" className="local-btn local-btn-main">افزودن ترمینال جدید</Link>
            </div>
        </div>

        <div className="bg-color_layer_007 p-4 mt-2">

            <div className="grid grid-cols-8 gap-4 border-b pb-4">
                <div className="text-right rtl">عملیات</div>
                <div className="text-right rtl">کل درآمد</div>
                <div className="text-right rtl">تاریخ ثبت</div>
                <div className="text-center rtl col-span-2">API Key</div>
                <div className="text-right rtl">نوع درگاه</div>
                <div className="text-right rtl">عنوان</div>
            </div>


            {terminals && terminals?.map(terminal => {
                return (
                    <div key={terminal.id} className="grid grid-cols-8 gap-4 mt-2 border-b pb-4">
                        <Link to={`/dashboard/terminals/edit/${terminal.id}`} className="text-right rtl">
                            {/* <Edit24X></Edit24X> */}
                        </Link>
                        <div className="text-right rtl">{terminal.totalPaymentsRial}</div>
                        <div className="text-right rtl">{terminal.createdAtFA}</div>
                        <div className="text-center rtl col-span-2">{terminal.bankSwitchId}</div>
                        <div className="text-right rtl">
                            {terminal.broker!.name}
                        </div>
                        <div className="text-right rtl">{terminal.title}</div>
                    </div>
                );
            })}

        </div>

    </div>;
}