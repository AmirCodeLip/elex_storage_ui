import * as Yup from "yup";
import axios from "axios";
import { HandleErrors } from './CommonApi';
import { ToPersianDateFmt1, priceToRial } from 'utils/Converts';
import { getAuthHeader } from 'contexts/AuthProvider';

export type PaymentLinkDto = {
    price: number,
    terminalId: number,
    title: string,
    id: string,
    terminalName?: string,
    priceRial: string
};
Yup.object().shape({
    price: Yup.number(),
});
export const createPaymentLinkSchema = Yup.object().shape({
    title: Yup.string().required("عنوان اجباری هست"),
    price: Yup.number().typeError('مبلغ باید عدد باشد')
        .required('مبلغ اجباری هست')
        .moreThan(9999, 'مبلع نمیتواند کمتر از هزارتومان باشد'),
    terminalId: Yup.string().required("عنوان اجباری هست"),
    successRedirect: Yup.string().required("عنوان اجباری هست"),
    failRedirect: Yup.string().required("عنوان اجباری هست"),
});

/// -------------------- api requests --------------------

export async function createPaymentLink(paymentLinkData: any, setBoxError: any) {
    try {
        let response = await axios.post(`${process.env.REACT_APP_Server_URI!}/PaymentLinks/CreatePaymentLink`, paymentLinkData, getAuthHeader());
        setBoxError(null);
        return response;
    } catch (ex: any) {
        HandleErrors(setBoxError, ex);
        return null;
    }
};

export async function getPaymentLinks(setPaymentLinks: any, idList?: Array<string>) {
    let query: any = {};
    if (idList)
        query.idList = idList;
    try {
        let response = await axios.post(`${process.env.REACT_APP_Server_URI!}/PaymentLinks/GetPaymentLinks`, query, getAuthHeader());
        let modelData = response.data as Array<PaymentLinkDto>;
        setPaymentLinks(response.data);
        (modelData.map(paymentLink => {
            paymentLink.priceRial = priceToRial(paymentLink.price);
            return paymentLink;
        }));
        return modelData;
    }
    catch (ex) {
        debugger;
    }
}

/// -------------------- end api requests --------------------
