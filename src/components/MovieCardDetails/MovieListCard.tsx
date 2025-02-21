import {Button} from "@/components/Button";

export default function MovieListCard({ id, name, description }: { id: string; name: string; description?: string }) {
    return (
        <div className="flex flex-col items-center justify-center bg-gray-950 rounded-lg p-4 w-[500px]">
            <p className="text-center break-words font-bold">{name}</p>
            {description && (
                <p className="text-gray-400 break-words text-center">{description}</p>
            )}
            <Button
                variant={'outline'}
                url={`/dashboard/list/${id}`}
                className="pt-2"
            >Voir ma liste</Button>
        </div>
    );
}
