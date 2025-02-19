"use client";

import {signOut, useSession} from "next-auth/react";
import Image from "next/image";
import Loader from "@/components/Loader/Loader";
import { Button } from "@/components/Button";
import Unconnect from "@/components/Unconnect";
import React, { useState } from "react";

export default function Account() {
    const { data: session, status, update} = useSession();

    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [modifying, setModifying] = useState(false);

    if (status === "loading") return <Loader />;
    if (status === "unauthenticated") return <Unconnect />
    if (session === null) return <Unconnect />;

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setModifying(true);
        const file = event.target.files?.[0];
        if (file) {
            setSelectedFile(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const uploadImage = async () => {
        if (!selectedFile || !session?.user?.id) return;

        const formData = new FormData();
        formData.append("file", selectedFile);
        formData.append("userId", session.user.id);

        const response = await fetch("/api/upload-image", {
            method: "POST",
            body: formData,
        });

        if (response.ok) {
            const data = await response.json();
            await update({ image: data.imageUrl });
            setModifying(false);
        } else {
            console.error("Erreur lors de l'upload :", await response.text());
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] p-6">
            <h1 className="text-2xl font-bold mb-6">Bienvenue</h1>

            <div className="bg-gray-950 p-6 rounded-lg shadow-lg w-full max-w-md">
                <div className="flex flex-col items-center mt-6">
                    {preview || session.user?.image ? (
                        <div className="relative w-32 h-32">
                            <Image
                                src={preview ?? session.user?.image ?? "/default-avatar.png"}
                                alt="Photo de profil"
                                sizes="auto"
                                fill
                                style={{
                                    objectFit: 'cover',
                                    objectPosition: 'center',
                                }}
                                className="rounded-full border-2 border-gray-600"
                            />
                        </div>
                    ) : (
                        <div className="w-24 h-24 rounded-full bg-gray-600 flex items-center justify-center">
                            <span className="text-gray-400">Aucune photo</span>
                        </div>
                    )}

                    {!modifying && (
                        <div>
                            <label
                                htmlFor="image"
                                className="cursor-pointer text-white-secondary hover:text-[#A3A9A7] transition"
                            >
                                Changer de photo
                            </label>
                            <input
                                type="file"
                                id="image"
                                name="image"
                                accept="image/png, image/jpeg"
                                className="hidden"
                                onChange={handleFileChange}
                            />
                        </div>
                    )}

                    {selectedFile && modifying && (
                        <a onClick={uploadImage}
                           className="cursor-pointer text-white-secondary hover:text-[#A3A9A7] transition">
                            Sauvegarder
                        </a>
                    )}
                </div>

                <table className="w-full text-left">
                    <tbody>
                    <tr className="border-b border-gray-700">
                        <td className="py-2 font-semibold">Nom d&apos;utilisateur :</td>
                        <td className="py-2">{session.user?.username}</td>
                    </tr>
                    <tr className="border-b border-gray-700">
                        <td className="py-2 font-semibold">Email :</td>
                        <td className="py-2">{session.user?.email}</td>
                    </tr>
                    {/*<tr className="border-b border-gray-700">*/}
                    {/*    <td className="py-2 font-semibold">Nom :</td>*/}
                    {/*    <td className="py-2">John</td>*/}
                    {/*</tr>*/}
                    {/*<tr>*/}
                    {/*    <td className="py-2 font-semibold">Prénom :</td>*/}
                    {/*    <td className="py-2">Doe</td>*/}
                    {/*</tr>*/}
                    </tbody>
                </table>

                <div className="mt-6 flex justify-center">
                    <Button variant={'primary'} onClick={() => signOut({callbackUrl: '/login'})}>
                        Se déconnecter
                    </Button>
                </div>
            </div>
        </div>
    );
}
