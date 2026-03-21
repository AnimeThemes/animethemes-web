import md5 from "md5";

import { type FragmentType, getFragmentData, graphql } from "@/graphql/generated";

export const PROFILE_IMAGE_USER = graphql(`
    fragment ProfileImageUser on Me {
        name
        email
    }
`);

interface ProfileImageProps {
    user: FragmentType<typeof PROFILE_IMAGE_USER>;
    size?: number;
}

export function ProfileImage({ user: userFragment, size = 80, ...props }: ProfileImageProps) {
    const user = getFragmentData(PROFILE_IMAGE_USER, userFragment);

    const hash = md5(user.email.trim().toLowerCase());

    return (
        <img
            src={`https://www.gravatar.com/avatar/${hash}?s=${size}&d=identicon`}
            alt={user.name}
            width={size}
            height={size}
            {...props}
        />
    );
}
