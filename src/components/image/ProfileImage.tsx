import md5 from "md5";

import { type FragmentType, getFragmentData, graphql } from "@/graphql/generated";

const fragments = {
    user: graphql(`
        fragment ProfileImageUser on Me {
            name
            email
        }
    `),
};

interface ProfileImageProps {
    user: FragmentType<typeof fragments.user>;
    size?: number;
}

export function ProfileImage({ user: userFragment, size = 80, ...props }: ProfileImageProps) {
    const user = getFragmentData(fragments.user, userFragment);

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
