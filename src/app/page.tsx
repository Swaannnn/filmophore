"use client";

import { ReactElement, useEffect } from "react";
import { useSession } from "next-auth/react";
import Loader from "@/components/Loader/Loader";
import { useRouter } from "next/navigation";

export default function Home(): ReactElement {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === "authenticated") {
            router.push("/dashboard");
        } else if (status === "unauthenticated") {
            router.push("/welcome");
        }
    });

    if (status === "loading") {
        return <Loader />;
    }

    return <></>;
}
