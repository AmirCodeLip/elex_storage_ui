import { useState } from 'react';
import Login from './Login';
import Register from './Register';

const AuthForm = () => {
    const [activeTab, setActiveTab] = useState('login');


    const handleTabChange = (tab: any) => {
        setActiveTab(tab);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <div className="flex mb-6">
                    <button
                        className={`flex-1 py-2 font-medium ${activeTab === 'login' ? 'bg-color_layer_001 text-white' : 'bg-color_layer_039 text-color_layer_052'}`}
                        onClick={() => handleTabChange('login')}
                    >
                        login
                    </button>
                    <button
                        className={`flex-1 py-2 font-medium ${activeTab === 'register' ? 'bg-color_layer_001 text-white' : 'bg-color_layer_039 text-color_layer_052'}`}
                        onClick={() => handleTabChange('register')}
                    >
                        register
                    </button>
                </div>

                {activeTab === 'login' ? (
                    <Login></Login>
                ) : (
                    <Register></Register>
                )}
            </div>
        </div>
    );
};

export default AuthForm;