import useSWR, { mutate as mutateGlobal } from "swr";
import axios from "lib/client/axios";
import { useRouter } from "next/router";
import { fetchDataClient } from "lib/client";
import gql from "graphql-tag";
import type { CheckAuthQuery } from "generated/graphql";

export default function useAuth() {
    const router = useRouter();

    const { data: me } = useSWR(
        "/api/me",
        async () => {
            const { data } = await fetchDataClient<CheckAuthQuery>(gql`
                query CheckAuth {
                    me {
                        user {
                            id
                            name
                            email
                        }
                    }
                }
            `);

            return data.me;
        },
        { fallbackData: { user: null }, dedupingInterval: 2000 }
    );

    const csrf = () => axios.get("/sanctum/csrf-cookie");

    const register = async ({ setErrors, ...props }: any) => {
        await csrf();

        setErrors([]);

        axios
            .post("/register", props)
            .then(() => mutateGlobal(() => true))
            .catch(error => {
                if (error.response.status !== 422) {throw error;}

                setErrors(error.response.data.errors);
            });
    };

    const login = async ({ setErrors, ...props }: any) => {
        await csrf();

        setErrors([]);

        await axios
            .post("/login", props)
            .then(() => mutateGlobal(() => true))
            .catch(error => {
                if (error.response.status !== 422) {
                    throw error;
                }

                setErrors(error.response.data.errors);
            });
    };

    const forgotPassword = async ({ setErrors, setStatus, email }: any) => {
        await csrf();

        setErrors([]);
        setStatus(null);

        axios
            .post("/forgot-password", { email })
            .then(response => setStatus(response.data.status))
            .catch(error => {
                if (error.response.status !== 422) {throw error;}

                setErrors(error.response.data.errors);
            });
    };

    const resetPassword = async ({ setErrors, setStatus, ...props }: any) => {
        await csrf();

        setErrors([]);
        setStatus(null);

        axios
            .post("/reset-password", { token: router.query.token, ...props })
            .then(response =>
                router.push("/login?reset=" + btoa(response.data.status)),
            )
            .catch(error => {
                if (error.response.status !== 422) {throw error;}

                setErrors(error.response.data.errors);
            });
    };

    const resendEmailVerification = ({ setStatus }: any) => {
        axios
            .post("/email/verification-notification")
            .then(response => setStatus(response.data.status));
    };

    const logout = async () => {
        await axios.post("/logout").then(() => mutateGlobal(() => true));
    };

    return {
        me,
        register,
        login,
        forgotPassword,
        resetPassword,
        resendEmailVerification,
        logout,
    };
}
