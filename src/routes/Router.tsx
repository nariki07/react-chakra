import {Route, Routes} from "react-router-dom";
import {FC, memo} from "react";
import {Login} from "../components/pages/Login";
import {homeRouter} from "./HomeRouter";
import {Page404} from "../components/pages/Page404";
import {HeaderLayout} from "../components/templates/HeaderLayout";
import {LoginUserProvider} from "../providers/LoginUserProvider";

export const Router: FC = memo(() => {
    return (
        <LoginUserProvider>
        <Routes>
                <Route path="/" element={<Login/>}/>
                {homeRouter.map((route) => (
                    <Route key={route.path} path={route.path} element={<HeaderLayout>{route.children}</HeaderLayout>}/>
                ))}
                <Route path="*" element={<Page404/>}/>
        </Routes>
        </LoginUserProvider>
    )
})

