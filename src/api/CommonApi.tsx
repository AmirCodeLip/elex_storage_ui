export function HandleErrors(setBoxError: any, axiosResponse: any) {
    if (axiosResponse.status === 403) {
        setBoxError(axiosResponse.response.data.detail);
    }
    else if (axiosResponse.status === 400) {
        setBoxError(axiosResponse.response.data.detail);
    }
    else {
        debugger;
    }
}