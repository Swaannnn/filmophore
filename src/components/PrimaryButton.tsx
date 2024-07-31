import {ReactElement} from "react";
import Link from "next/link";

interface ButtonProps {
    url: string;
    children: string;
}

export default function PrimaryButton({url, children}: ButtonProps): ReactElement{
    return (
        <Link
            href={url}
            className="border rounded-full px-8 py-2 transition transform duration-150 hover:bg-white hover:text-black"
        > {children} </Link>
    )
}
