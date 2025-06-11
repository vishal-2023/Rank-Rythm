import PrismaClient from "@/app/lib/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import z from 'zod'

const UpvoteSchema = z.object({
    streamId: z.string()
})

export async function POST(req: NextRequest) {
    const session = await getServerSession();

    const user = await PrismaClient.user.findFirst({
        where: {
            email: session?.user?.email ?? ''
        }
    })

    if (!user) {
        return NextResponse.json({
            message: "Unauthorised user"
        }, { status: 403 })
    }

    try {
        const data = UpvoteSchema.parse(await req.json())
        await PrismaClient.upvote.delete({
            where: {
                streamId_userId: {
                    userId: user.id,
                    streamId: data?.streamId
                }
            }

        })
    } catch (err) {
        return NextResponse.json({
            message: "Error while creating upvote"
        }, { status: 500 })
    }
}