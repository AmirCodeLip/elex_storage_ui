import React, { useEffect, createContext, useContext, ReactNode, useState } from 'react';
import Cookies from 'js-cookie';

const cookyKey = "identity";

export type AuthType = {
    userId: string,
    accessToken: string,
    refreshToken: string,
    expirationAccessToken: string,
    expirationRefreshToken: string
}


/// Define the type for your context value.
export type AuthContexType = {
    setAuthData?: (identityData?: AuthType) => void,
    getAuthData: () => AuthType | null,
    getAuthHeader: () => any,
    logout: () => any,
};


function writeAuthCookie(data: any) {
    // Only write after initial load
    Cookies.set(cookyKey, JSON.stringify(data), {
        /// to do add expires from data.   
        expires: 7, // Expires in 7 days
        sameSite: 'strict',
        secure: process.env.NODE_ENV === 'production',
    });
}

function readAuthFromCooky() {
    const cookie = Cookies.get(cookyKey);
    if (!cookie)
        return null;
    try {
        const parsedIdentity = JSON.parse(cookie) as AuthType;
        return parsedIdentity;
    } catch (e) {
        return null;
    }
}

export function getAuthHeader() {
    let parsedIdentity = readAuthFromCooky();
    return {
        headers: {
            Authorization: `Bearer ${parsedIdentity!.accessToken}`,
            'Content-Type': 'application/json',
        }, params: {
        }
    };
}

/// Create context with a default value.
const authContext = createContext<AuthContexType | undefined>(undefined);

/// Create a provider component.
export function AuthProvider({ children }: { children: ReactNode }) {
    var logout = () => {
        Cookies.remove(cookyKey);
    };

    return (
        <authContext.Provider value={{
            setAuthData: writeAuthCookie,
            getAuthData: readAuthFromCooky,
            getAuthHeader: getAuthHeader,
            logout
        }}>
            {children}
        </authContext.Provider>
    );
};

/// Custom hook to use the context.
export function useAuth() {
    const context = useContext(authContext);
    if (context === undefined) {
        throw new Error('useIdentity must be used within a IdentityProvider');
    }
    return context;
};