import React, { lazy, memo } from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Category from "../components/Category"
import Tour from "../components/Content/Tour/Tour";
import DetailTour from "../components/Content/DetailTour/DetailTour";
import PageTour from "../components/Content/PageXperience/PageTour";
import PageSightSeeing from "../components/Content/PageXperience/PageSightSeeing";
import PageTransport from "../components/Content/PageXperience/PageTransport";
import PageCuisine from "../components/Content/PageXperience/PageCuisine";
import PageTourism from "../components/Content/PageXperience/PageTourism";
import PageEntertain from "../components/Content/PageXperience/PageEntertain";
import PageSpa from "../components/Content/PageXperience/PageSpa";
import PageSport from "../components/Content/PageXperience/PageSport";
import PagePlayground from "../components/Content/PageXperience/PagePlayground";
import Order from '../components/OrderTour/Order';
import DStour from '../components/Content/ListTour/DStour';
import Manage from '../Partner/Manage';
import QLtour from '../Partner/QLtour/QLtour';
import ThemTour from '../Partner/QLtour/ThemTour';
import SuaTour from '../Partner/QLtour/SuaTour';
import QLloaitour from '../Partner/QLloaitour/QLloaitour';
import ThemLoaiTour from '../Partner/QLloaitour/ThemLoaiTour';
import PageRegister from "../components/Register";
import QLdondatve from '../Partner/QLdondatve/QLdondatve';
import Login from '../Partner/login';
import Register from '../Partner/register';
import Payment from '../components/Payment/Payment';



const Home = lazy(() => import('../views/Home'));
const Search = lazy(() => import('../views/Search'));
const UserAccount = lazy(() => import('../views/User/Account'))
// const UserPurchase = lazy(() => import('../views/User/Purchase'))

const Routers = () => {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route exact path="/category" element={<Category/>} />
                    <Route exact path="/search/:key" element={<Search/>} />
                    <Route exact path="/detail-tour/:id" element={<DetailTour/>} />
                    <Route exact path="/tour" element={<PageTour/>} />
                    <Route exact path="/diem-tham-quan" element={<PageSightSeeing/>} />
                    <Route exact path="/phuong-tien-di-chuyen" element={<PageTransport/>} />
                    <Route exact path="/am-thuc" element={<PageCuisine/>} />
                    <Route exact path="/tien-ich-du-lich" element={<PageTourism/>} />
                    <Route exact path="/giai-tri" element={<PageEntertain/>} />
                    <Route exact path="/lam-dep-spa" element={<PageSpa/>} />
                    <Route exact path="/the-thao" element={<PageSport/>} />
                    <Route exact path="/san-choi" element={<PagePlayground/>} />
                    <Route exact path="/activities" element={<Tour/>} />
                    <Route exact path="/payment/:id" element={<Payment/>} />
                    <Route exact path="/list" element={<DStour/>} />
                    <Route exact path="/" element={<Home/>} />
                    <Route exact path="/order/:id" element={<Order/>}/>
                    <Route exact path='/user/account' element={<UserAccount/>} />
                    {/* <Route exact path='/user/purchase/list' element={<UserPurchase/>} /> */}
                    <Route exact path="/register" element={<PageRegister/>} />

                    {/* admin */}
                    <Route exact path="/admin" element={<Login/>}/>
                    <Route exact path="/admin/register" element={<Register/>}/>
                    <Route exact path="/admin/thongke" element={<Manage/>}/>
                    <Route exact path="/admin/tour" element={<QLtour/>}/>
                    <Route exact path="/admin/tour/them" element={<ThemTour/>}/>
                    <Route exact path="/admin/tour/:id" element={<SuaTour/>}/>
                    <Route exact path="/admin/loaitour" element={<QLloaitour/>}/>
                    <Route exact path="/admin/loaitour/them" element={<ThemLoaiTour/>}/>
                    <Route exact path="/admin/dondattour" element={<QLdondatve/>}/>

                </Routes>
            </BrowserRouter>
        </>
    )
}

export default memo(Routers)