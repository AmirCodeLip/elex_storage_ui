import { useAuth } from 'contexts/AuthProvider';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ToPersianDateFmt1, priceToRial } from 'utils/Converts';

type TransationDto = {
    cardnumber: string
    datePaid: string,
    digitalreceipt: string,
    id: number,
    invoiceStatus: 0,
    issuerbank: string
    price: number,
    rnn: string,
    terminalid: string,
    tracenumber: string,
    datePaidFA?: string,
    terminalName: string,
    bankSwitchId: string,
    priceRialFA: string
}

var paidStatus = {
    0: "پرداخت شده",
    1: "در انتظار پرداخت"
}

export default function TransationsList() {
    const [transations, setTransations] = useState<Array<TransationDto> | null>(null);
    const { getAuthHeader } = useAuth();
    useEffect(() => {
        axios.post(`${process.env.REACT_APP_Server_URI!}/Transations/GetTransations`, {}, getAuthHeader()).then(x => {
            if (x.status == 200) {
                let modelData = x.data as Array<TransationDto>;
                (modelData.map(terminal => {
                    terminal.priceRialFA = priceToRial(terminal.price)
                    terminal.datePaidFA = ToPersianDateFmt1(terminal.datePaid)
                    return terminal;
                }))
                setTransations(x.data);
            }
        });
    }, []);


    return <div className='p-6' style={{ overflow: "hidden" }}>
        <div className='flex rtl text-right bg-color_layer_007 p-4 relative border-1 border-solid'>
            <div>فهرست تراکنش ها</div>
        </div>

        <div className="bg-color_layer_007 p-4 mt-2">
            <div className="grid grid-cols-9 gap-4 border-b pb-4">
                <div className="text-right rtl">رسید بانک</div>
                <div className="text-right rtl">تاریخ پرداخت</div>
                <div className="text-right rtl">شماره کارت</div>
                <div className="text-right rtl">وضعیت تراکنش</div>
                <div className="text-right rtl">مبلغ</div>
                <div className="text-center rtl">API Key</div>
                <div className="text-right rtl">نوع درگاه</div>
                <div className="text-right rtl">#</div>
            </div>
        </div>
        <div className="bg-color_layer_007 p-4 overflow-scroll h-96">
            {/* invoiceStatus */}
            {transations && transations?.map(transaction =>
                <div className="grid grid-cols-9 gap-4 mt-2 border-b pb-4" key={transaction.id}>
                    <div className="text-right rtl">
                        {transaction.digitalreceipt ? "..." + transaction.digitalreceipt.substring(0, 7) : ""}
                    </div>
                    <div className="text-right rtl">{transaction.datePaidFA}</div>
                    <div className="text-right rtl">
                        {transaction.cardnumber ? "..." + transaction.cardnumber.substring(0, 7) : ""}
                        <div style={{ display: "none" }}>
                            {transaction.cardnumber}
                        </div>
                    </div>
                    <div className="text-right rtl">{paidStatus[transaction.invoiceStatus]}</div>
                    <div className="text-right rtl">{(transaction.priceRialFA)}</div>
                    <div className="text-center rtl">{transaction.bankSwitchId}</div>
                    <div className="text-right rtl">
                        {transaction.terminalName}
                    </div>
                    <div className="text-right rtl">{transaction.id}</div>
                </div>
            )}
            <br />
        </div>
    </div>;
}