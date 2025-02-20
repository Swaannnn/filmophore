import {Button} from "@/components/Button";
import {useRouter} from "next/navigation";

export default function MovieListCard({id, name, description}: {id: string, name: string, description?: string}) {
    const router = useRouter();
    return (
        <div className="flex flex-col items-center justify-center">
            <div className="flex flex-col items-center justify-center gap-8">
                <div>
                    <p>{name}</p>
                    {description && (
                        <p>{description}</p>
                    )}
                    <Button
                        variant={'primary'}
                        onClick={() => router.push(`/dashboard/list/${id}`)}
                    >Voir ma liste</Button>
                </div>
            </div>
        </div>
    )
}
