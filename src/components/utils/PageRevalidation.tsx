import { useMemo, useState } from "react";
import { useRouter } from "next/router";

import { Text } from "@/components/text/Text";
import useAuth from "@/hooks/useAuth";

interface PageRevalidationProps {
    lastBuildAt: number;
    apiRequests: number;
}

export function PageRevalidation({ lastBuildAt, apiRequests, ...props }: PageRevalidationProps) {
    const router = useRouter();
    const { me } = useAuth();
    const canRevalidate = useMemo(() => {
        const userPermissions = me.user?.permissions ?? [];
        const rolePermissions = me.user?.roles.flatMap((role) => role.permissions) ?? [];
        for (const permission of [...userPermissions, ...rolePermissions]) {
            if (permission.name === "revalidate pages") {
                return true;
            }
        }
        return false;
    }, [me]);

    const [isRevalidating, setRevalidating] = useState(false);

    function revalidate() {
        if (isRevalidating || !canRevalidate) {
            return;
        }

        setRevalidating(true);

        revalidateAsync()
            .then(() => location.reload())
            .catch((err) => alert(`Error while revalidating: ${err.message}`))
            .finally(() => setRevalidating(false));
    }

    async function revalidateAsync() {
        const res = await fetch(`${router.basePath}/api/revalidate?id=${router.asPath}`);
        if (!res.ok) {
            throw new Error((await res.json()).message);
        }

        const json = await res.json();
        if (!json.revalidated) {
            throw new Error();
        }

        return json;
    }

    const minutesSinceLastBuild = Math.round((Date.now() - lastBuildAt) / 60000);
    const lastBuildDescription = minutesSinceLastBuild
        ? `${minutesSinceLastBuild} minute${minutesSinceLastBuild === 1 ? "" : "s"}`
        : "a few seconds";

    const apiRequestsDescription = apiRequests
        ? ` using ${apiRequests} API request${apiRequests === 1 ? "" : "s"}`
        : "";

    const rebuildDescription = isRevalidating
        ? "Rebuild in progress... The page will automatically reload after it's finished."
        : "Click to start a rebuild.";

    if (canRevalidate) {
        return (
            <Text variant="small" color="text-disabled" link={!isRevalidating} onClick={revalidate} {...props}>
                Page was last updated {lastBuildDescription} ago{apiRequestsDescription}. {rebuildDescription}
            </Text>
        );
    }

    return (
        <Text variant="small" color="text-disabled" {...props}>
            Page was last updated {lastBuildDescription} ago.
        </Text>
    );
}
