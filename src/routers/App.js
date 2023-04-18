import React, { useEffect, useState } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { useCookies } from "react-cookie";
import moment from "moment/moment";

import { tokenCheck, userCount } from "utils/axios";
import Header from "components/common/Header";
import Footer from "components/common/Footer";
import Close from "components/inicis/Close";
import Main from "pages/main/Main";
import Login from "pages/login/Login";
import Register from "pages/login/Register";
import Admin from "routers/Admin";
import MyPage from "routers/MyPage";
import Product from "./Product";
import Order from "./Order";
import Community from "./community/Community";

import "assets/css/common/common.css";

function App() {
    const nav = useNavigate();
    const location = useLocation();
    const [header, setHeader] = useState(true);
    const [orderData, setOrderData] = useState();
    const [cookies, setCookies] = useCookies();
    const token = useMutation(tokenCheck);
    const userAccessCheck = useMutation(userCount);

    // 방문자 체크
    const accessCheck = async () => {
        const expires = moment().add('10', 'm').toDate();
        if (cookies.userCount !== 'true') {
            setCookies('userCount', true, { expires });
            userAccessCheck.mutate("나 등장~!");
        }
    }

    // 어드민페이지 들어오면 헤더 삭제
    const adminPageCheck = () => {
        const regex = /.*admin.*/;
        if (regex.test(location.pathname)) {
            setHeader(false);
        } else {
            setHeader(true);
        }
    }

    useEffect(() => {
        window.scrollTo(0, 0);
        accessCheck();
        adminPageCheck();
        token.mutateAsync();
    }, [nav])

    return (
        <>
            {header && <Header></Header>}
            <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/admin/*" element={<Admin />} />
                <Route path="/myPage/*" element={<MyPage />} />
                <Route path='/login' element={<Login />} />
                <Route path='/loginRegister' element={<Register />} />
                <Route path="/product/*" element={<Product setOrderData={setOrderData} />} />
                <Route path="/order/*" element={<Order orderData={orderData} />} />
                <Route path="/close" element={<Close />} />
                <Route path="/community/*" element={<Community />} />
            </Routes>
            {header && <Footer></Footer>}
        </>
    );
}

export default App;
