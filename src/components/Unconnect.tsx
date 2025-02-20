import {useRouter} from "next/navigation";
import {Button} from "@/components/Button";

export default function Unconnect() {
    const router = useRouter();

    return (
        <div className="flex flex-col justify-center items-center pt-64 text-center">
            <h2 className="text-xl font-semibold pb-2">Accès restreint</h2>
            <p className="pb-4 text-gray-400">Cette page est réservée aux utilisateurs connectés. Veuillez vous authentifier pour y accéder.</p>
            <Button
                variant={'primary'}
                onClick={() => router.push('/login')}>
                Se connecter
            </Button>
        </div>
    )
}
