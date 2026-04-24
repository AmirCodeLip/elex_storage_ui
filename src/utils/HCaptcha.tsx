import { useState, useRef, useEffect } from 'react';

declare global {
    interface Window {
        hcaptcha: any; // or a more specific type
    }
}
export var HCaptcha = ({ sitekey, onVerify }: any) => {
    const captchaRef = useRef(null);

    useEffect(() => {
        if (window.hcaptcha && captchaRef.current) {
            window.hcaptcha.render(captchaRef.current, {
                sitekey,
                callback: onVerify,
            });
        }
    }, []);

    return <div ref={captchaRef}></div>;
};
