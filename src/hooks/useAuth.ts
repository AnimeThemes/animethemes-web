import { useMutation, useQuery } from "@apollo/client/react";

import { client } from "@/graphql/client";
import { graphql } from "@/graphql/generated";
import { parseSimpleError, parseValidationError, type Result, type ValidationError } from "@/utils/errorHandling";

export interface RegisterOptions {
    name: string;
    email: string;
    password: string;
    passwordConfirmation: string;
    terms: boolean;
}

export interface LoginOptions {
    email: string;
    password: string;
    remember: boolean;
}

export interface UpdateUserInformationOptions {
    name: string;
    email: string;
}

export interface UpdatePasswordOptions {
    currentPassword: string;
    newPassword: string;
    newPasswordConfirmation: string;
}

export interface ForgotPasswordOptions {
    email: string;
}

export interface ResetPasswordOptions {
    email: string;
    password: string;
    passwordConfirmation: string;
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

    async function register({
        name,
        email,
        password,
        passwordConfirmation,
        terms,
    }: RegisterOptions): Promise<Result<void, ValidationError<RegisterOptions>>> {
        try {
            await registerMutation({
                variables: {
                    input: {
                        name,
                        email,
                        password,
                        passwordConfirmation,
                        terms,
                    },
                },
            });

            return { ok: true };
        } catch (error) {
            return { ok: false, error: parseValidationError(error) };
        }
    }

    const [loginMutation] = useMutation(
        graphql(`
            mutation Login($input: LoginInput!) {
                login(input: $input) {
                    id
                }
            }
        `),
    );

    async function login({ email, password }: LoginOptions): Promise<Result<void, ValidationError<LoginOptions>>> {
        try {
            await loginMutation({
                variables: {
                    input: {
                        email,
                        password,
                    },
                },
            });

            await client.refetchQueries({
                include: "active",
            });

            return { ok: true };
        } catch (error) {
            return { ok: false, error: parseValidationError(error) };
        }
    }

    const [updateUserInformationMutation] = useMutation(
        graphql(`
            mutation UpdateUserInformation($input: UpdateUserInformationInput!) {
                updateUserInformation(input: $input)
            }
        `),
    );

    async function updateUserInformation({
        name,
        email,
    }: UpdateUserInformationOptions): Promise<Result<void, ValidationError<UpdateUserInformationOptions>>> {
        try {
            await updateUserInformationMutation({
                variables: {
                    input: {
                        name,
                        email,
                    },
                },
            });

            await client.refetchQueries({
                include: "active",
            });

            return { ok: true };
        } catch (error) {
            return { ok: false, error: parseValidationError(error) };
        }
    }

    const [updatePasswordMutation] = useMutation(
        graphql(`
            mutation UpdatePassword($input: UpdatePasswordInput!) {
                updatePassword(input: $input)
            }
        `),
    );

    async function updatePassword({
        currentPassword,
        newPassword,
        newPasswordConfirmation,
    }: UpdatePasswordOptions): Promise<Result<void, ValidationError<UpdatePasswordOptions>>> {
        try {
            await updatePasswordMutation({
                variables: {
                    input: {
                        currentPassword,
                        newPassword,
                        newPasswordConfirmation,
                    },
                },
            });

            await client.refetchQueries({
                include: "active",
            });

            return { ok: true };
        } catch (error) {
            return { ok: false, error: parseValidationError(error) };
        }
    }

    const [forgotPasswordMutation] = useMutation(
        graphql(`
            mutation ForgotPassword($email: String!) {
                forgotPassword(email: $email)
            }
        `),
    );

    async function forgotPassword({
        email,
    }: ForgotPasswordOptions): Promise<Result<void, ValidationError<ForgotPasswordOptions>>> {
        try {
            await forgotPasswordMutation({
                variables: {
                    email,
                },
            });

            return { ok: true };
        } catch (error) {
            return { ok: false, error: parseValidationError(error) };
        }
    }

    const [resetPasswordMutation] = useMutation(
        graphql(`
            mutation ResetPassword($input: ResetPasswordInput!) {
                resetPassword(input: $input)
            }
        `),
    );

    async function resetPassword({
        email,
        password,
        passwordConfirmation,
        token,
    }: ResetPasswordOptions): Promise<Result<void, ValidationError<ResetPasswordOptions>>> {
        try {
            await resetPasswordMutation({
                variables: {
                    input: {
                        email,
                        password,
                        passwordConfirmation,
                        token,
                    },
                },
            });

            return { ok: true };
        } catch (error) {
            return { ok: false, error: parseValidationError(error) };
        }
    }

    const [resendEmailVerificationMutation] = useMutation(
        graphql(`
            mutation ResendEmailVerification {
                resendEmailVerification
            }
        `),
    );

    async function resendEmailVerification(): Promise<Result<void, string>> {
        try {
            await resendEmailVerificationMutation();

            return { ok: true };
        } catch (error) {
            return { ok: false, error: parseSimpleError(error) };
        }
    }

    const [logoutMutation] = useMutation(
        graphql(`
            mutation Logout {
                logout
            }
        `),
    );

    async function logout() {
        await logoutMutation();

        await client.refetchQueries({
            include: "active",
        });
    }

    return {
        me: data?.me,
        register,
        login,
        updateUserInformation,
        updatePassword,
        forgotPassword,
        resetPassword,
        resendEmailVerification,
        logout,
    };
}
