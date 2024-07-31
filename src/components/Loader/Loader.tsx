import {ReactElement} from "react"
import './Loader.css'

export default function Loader(): ReactElement {
    return (
        <div className="flex items-center justify-center min-h-[80vh]">
            <div className="loader"></div>
        </div>
    )
}
