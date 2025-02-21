import {NextRequest, NextResponse} from "next/server";
import {prisma} from "@/lib/prisma";

export async function PUT(req: NextRequest) {
    try {

        const { userId, image } = await req.json();

        if (!userId || !image) {
            return NextResponse.json({ error: "User ID and image are required" }, { status: 400 });
        }

        const updatedUser = await prisma.user.update({
            where: { id: userId as string },
            data: { image },
        });

        return NextResponse.json(updatedUser, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
