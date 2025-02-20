import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { username, email, password } = body;

        if (!username || !email || !password) {
            return NextResponse.json({ message: "Tous les champs sont requis" }, { status: 400 });
        }

        const existingEmail = await prisma.user.findUnique({ where: { email } });
        if (existingEmail) {
            return NextResponse.json({ message: "Cet email est déjà utilisé" }, { status: 400 });
        }

        const existingUsername = await prisma.user.findUnique({where: { username }});
        if (existingUsername) {
            return NextResponse.json({message: "Ce nom d'utilisateur est déjà utilisé"}, {status: 400})
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: {
                username,
                email,
                password: hashedPassword,
            },
        });

        await prisma.movieList.create({
            data: {
                userId: user.id,
                name: "Favoris",
                description: "Mes films favoris",
                moviesId: [],
            },
        });

        return NextResponse.json({ message: "Compte créé avec succès" }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: "Erreur interne" }, { status: 500 });
    }
}
