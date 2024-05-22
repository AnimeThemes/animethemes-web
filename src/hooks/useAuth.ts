import gql from "graphql-tag";
import useSWR, { mutate as mutateGlobal } from "swr";

import type { CheckAuthQuery } from "@/generated/graphql";
import { fetchDataClient } from "@/lib/client";
import axios from "@/lib/client/axios";
import { AUTH_PATH } from "@/utils/config";

export default function useAuth() {
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
                            permissions {
                                name
                            }
                            roles {
                                permissions {
                                    name
                                }
                            }
                        }
                    }
                }
            `);

            return data.me;
        },
        { fallbackData: { user: null }, dedupingInterval: 2000 }
    );

    const csrf = () => axios.get(`/sanctum/csrf-cookie`);

    const register = async ({ setErrors, ...props }: any) => {
        await csrf();

        setErrors([]);

        axios
            .post(`${AUTH_PATH}/register`, props)
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
            .post(`${AUTH_PATH}/login`, props)
            .then(() => mutateGlobal(() => true))
            .catch(error => {
                if (error.response.status !== 422) {
                    throw error;
                }

                setErrors(error.response.data.errors);
            });
    };

    const forgotPassword = async (props: any) => {
        await csrf();

        return await axios.post(`${AUTH_PATH}/forgot-password`, props);
    };

    const resetPassword = async (props: any) => {
        await csrf();

        await axios.post(`${AUTH_PATH}/reset-password`, props);
    };

    const resendEmailVerification = async () => {
        await axios.post(`${AUTH_PATH}/email/verification-notification`);
    };

    const logout = async () => {
        await axios.post(`${AUTH_PATH}/logout`).then(() => mutateGlobal(() => true));
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
