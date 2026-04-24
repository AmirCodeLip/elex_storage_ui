import { useAuth } from 'contexts/AuthProvider';
import { Outlet, Link } from "react-router-dom";
import { Schedule24X, ArrowLeftX24 } from 'Icons';
import { reach } from 'yup';
import React, { PropsWithChildren } from 'react';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';


function RightbarDropMenuComponent({ children, title }: PropsWithChildren<{ title: string }>) {
  return (<div className='rightbar-item'>

    <div className='flex rightbar-item-title'>
      <Schedule24X className='mr-2' fill='var(--color_layer_001)'></Schedule24X>
      <div className='mr-3'>{title}</div>
      <div className="absolute left-5"><ArrowLeftX24 fill='var(--color_layer_045)'></ArrowLeftX24></div>
    </div>
    <div>
      {children}
    </div>

  </div>)
}


type OnLoadData = {
  totalPayment: number,

}

export default function DashboardLayout() {
  const navigate = useNavigate();
  const [onLoadData, setOnLoadData] = useState<OnLoadData>({
    totalPayment: 0
  });
  const { getAuthHeader, getAuthData, logout } = useAuth();

  const logout_User = () => {
    logout();
    navigate('/authenticate');
  };

  useEffect(() => {

    if (getAuthData() == null) {
      navigate('/authenticate');
      return;
    }
    axios.post(`${process.env.REACT_APP_Server_URI!}/Dashboard/GetDashboardData`, {}, getAuthHeader()).then(x => {
      if (x.status == 200) {
        let modelData = x.data as OnLoadData;
        setOnLoadData(modelData)
      }
    });

  }, []);

  return (
    <div>
      {/* nav section */}
      <div className="mx-auto px-4 flex justify-between items-center shadow-1-bottom">


        <div className="flex items-center w-full">
          <nav className="flex md:hidden ml-auto text-right rtl w-full">
            <a href="/" className="nav-icon">
              <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#f8ac26"><path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" /></svg>
            </a>
          </nav>
          <nav className="hidden md:flex ml-auto text-right rtl w-full">
            <a href="/" className="nav-link relative">
              خانه
            </a>
            <a className="nav-link absolute left-5">
              <span>کل درآمد : {onLoadData.totalPayment} تومان</span>
            </a>
            {/* {data.categories.map(x => <a href={"/categories/" + x.id} key={x.id} className="nav-link relative">
              {x.name}
            </a>)} */}

            {/* <IdentityComponent identityData={identityData}></IdentityComponent> */}
          </nav>
        </div>
      </div>

      <div className="flex bg-color_layer_045  h-screen">
        <div className="flex-1">
          <Outlet />
        </div>
        <div className="w-64 bg-color_layer_053 relative h-full">

          <div className='rightbar'>

            <div className='rightbar-item'>
              <div className='flex rightbar-item-title'>
                <Schedule24X className='mr-2' fill='var(--color_layer_001)'></Schedule24X>
                <div className='mr-3'>داشبورد</div>
              </div>
            </div>

            <div className='rightbar-item'>
              <div className='flex rightbar-item-title'>
                <Schedule24X className='mr-2' fill='var(--color_layer_001)'></Schedule24X>
                <div className='mr-3'>پشتیبانی</div>
                <a className="absolute left-5"><ArrowLeftX24 fill='var(--color_layer_045)'></ArrowLeftX24></a>
              </div>
            </div>

            <RightbarDropMenuComponent title='مدیریت ترمینال ها'>

              <Link to="/dashboard/terminals/list" className='flex rightbar-item-single'>
                <ArrowLeftX24 className='mr-2' fill='var(--color_layer_001)'></ArrowLeftX24>
                <div className='mr-3'>
                  فهرست ترمینال ها
                </div>
              </Link>

              <Link to="/dashboard/terminals/create" className='flex rightbar-item-single'>
                <ArrowLeftX24 className='mr-2' fill='var(--color_layer_001)'></ArrowLeftX24>
                <div className='mr-3'>
                  افزودن ترمینال جدید
                </div>
              </Link>

            </RightbarDropMenuComponent>

            <RightbarDropMenuComponent title='مدیریت لینک ها'>
              <Link to="/dashboard/payments/list" className='flex rightbar-item-single'>
                <ArrowLeftX24 className='mr-2' fill='var(--color_layer_001)'></ArrowLeftX24>
                <div className='mr-3'>
                  فهرست لینک های پرداخت
                </div>
              </Link>

              <Link to="/dashboard/payments/create" className='flex rightbar-item-single'>
                <ArrowLeftX24 className='mr-2' fill='var(--color_layer_001)'></ArrowLeftX24>
                <div className='mr-3'>
                  ایجاد لینک پرداخت جدید
                </div>
              </Link>
            </RightbarDropMenuComponent>
            <div className='rightbar-item'>
              <Link className='flex rightbar-item-title' to="/dashboard/transations/list">
                <Schedule24X className='mr-2' fill='var(--color_layer_001)'></Schedule24X>
                <div className='mr-3'>فهرست تراکنش ها</div>
              </Link>
            </div>
            
            <div className='rightbar-item'>
              <div className='flex rightbar-item-title'>
                <Schedule24X className='mr-2' fill='var(--color_layer_001)'></Schedule24X>
                <Link to='/dashboard/changePassword' className='mr-3'>تعییر گذرواژه</Link>
              </div>
            </div>    
            
              <div className='rightbar-item'>
              <div className='flex rightbar-item-title'>
                <Schedule24X className='mr-2' fill='var(--color_layer_001)'></Schedule24X>
                <a className='mr-3' onClick={logout_User}>خروج</a>
              </div>
            </div>
                            
          </div>


        </div>
      </div>

    </div>
  );
};