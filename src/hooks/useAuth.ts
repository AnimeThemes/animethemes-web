import { CombinedGraphQLErrors } from "@apollo/client";
import { useMutation, useQuery } from "@apollo/client/react";

import { client } from "@/graphql/client";
import { graphql } from "@/graphql/generated";
import axios from "@/lib/client/axios";
import { AUTH_PATH } from "@/utils/config";

export interface RegisterErrors {
    name?: Array<string>;
    email?: Array<string>;
    password?: Array<string>;
}

interface RegisterProps {
    setErrors: (errors: RegisterErrors) => void;
    name: string;
    email: string;
    password: string;
    passwordConfirmation: string;
    terms: boolean;
}

export interface LoginErrors {
    email?: Array<string>;
}

interface LoginProps {
    setErrors: (errors: LoginErrors) => void;
    email: string;
    password: string;
    remember: boolean;
}

interface UpdateUserInformationProps {
    setErrors: (errors: LoginErrors) => void;
    name: string;
    email: string;
}

interface ForgotPasswordProps {
    email: string;
}

interface ResetPasswordProps {
    email: string;
    password: string;
    password_confirmation: string;
    token: string;
}

const USE_AUTH_ME_QUERY = graphql(`
    query UseAuthMe {
        me {
            ...ProfileImageUser
            id
            name
            email
            roles {
                name
            }
        }
    }
`);

export default function useAuth() {
    const { data } = useQuery(USE_AUTH_ME_QUERY);

    const csrf = () => axios.get(`/sanctum/csrf-cookie`);

    const [registerMutation] = useMutation(
        graphql(`
            mutation Register($input: RegisterInput!) {
                register(input: $input) {
                    id
                }
            }
        `),
        {
            refetchQueries: [USE_AUTH_ME_QUERY],
        },
    );

    const register = async ({ setErrors, ...props }: RegisterProps) => {
        await registerMutation({
            variables: {
                input: {
                    name: props.name,
                    email: props.email,
                    password: props.password,
                    passwordConfirmation: props.passwordConfirmation,
                    terms: props.terms,
                },
            },
            onError(error) {
                if (!CombinedGraphQLErrors.is(error)) {
                    return;
                }

                if (error.extensions?.code === "VALIDATION") {
                    setErrors(error.extensions.validation ?? {});
                }
            },
        });
    };

    const [loginMutation] = useMutation(
        graphql(`
            mutation Login($input: LoginInput!) {
                login(input: $input) {
                    id
                }
            }
        `),
    );

    const login = async ({ setErrors, ...props }: LoginProps) => {
        await loginMutation({
            variables: {
                input: {
                    email: props.email,
                    password: props.password,
                },
            },
            onError(error) {
                if (!CombinedGraphQLErrors.is(error)) {
                    return;
                }

                if (error.extensions?.code === "VALIDATION") {
                    setErrors(error.extensions.validation ?? {});
                }
            },
        });

        await client.refetchQueries({
            include: "active",
        });
    };

    const [updateUserInformationMutation] = useMutation(
        graphql(`
            mutation UpdateUserInformation($input: UpdateUserInformationInput!) {
                updateUserInformation(input: $input)
            }
        `),
    );

    const updateUserInformation = async ({ setErrors, ...props }: UpdateUserInformationProps) => {
        await updateUserInformationMutation({
            variables: {
                input: {
                    name: props.name,
                    email: props.email,
                },
            },
            onError(error) {
                if (!CombinedGraphQLErrors.is(error)) {
                    return;
                }

                if (error.extensions?.code === "VALIDATION") {
                    setErrors(error.extensions.validation ?? {});
                }
            },
        });

        await client.refetchQueries({
            include: "active",
        });
    };

    const forgotPassword = async (props: ForgotPasswordProps) => {
        await csrf();

        return axios.post(`${AUTH_PATH}/forgot-password`, props);
    };

    const resetPassword = async (props: ResetPasswordProps) => {
        await csrf();

        await axios.post(`${AUTH_PATH}/reset-password`, props);
    };

    const resendEmailVerification = async () => {
        await axios.post(`${AUTH_PATH}/email/verification-notification`);
    };

    const [logoutMutation] = useMutation(
        graphql(`
            mutation Logout {
                logout
            }
        `),
    );

    const logout = async () => {
        await logoutMutation();

        await client.refetchQueries({
            include: "active",
        });
    };

    return {
        me: data?.me,
        register,
        login,
        updateUserInformation,
        forgotPassword,
        resetPassword,
        resendEmailVerification,
        logout,
    };
}
