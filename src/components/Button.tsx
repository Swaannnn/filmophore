import {ButtonHTMLAttributes, ReactElement} from "react";
import Link from "next/link";
import clsx from "clsx";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    url: string,
    variant: "primary" | "secondary" | "outline";
    children: string
}

export function Button({ variant, className, url, children }: ButtonProps): ReactElement {
    const variants = {
        primary: "border rounded-full px-8 py-2 transition transform duration-150 hover:bg-white hover:text-black",
        secondary: "bg-white text-black border rounded-full px-8 py-2 transition transform duration-150 hover:bg-black hover:text-white",
        outline: "bg-transparent border border-gray-300 text-gray-700 hover:bg-gray-100 focus:ring-gray-500"
    };

    return (
        <Link
            href={url}
            className={clsx(variants[variant], className)}
        > {children} </Link>
    );
}
