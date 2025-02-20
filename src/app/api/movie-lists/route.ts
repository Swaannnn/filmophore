import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
    try {
        const { listIds } = await req.json();

        if (!listIds || !Array.isArray(listIds)) {
            return NextResponse.json({ error: "Liste d'IDs invalide" }, { status: 400 });
        }

        const movieLists = await prisma.movieList.findMany({
            where: { id: { in: listIds } },
            select: { id: true, name: true },
        });

        return NextResponse.json(movieLists, { status: 200 });
    } catch (error) {
        console.error("Erreur lors de la récupération des listes de films :", error);
        return NextResponse.json({ error: "Erreur interne du serveur" }, { status: 500 });
    }
}
