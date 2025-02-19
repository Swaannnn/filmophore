import SearchBar from "@/components/SearchBar"
import {ReactElement, useEffect, useState} from "react"
import {useSession} from "next-auth/react";
import {useRouter} from "next/navigation";

export default function Header(): ReactElement {
    const {data: session, status} = useSession();
    const router = useRouter();

    const storedText = localStorage.getItem("lastStateText");
    const storedLink = localStorage.getItem("lastStateLink");

    const [lastStateText, setLastStateText] = useState(storedText);
    const [lastStateLink, setLastStateLink] = useState(storedLink);

    useEffect(() => {
        if (status === "authenticated") {
            setLastStateText("Mon compte");
            setLastStateLink("/account");
            localStorage.setItem("lastStateText", "Mon compte");
            localStorage.setItem("lastStateLink", "/account");
        } else if (status === "unauthenticated") {
            setLastStateText("Se connecter");
            setLastStateLink("/login");
            localStorage.setItem("lastStateText", "Se connecter");
            localStorage.setItem("lastStateLink", "/login");
        }
    }, [status]);

    return (
        <header className="flex justify-evenly items-center h-16">
            <div className="">
                <a onClick={() => router.push("/")} className="text-xl hover:text-white-secondary hover:cursor-pointer">FilmoPhore</a>
            </div>
            <div className="space-x-6">
                <a onClick={() => router.push("/popularMovies")} className="hover:text-white-secondary hover:cursor-pointer">Films populaires</a>
                <a onClick={() => router.push("/upcomingMovies")} className="hover:text-white-secondary hover:cursor-pointer">films à venir</a>
                <a onClick={() => router.push("/")} className="hover:text-white-secondary hover:cursor-pointer">Page 3</a>
            </div>
            <div>
                <SearchBar/>
            </div>
            <div>
                {lastStateText && lastStateLink && (
                    <a onClick={() => router.push(lastStateLink)} className="hover:text-white-secondary hover:cursor-pointer">{lastStateText}</a>
                )}
            </div>
        </header>
    )
}
