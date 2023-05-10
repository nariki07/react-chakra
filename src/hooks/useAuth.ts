import {useCallback, useState} from "react";
import axios from "axios";
import {User} from "../types/api/user";
import {useNavigate} from "react-router-dom";
import {useMessage} from "./useMessage";
import {useLoginUser} from "./useLoginUser";

export const useAuth = () => {
    const navigation = useNavigate();
    const {showMessage} = useMessage();
    const { setLoginUser} = useLoginUser();
    const [loading, setLoading] = useState(false);

    const login = useCallback((id: string) => {
        setLoading(true);
        axios.get<User>(`https://jsonplaceholder.typicode.com/users/${id}`).then((res) => {
            if (res.data) {
                const isAdmin = res.data.id === 10 ? true :false;
                setLoginUser({...res.data, isAdmin});
                showMessage({title: "ログインしました", status:"success"})
                navigation("/home");
            } else {
                showMessage({title: "ユーザーが見つかりません。", status:"error"})
            }
        }).catch(() => showMessage({title: "ログインできません", status:"error"})).finally(() => setLoading(false));
    }, [navigation]);
    return {login,loading,showMessage};
}