"use client"

import React, { useState } from "react";
import { signIn } from "next-auth/react";
import Image from "next/image";
import {Button} from "@/components/Button";
import { useRouter } from "next/navigation";

export default function Login() {
    const [form, setForm] = useState({
        email: "",
        password: ""
    });
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        const res = await signIn("credentials", {
            redirect: false,
            email: form.email,
            password: form.password,
        });

        if (res?.error) {
            setError("Adresse email ou mot de passe incorrect.");
        } else {
            router.push("/account");
        }
    };

    const inputStyles = "w-full p-2 border rounded-lg focus:outline-none text-black"

    return (
        <div className="flex items-center justify-center min-h-[calc(100vh-80px)]">
            <div className="w-full max-w-md bg-white p-6 rounded-2xl shadow-lg">
                <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Connexion</h1>
                <form noValidate={true} onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <p className="text-gray-500">Adresse email</p>
                        <input
                            type="email"
                            name="email"
                            placeholder="john.doe@gmail.com"
                            onChange={handleChange}
                            required
                            className={inputStyles}
                        />
                    </div>

                    <div>
                        <p className="text-gray-500">Mot de passe</p>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                placeholder="******"
                                onChange={handleChange}
                                required
                                className={inputStyles}
                            />
                            <button type="button" className="absolute inset-y-0 right-3 flex items-center"
                                    onClick={() => setShowPassword(!showPassword)}>
                                {showPassword ? <Image src={'/assets/oeil.png'} alt={'oeil'} width={20} height={20}/> :
                                    <Image src={'/assets/cacher.png'} alt={'oeil'} width={20} height={20}/>}
                            </button>
                        </div>
                    </div>

                    <Button
                        type="submit"
                        variant="primary"
                        className="w-full"
                    >Connexion</Button>
                </form>
                {error && <p className="text-red-500 text-center mt-3">{error}</p>}
                <p className="text-center text-gray-600 mt-4">
                    Pas de compte ?
                    <a onClick={() => router.push("/register")} className="text-[#157c9c] hover:underline ml-1 hover:cursor-pointer">S&apos;inscrire</a>
                </p>
            </div>
        </div>
    );
}
