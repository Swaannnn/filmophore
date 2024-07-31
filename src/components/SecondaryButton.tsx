import {ReactElement} from "react"
import Link from "next/link"

interface ButtonProps {
    url: string
    children: string
}

export default function SecondaryButton({url, children}: ButtonProps): ReactElement{
    return (
        <Link
            href={url}
            className="bg-white text-black border rounded-full px-8 py-2 transition transform duration-150 hover:bg-black hover:text-white"
        > {children} </Link>
    )
}
