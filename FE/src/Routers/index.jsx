import React, { lazy, memo } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Category from '../components/Category';
import DetailTour from '../components/Content/DetailTour/DetailTour';
import DStour from '../components/Content/ListTour/DStour';
import PageCuisine from '../components/Content/PageXperience/PageCuisine';
import PageEntertain from '../components/Content/PageXperience/PageEntertain';
import PagePlayground from '../components/Content/PageXperience/PagePlayground';
import PageSightSeeing from '../components/Content/PageXperience/PageSightSeeing';
import PageSpa from '../components/Content/PageXperience/PageSpa';
import PageSport from '../components/Content/PageXperience/PageSport';
import PageTour from '../components/Content/PageXperience/PageTour';
import PageTourism from '../components/Content/PageXperience/PageTourism';
import PageTransport from '../components/Content/PageXperience/PageTransport';
import Tour from '../components/Content/Tour/Tour';
import Order from '../components/OrderTour/Order';
import Payment from '../components/Payment/Payment';
import PageRegister from '../components/Register';
import Login from '../Partner/login';
import Manage from '../Partner/Manage';
import QLdondatve from '../Partner/QLdondatve/QLdondatve';
import QLloaitour from '../Partner/QLloaitour/QLloaitour';
import AddTour from '../Partner/QLtour/AddTour';
import QLtour from '../Partner/QLtour/QLtour';
import SuaTour from '../Partner/QLtour/SuaTour';
import QuanLyLoaiVe from '../Partner/QuanLyLoaiVe';
import QuanLyVe from '../Partner/QuanLyVe';
import Register from '../Partner/register';
import Auth from './../components/Auth';
import History from '../views/User/History';
import MemberMangement from '../Partner/MemberManagement';

const Home = lazy(() => import('../views/Home'));
const Search = lazy(() => import('../views/Search'));
const UserAccount = lazy(() => import('../views/User/Account'));

const publicRoles = ['admin', 'partner'];
const adminRoles = ['partner'];

const Routers = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path='/category' element={<Category />} />
          <Route exact path='/search/:key' element={<Search />} />
          <Route exact path='/detail-tour/:id' element={<DetailTour />} />
          <Route exact path='/tour' element={<PageTour />} />
          <Route exact path='/diem-tham-quan' element={<PageSightSeeing />} />
          <Route exact path='/phuong-tien-di-chuyen' element={<PageTransport />} />
          <Route exact path='/am-thuc' element={<PageCuisine />} />
          <Route exact path='/tien-ich-du-lich' element={<PageTourism />} />
          <Route exact path='/giai-tri' element={<PageEntertain />} />
          <Route exact path='/lam-dep-spa' element={<PageSpa />} />
          <Route exact path='/the-thao' element={<PageSport />} />
          <Route exact path='/san-choi' element={<PagePlayground />} />
          <Route exact path='/activities' element={<Tour />} />
          <Route exact path='/payment/:id' element={<Payment />} />
          <Route exact path='/list/:maTinh' element={<DStour />} />
          <Route exact path='/' element={<Home />} />
          <Route exact path='/order/:id' element={<Order />} />
          <Route exact path='/user/account' element={<UserAccount />} />
          <Route exact path='/user/history' element={<History />} />
          <Route exact path='/register' element={<PageRegister />} />

          <Route exact path='/list' element={<DStour />} />
          <Route exact path='/' element={<Home />} />
          <Route exact path='/order/:id' element={<Order />} />
          <Route exact path='/register' element={<PageRegister />} />

          {/* admin */}
          <Route exact path='/admin' element={<Login />} />
          <Route exact path='/admin/register' element={<Register />} />
          <Route
            exact
            path='/admin/thongke'
            element={
              <Auth roles={publicRoles}>
                <Manage />
              </Auth>
            }
          />
          <Route
            exact
            path='/admin/tour'
            element={
              <Auth roles={adminRoles}>
                <QLtour />
              </Auth>
            }
          />
          <Route
            exact
            path='/admin/tour/them'
            element={
              <Auth roles={adminRoles}>
                <AddTour />
              </Auth>
            }
          />
          <Route
            exact
            path='/admin/tour/:id'
            element={
              <Auth roles={adminRoles}>
                <SuaTour />
              </Auth>
            }
          />
          <Route
            exact
            path='/admin/loaitour'
            element={
              <Auth roles={adminRoles}>
                <QLloaitour />
              </Auth>
            }
          />
          <Route
            exact
            path='/admin/dondattour'
            element={
              <Auth roles={publicRoles}>
                <QLdondatve />
              </Auth>
            }
          />
          <Route
            exact
            path='/admin/quan-ly-ve'
            element={
              <Auth roles={publicRoles}>
                <QuanLyVe />
              </Auth>
            }
          />
          <Route
            exact
            path='/admin/quan-ly-loai-ve'
            element={
              <Auth roles={adminRoles}>
                <QuanLyLoaiVe />
              </Auth>
            }
          />
          <Route
            exact
            path='/admin/quan-ly-thanh-vien'
            element={
              <Auth roles={adminRoles}>
                <MemberMangement />
              </Auth>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default memo(Routers);
