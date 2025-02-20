import { useRouter } from "next/navigation";

export default function MovieListCard({ id, name, description }: { id: string; name: string; description?: string }) {
    const router = useRouter();

    return (
        <div className="flex flex-col items-center justify-center bg-gray-950 rounded-lg p-4 w-[500px]">
            <p className="text-center break-words font-bold">{name}</p>
            {description && (
                <p className="text-gray-400 break-words text-center">{description}</p>
            )}
            <a
                className="text-[#157c9c] cursor-pointer hover:underline pt-2"
                onClick={() => router.push(`/dashboard/list/${id}`)}
            >
                Voir ma liste
            </a>
        </div>
    );
}
