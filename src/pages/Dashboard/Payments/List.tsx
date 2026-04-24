import { getAuthHeader, AuthProvider, useAuth } from 'contexts/AuthProvider';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Edit24X } from 'Icons';
import { getPaymentLinks, PaymentLinkDto } from 'api/PaymentLinks';






export default function List() {
    const { getAuthHeader } = useAuth();
    const [payments, setPayments] = useState<Array<PaymentLinkDto> | null>(null);

    let iKey = 0;
    useEffect(() => {
        getPaymentLinks(setPayments);
    }, []);

    return <div className='p-6'>

        <div className='flex rtl text-right bg-color_layer_007 p-4 relative border-1 border-solid'>
            <div>فهرست لینک های پرداخت</div>
            <div className="absolute left-10 top-[-10px]">
                <Link to="/dashboard/payments/create" type="submit" className="local-btn local-btn-main">
                    ایجاد لینک پرداخت جدید
                </Link>
            </div>
        </div>

        <div className="bg-color_layer_007 p-4 mt-2">

            <div className="grid grid-cols-6 gap-4 border-b pb-4">
                <div className="text-right rtl">عملیات</div>
                <div className="text-center rtl col-span-2">لینک</div>
                <div className="text-right rtl">مبلغ</div>
                <div className="text-right rtl">ترمینال</div>
                <div className="text-right rtl">عنوان</div>
            </div>


            {payments && payments?.map(paymentLink => {
                return (
                    <div className="grid grid-cols-6 gap-4 mt-2 border-b pb-4" key={iKey++}>
                        <Link to={`/dashboard/payments/edit/${paymentLink.id}`} className="text-right rtl">
                            <Edit24X></Edit24X>
                        </Link>
                        <div className="text-center col-span-2">{process.env.REACT_APP_Server_URI!.substring(8)}/Payments/Get/{paymentLink.id}</div>
                        <div className="text-right rtl">{paymentLink.priceRial}</div>
                        <div className="text-right rtl">{paymentLink.terminalName ? paymentLink.terminalName : "null"}</div>
                        <div className="text-right rtl">{paymentLink.title}</div>
                    </div>
                );
            })}


        </div>
    </div>;
}