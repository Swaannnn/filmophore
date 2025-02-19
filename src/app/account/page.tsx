"use client"

import {signOut, useSession} from "next-auth/react";
import Image from "next/image";
import Loader from "@/components/Loader/Loader";
import {Button} from "@/components/Button";
import Unconnect from "@/components/Unconnect";

export default function Account() {
    const { data: session, status } = useSession();

    // Si l'utilisateur n'est pas connecté, on redirige vers la page de connexion
    if (status === "loading") {
        return <Loader />
    }

    if (!session) {
        return (
            <Unconnect />
        );
    }

    // Une fois l'utilisateur connecté, afficher ses informations
    return (
        <div>
            <h1>Bienvenue sur votre compte</h1>
            <p><strong>Nom d&apos;utilisateur:</strong> {session.user?.name}</p>
            {session.user?.image && <Image src={session.user?.image} alt="profil image" />}
            <p><strong>Email:</strong> {session.user?.email}</p>

            <div>
                <Button
                    variant={'primary'}
                    onClick={() => signOut({callbackUrl: '/login'})}
                >Se déconnecter</Button>
            </div>
        </div>
    );
}
