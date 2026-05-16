import { Outlet, Link } from "react-router-dom";
import { useAuth, AuthType } from 'contexts/AuthProvider';
import { User } from 'lucide-react';

function IdentityComponent({ identityData }: { identityData: AuthType | null }) {
    if (identityData != null) {
        return (<Link to="/dashboard/payments/list" className="nav-link">
            <span>Profile</span>
        </Link>);
    }
    else {
        return (<Link to="/authenticate" className="nav-link">
            <span>Login - Register</span>
        </Link>);
    }

}

function Layout() {
    const { getAuthData } = useAuth();
    var identityData = getAuthData();
    return (
        <div className="App">
            {/* <!-- Header --> */}
            <div className=" mx-auto px-4 py-4 flex justify-between items-center">

                <div className="hidden md:flex items-center space-x-4">

                    {/* <!-- logo cart --> */}
                    <Link to="cart">
                    </Link>

                    {/* <!-- search bar --> */}
                    <svg xmlns="http://www.w3.org/2000/svg" className="relative fill-color_layer_052 hover:fill-color_layer_002 cursor-pointer" height="24px" width="24px" viewBox="0 -960 960 960"><path d="m788.48-81.56-256.95-257.4q-29.31 20.74-70.83 33.4-41.53 12.65-87.09 12.65-120.53 0-204.53-84.03-83.99-84.03-83.99-204.61 0-120.58 84.02-204.49 84.03-83.92 204.61-83.92 120.58 0 204.5 84 83.91 83.99 83.91 204.53 0 46.13-11.93 85.43-11.94 39.3-33.68 69.61l258.39 258.96-86.43 85.87Zm-415.1-334.31q70.24 0 118.02-47.54 47.77-47.55 47.77-117.79 0-70.25-47.77-118.02Q443.62-747 373.38-747q-70.25 0-117.79 47.78-47.55 47.77-47.55 118.02 0 70.24 47.55 117.79 47.54 47.54 117.79 47.54Z" /></svg>

                </div>

                {/* <!-- logo --> */}
                <div className="text-center w-full md:w-auto md:text-right md:flex items-center space-x-4 font-bold mr-4" style={{ fontStyle: "italic" }}>
                    Elex storage
                </div>

            </div>

            {/* nav section */}
            <div className="mx-auto px-4 flex justify-between items-center shadow-1-bottom">
                <div className="flex items-center w-full">
                    <nav className="flex md:hidden mr-auto text-left ltr w-full">
                        <a href="/" className="nav-icon">
                            X
                            {/* <NavIcon></NavIcon> */}
                        </a>
                    </nav>

                    <nav className="hidden md:flex items-center w-full">
                        <a href="/" className="nav-link relative mr-auto">
                            Drive
                        </a>

                        <Link to="/authenticate" className="nav-link flex items-center gap-2">
                            {/* User icon for login/register */}
                            <User></User>
                            <span>Login - Register</span>
                        </Link>
                    </nav>

                    {/* <IdentityComponent identityData={identityData}></IdentityComponent> */}
                </div>
            </div>


            {/* Render Pages */}
            <div className="min-h-screen">
                <Outlet />
            </div>


            <div className="bg-gray-800 text-white py-6 opacity-90 content-center justify-items-center mt-10" style={{ marginBottom: -50 }}>
                <a className="w-20 block p-2 bg-color_layer_008 rounded-md" referrerPolicy='origin'
                    href='https://trustseal.enamad.ir/?id=604951&Code=ZLrZDtNe3bbQ8YaUOECDTYzfoVgdM9iK'>
                    <img className="w-80" referrerPolicy='origin' src='/imgs/enamad_icon.png' alt='' style={{ cursor: "pointer" }}
                        data-code='gTEUB62X3SaQZ47zxpm14dK3Eg3AeoA8' />
                </a>
            </div>

            {/* <!-- Footer --> */}
            <footer className="mt-12 bg-gray-800 text-white py-6">
                <div className="mx-auto text-center">
                    <p>&copy; 2024 My Shop. All rights reserved.</p>
                </div>
            </footer>

        </div>
    );
};

export default Layout;

