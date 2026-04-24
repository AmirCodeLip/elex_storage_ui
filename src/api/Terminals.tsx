import { array, number } from "yup";
import * as Yup from "yup";
import axios from "axios";
import { useAuth } from 'contexts/AuthProvider';
import { ToPersianDateFmt1, priceToRial } from 'utils/Converts';
import { HandleErrors } from './CommonApi';
export type BrokerType = {
    id: number,
    name: string,
}

export type TerminalDto = {
    id: string,
    title: string,
    brokerType: number,
    broker?: BrokerType,
    bankSwitchId: string,
    createdAt?: string,
    totalPayments?: number,
    totalPaymentsRial?: string
    createdAtFA?: string,
};

export const schema = Yup.object().shape({
    title: Yup.string().required("عنوان اجباری هست"),
    fee: Yup.bool(),
    bankSwitchId: Yup.string().required("کد پذیرندگی بانک (ApiKey) اجباری هست "),
    brokerType: Yup.number().required("نوع درگاه اجباری هست")
});

export var brokers: Array<BrokerType> = [
    {
        name: "سامان",
        id: 0
    },
    {
        name: "آسان پرداخت",
        id: 1
    },
    {
        name: "ایرانکیش",
        id: 2
    },
    {
        name: "سپهر",
        id: 3
    },
    {
        name: "پارسیان",
        id: 4
    },
    {
        name: "سداد",
        id: 5
    }
]

export function getBroker(id: number): BrokerType {
    return brokers.filter(x => x.id == id)[0]
}

/// -------------------- api requests --------------------

export async function createTerminal(terminalData: any, setBoxError: any) {
    try {
        // let response = await axios.post(`${process.env.REACT_APP_Server_URI!}/Terminals/CreateTerminal`, terminalData, getIdentityHeader());
        setBoxError(null);
        // return response;
    } catch (ex: any) {
        HandleErrors(setBoxError, ex);
    }
    return null;
};

export async function editTerminal(terminalData: any, setBoxError: any) {
    try {
        // let response = await axios.post(`${process.env.REACT_APP_Server_URI!}/Terminals/EditTerminal`, terminalData, getIdentityHeader());
        setBoxError(null);
        // return response;
    } catch (ex: any) {
        HandleErrors(setBoxError, ex);
    }
    return null;
};

export async function getTerminals(setTerminals: any, idList?: Array<string>) {
    let query: any = {};
    if (idList)
        query.idList = idList;
    try {
        // let response = await axios.post(`${process.env.REACT_APP_Server_URI!}/Terminals/GetTerminals`, query, getIdentityHeader());
        // let modelData = response.data as Array<TerminalDto>;
        // setTerminals(response.data);
        // (modelData.map(terminal => {
        //     terminal.broker = getBroker(terminal.brokerType);
        //     terminal.createdAtFA = ToPersianDateFmt1(terminal.createdAt);
        //     terminal.totalPaymentsRial = priceToRial(terminal.totalPayments ?? 0);
        //     return terminal;
        // }))

    }
    catch (ex) {
        debugger;
    }
    return null;
}


/// -------------------- end api requests --------------------
