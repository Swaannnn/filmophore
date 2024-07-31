import {ReactElement} from "react"
import PrimaryButton from "@/components/PrimaryButton"

export default function Custom404(): ReactElement {
    return (
        <div className="pt-36 flex flex-col items-center justify-center">
            <p className="text-6xl font-bold">404</p>
            <p className="text-3xl mt-2">Oops ! Page introuvable</p>
            <p className="text-xl mt-4 mb-6">Il semble que la page que vous recherchez n&apos;existe pas</p>
            <PrimaryButton url={"/"}>Retourner à l&apos;accueil</PrimaryButton>
        </div>
    )
}
