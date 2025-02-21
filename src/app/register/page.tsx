"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/Button";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { registerUser } from "@/services/userService";
import {useAuth} from "@/context/AuthContext";

export default function Register() {
    const router = useRouter();
    const {user, status} = useAuth();

    const [form, setForm] = useState({
        username: "",
        email: "",
        password: "",
        passwordConfirmation: "",
    });
    const [error, setError] = useState("");
    const [usernameError, setUsernameError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [success, setSuccess] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const validateEmail = (email: string) => {
        return /^[\w-.]+@[\w-]+\.[a-zA-Z]{2,}$/.test(email);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setUsernameError("");
        setEmailError("");
        setPasswordError("");
        setSuccess("");

        let haserror = false;

        if (!form.username) {
            setUsernameError("Le nom d'utilisateur est requis.");
            haserror = true;
        }
        if (!form.email) {
            setEmailError("L'adresse email est requise.");
            haserror = true;
        } else if (!validateEmail(form.email)) {
            setEmailError("L'adresse email n'est pas valide.");
            haserror = true;
        }
        if (!form.password) {
            setPasswordError("Le mot de passe est requis.");
            haserror = true;
        }
        if (form.password !== form.passwordConfirmation) {
            setPasswordError("Les mots de passe ne correspondent pas !");
            haserror = true;
        } else if (form.password.length < 6) {
            setPasswordError("Le mot de passe doit faire au moins 6 caractères.");
            haserror = true;
        }

        if (haserror) {
            return;
        }

        try {
            await registerUser(form);

            const signInResponse = await signIn("credentials", {
                redirect: false,
                email: form.email,
                password: form.password,
            });

            if (signInResponse?.error) {
                setError("Problème de connexion");
            } else {
                router.push("/dashboard");
            }
        } catch (err) {
            setError((err as Error).message || "Une erreur est survenue");
        }
    };

    const inputStyles = "w-full p-2 border rounded-lg focus:outline-none text-black"

    if (user || status === "authenticated") router.push("/account");

    return (
        <div className="flex items-center justify-center min-h-[calc(100vh-80px)]">
            <div className="w-full max-w-md bg-white p-6 rounded-2xl shadow-lg">
                <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Inscription</h1>
                <form noValidate={true} onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <p className="text-gray-500">Nom d&apos;utilisateur</p>
                        <input
                            type="text"
                            name="username"
                            placeholder="johndoe42"
                            onChange={handleChange}
                            required
                            className={`${inputStyles} ${usernameError ? "border-red-500" : "border-gray-300"}`}
                        />
                        {usernameError && <p className="text-red-500 text-sm">{usernameError}</p>}
                    </div>
                    <div>
                        <p className="text-gray-500">Adresse email</p>
                        <input
                            type="email"
                            name="email"
                            placeholder="john.doe@gmail.com"
                            onChange={handleChange}
                            required
                            className={`${inputStyles} ${emailError ? "border-red-500" : "border-gray-300"}`}
                        />
                        {emailError && <p className="text-red-500 text-sm">{emailError}</p>}
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
                                className={`${inputStyles} ${passwordError ? "border-red-500" : "border-gray-300"}`}
                            />
                            <button type="button" className="absolute inset-y-0 right-3 flex items-center"
                                    onClick={() => setShowPassword(!showPassword)}>
                                {showPassword ?
                                    <Image src={'/assets/oeil.png'} alt={'oeil'} width={20} height={20}/> :
                                    <Image src={'/assets/cacher.png'} alt={'oeil'} width={20} height={20}/>
                                }
                            </button>
                        </div>
                    </div>

                    <div>
                        <p className="text-gray-500">Confirmation mot de passe</p>
                        <div className="relative">
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                name="passwordConfirmation"
                                placeholder="******"
                                onChange={handleChange}
                                required
                                className={`${inputStyles} ${passwordError ? "border-red-500" : "border-gray-300"}`}
                            />
                            <button type="button" className="absolute inset-y-0 right-3 flex items-center"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                                {showConfirmPassword ?
                                    <Image src={'/assets/oeil.png'} alt={'oeil'} width={20} height={20}/> :
                                    <Image src={'/assets/cacher.png'} alt={'oeil'} width={20} height={20}/>
                                }
                            </button>
                        </div>
                        {passwordError && <p className="text-red-500 text-sm">{passwordError}</p>}
                    </div>

                    <Button
                        type="submit"
                        variant="primary"
                        className="w-full"
                    >S&apos;inscrire</Button>
                </form>
                {error && <p className="text-red-500 text-center mt-3">{error}</p>}
                {success && <p className="text-green-500 text-center mt-3">{success}</p>}
                <p className="text-center text-gray-600 mt-4">
                    Déjà un compte ?
                    <Button
                        variant={'outline'}
                        url={'/login'}
                        className="ml-1"
                    >Se connecter</Button>
                </p>
            </div>
        </div>
    );
}
