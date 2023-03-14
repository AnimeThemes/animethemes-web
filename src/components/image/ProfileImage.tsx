import gql from "graphql-tag";
import type { ProfileImageUserFragment } from "generated/graphql";
import md5 from "md5";

interface ProfileImageProps {
    user: ProfileImageUserFragment;
    size?: number;
}

export function ProfileImage({ user, size = 80, ...props }: ProfileImageProps) {
    const hash = md5(user.email.trim().toLowerCase());

    return (
        <img
            src={`https://www.gravatar.com/avatar/${hash}?s=${size}`}
            alt={user.name}
            width={size}
            height={size}
            {...props}
        />
    );
}

ProfileImage.fragments = {
    user: gql`
        fragment ProfileImageUser on UserAuth {
            name
            email
        }
    `,
};
