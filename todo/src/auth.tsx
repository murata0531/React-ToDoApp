import axios from "./libs/axios";
import { useEffect, useState } from "react";

type User = {
    id: number;
}

export default function Auth() {
    const [user, setUser] = useState<User | 0>(0);
    useEffect(() => {
        axios.get("/sanctum/csrf-cookie").then((response) => {
            console.log(response);
            axios
            .post("/api/login", {
                email: 'test@test.com',
                password: 'testtest123'
            })
            .then(res => {
                console.log(res);
                if (res.status === 200) {
                    console.log('[login]ログイン成功');
                    setUser(res.data);
                } else {
                    console.log(res.data.message);
                    console.log('[login]ログイン失敗');
                }
            })
            .catch((err) => {
              console.log(err.response);
            });
        });
    }, []);

    return (
        <>
            <p>Welcome id: {user.toString()}</p>
      </>
    );
};
  