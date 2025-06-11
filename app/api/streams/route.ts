import  PrismaClient  from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";
import z from 'zod'

const createStreamSchema = z.object({
    creatorId:z.string(),
    url:z.string()
})

const YT_Regrex = new RegExp(/^https:\/\/www\.youtube\.com\/watch\?v=[\w-]{11}$/);

export async function POST(req:NextRequest){
    try{
    const body = await req.json();
    const data = createStreamSchema.parse(body);
            const isYt = YT_Regrex.test(data.url)
        if(!isYt){
            return NextResponse.json({
            message:"Error while adding the stream"
        },{status:411})
        }
        const extractUrl = data.url.split("?v=")[1];

        await PrismaClient.stream.create({
            data:{
            userId:data?.creatorId ,
            url:data.url,
            type:"Youtube",
            extractedId:extractUrl
            }
        })

    
    }catch{
        return NextResponse.json({
            message:"Error while adding the stream"
        },{status:411})
    }
}