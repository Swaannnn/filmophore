"use client";

import {signOut} from "next-auth/react";
import Image from "next/image";
import Loader from "@/components/Loader/Loader";
import { Button } from "@/components/Button";
import Unconnect from "@/components/Unconnect";
import React, { useState } from "react";
import {useAuth} from "@/context/AuthContext";
import ProfileImage from "@/components/ProfileImage";

export default function Account() {
    const { user, status } = useAuth();

    const [preview, setPreview] = useState<string | null>(null);
    const [modifying, setModifying] = useState(false);
    const [popUpChangeImage, setPopUpChangeImage] = useState(false);
    const [activeImage, setActiveImage] = useState(-1);
    const [errorImage, setErrorImage] = useState(false);

    if (status === "loading") return <Loader />;
    if (status === "unauthenticated") return <Unconnect />
    if (!user) return <Unconnect />;

    const images = [
        "/assets/profile/jinx.png",
        "/assets/profile/totoro.jpg",
        "/assets/profile/darth_vader.jpeg",
        "/assets/profile/gandalf.jpeg",
        "/assets/profile/jon_snow.jpg",
        "/assets/profile/jack_sparrow.jpg",
        "/assets/profile/spider_man.jpg",
        "/assets/profile/harry_potter.jpg",
        "/assets/profile/shrek.jpg",
        "/assets/profile/tyler.jpg",
    ]

    const handleChangeImage = () => {
        setPopUpChangeImage(true);
        console.log("clic ok")
    }

    const handleCancel = () => {
        setPopUpChangeImage(false);
        setErrorImage(false);
        setActiveImage(-1);
    }

    const handleValid = async () => {
        if (activeImage === -1) {
            setErrorImage(true);
            return;
        }

        if (user) {
            const response = await fetch(`/api/update-image`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId: user.id,
                    image: images[activeImage],
                }),
            });

            if (response.ok) {
                console.log('Image de profil modifiée avec succès');
                window.location.reload();
            } else {
                console.error('Erreur lors de la modification de l\'image de profile');
            }
        }

        setPopUpChangeImage(false);
        setActiveImage(-1);
    }

    const handleClickImage = (i: number) => {
        setActiveImage(i);
        setErrorImage(false);
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] p-6">
            <div className="bg-gray-950 p-6 rounded-lg shadow-lg w-full max-w-md">
                <div className="flex flex-col items-center mt-6">
                    {preview || user?.image ? (
                        <div className="relative w-32 h-32">
                            <Image
                                src={preview ?? user?.image ?? "/default-avatar.png"}
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
                        <div className="w-32 h-32 rounded-full bg-gray-600 flex items-center justify-center">
                            <span className="text-gray-400">Aucune photo</span>
                        </div>
                    )}

                    {!modifying && (
                        <div>
                            <a
                                className="cursor-pointer text-white-secondary hover:text-[#A3A9A7] transition"
                                onClick={handleChangeImage}
                            >Changer d&apos;image</a>
                        </div>
                    )}
                </div>

                <table className="w-full text-left">
                    <tbody>
                    <tr className="border-b border-gray-700">
                        <td className="py-2 font-semibold">Nom d&apos;utilisateur :</td>
                        <td className="py-2">{user?.username}</td>
                    </tr>
                    <tr className="border-b border-gray-700">
                        <td className="py-2 font-semibold">Email :</td>
                        <td className="py-2">{user?.email}</td>
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

            {popUpChangeImage && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-gray-900 text-white p-6 rounded-lg shadow-lg w-[800px]">
                        <h2 className="text-xl font-semibold mb-4 text-center">
                            Modifier ma photo de profil
                        </h2>

                        <div className="flex flex-wrap gap-4 justify-center">
                            {images.map((image, i) => (
                                <ProfileImage
                                    key={i}
                                    path={image}
                                    alt={image}
                                    isActive={activeImage === i}
                                    onClick={() => handleClickImage(i)}
                                />
                            ))}
                        </div>

                        {errorImage ? (
                            <p className="text-red-500 text-center mt-4">Veuillez séléctionner une image.</p>
                        ) : (
                            <p className="mt-4">&nbsp;</p>
                        )}

                        <div className="flex justify-between mt-4">
                            <Button variant="primary" onClick={handleCancel}>
                                Annuler
                            </Button>
                            <Button variant="secondary" onClick={handleValid}>
                                Valider
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
