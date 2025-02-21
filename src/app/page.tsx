"use client";

import { ReactElement, useEffect } from "react";
import Loader from "@/components/Loader/Loader";
import { useRouter } from "next/navigation";
import {useAuth} from "@/context/AuthContext";

export default function Home(): ReactElement {
    const {user, status } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (status === "authenticated" || user) {
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
