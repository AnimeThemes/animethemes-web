import { useRouter } from "next/router";
import useSetting from "hooks/useSetting";
import { RevalidationToken } from "utils/settings";
import { useState } from "react";
import { Text } from "components/text";

interface PageRevalidationProps {
    lastBuildAt: number
    apiRequests: number
}

export function PageRevalidation({ lastBuildAt, apiRequests, ...props }: PageRevalidationProps) {
    const router = useRouter();
    const [secret] = useSetting(RevalidationToken);

    const [isRevalidating, setRevalidating] = useState(false);

    function revalidate() {
        if (isRevalidating || !secret) {
            return;
        }

        setRevalidating(true);

        revalidateAsync()
            .then(() => location.reload())
            .catch((err) => alert(`Error while revalidating: ${err.message}`))
            .finally(() => setRevalidating(false));
    }

    async function revalidateAsync() {
        const res = await fetch(`${router.basePath}/api/revalidate?secret=${secret}&id=${router.asPath}`);
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

    const canRebuild = !isRevalidating && !!secret;
    const rebuildDescription = isRevalidating
        ? "Rebuild in progress... The page will automatically reload after it's finished."
        : (secret
            ? "Click to start a rebuild."
            : "Setup the revalidation token on your profile to manually start a rebuild."
        );

    return (
        <Text variant="small" color="text-disabled" link={canRebuild} onClick={revalidate} {...props}>
            Page was last built {lastBuildDescription} ago{apiRequestsDescription}. {rebuildDescription}
        </Text>
    );
}
