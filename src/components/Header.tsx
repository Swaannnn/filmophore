import SearchBar from "@/components/SearchBar"
import {ReactElement} from "react"
import {useRouter} from "next/navigation";
import {useAuth} from "@/context/AuthContext";

export default function Header(): ReactElement {
    const { user, status } = useAuth();
    const router = useRouter();

    return (
        <header className="flex justify-evenly items-center h-16">
            <div className="">
                <a onClick={() => router.push("/")} className="text-xl hover:text-white-secondary hover:cursor-pointer">FilmoPhore</a>
            </div>
            <div className="space-x-6">
                <a onClick={() => router.push("/popularMovies")} className="hover:text-white-secondary hover:cursor-pointer">Films populaires</a>
                <a onClick={() => router.push("/upcomingMovies")} className="hover:text-white-secondary hover:cursor-pointer">Films à venir</a>
                {/*<a onClick={() => router.push("/")} className="hover:text-white-secondary hover:cursor-pointer">Page 3</a>*/}
            </div>
            <div>
                <SearchBar/>
            </div>
            <div>
                {(status === "authenticated" || user) ? (
                    <a onClick={() => router.push("/account")}
                       className="hover:text-white-secondary hover:cursor-pointer">{"Mon compte"}</a>
                ) : (
                    <a onClick={() => router.push("/login")}
                       className="hover:text-white-secondary hover:cursor-pointer">{"Se connecter"}</a>
                )}
            </div>
        </header>
    )
}
