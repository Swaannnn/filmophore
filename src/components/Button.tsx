"use client"

import { ButtonHTMLAttributes, ReactElement } from "react";
import clsx from "clsx";
import {useRouter} from "next/navigation";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    url?: string;
    variant: "primary" | "secondary" | "outline";
    children: string;
}

export function Button({ variant, className, url, children, ...props }: ButtonProps): ReactElement {
    const router = useRouter();

    const variants = {
        primary: "bg-black border rounded-full px-8 py-2 transition transform duration-150 hover:bg-white hover:text-black hover:cursor-pointer",
        secondary: "bg-white text-black border rounded-full px-8 py-2 transition transform duration-150 hover:bg-black hover:text-white hover:cursor-pointer",
        outline: "bg-transparent border border-gray-300 text-gray-700 hover:bg-gray-100 focus:ring-gray-500 hover:cursor-pointer"
    };

    const classes = clsx(variants[variant], className);

    return url ? (
        <a onClick={() => router.push(url)} className={classes}>
            {children}
        </a>
    ) : (
        <button className={classes} {...props}>
            {children}
        </button>
    );
}
