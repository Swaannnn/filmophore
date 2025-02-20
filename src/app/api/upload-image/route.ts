import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";
import {mkdir} from "node:fs/promises";

export async function POST(req: Request) {
    try {
        const formData = await req.formData();
        const file = formData.get("file") as File;
        const userId = formData.get("userId") as string;

        if (!file || !userId) {
            return NextResponse.json({ error: "Données invalides" }, { status: 400 });
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const uploadDir = path.join(process.cwd(), "public/uploads");
        await mkdir(uploadDir, { recursive: true });

        const filePath = path.join(process.cwd(), "public/uploads", file.name);
        await writeFile(filePath, buffer);

        const imageUrl = `/uploads/${file.name}`;

        // 🔍 Ajoute un log pour voir les données envoyées à Prisma
        console.log("Mise à jour de l'utilisateur :", { userId, imageUrl });

        await prisma.user.update({
            where: { id: userId },
            data: { image: imageUrl },
        });

        return NextResponse.json({ imageUrl });
    } catch (error) {
        console.error("Erreur lors de l’upload :", error);
        return NextResponse.json({ error: error }, { status: 500 });
    }
}
