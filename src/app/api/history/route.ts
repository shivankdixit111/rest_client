import { RequestHistory } from "@/entities/RequestHistory";
import { getOrm } from "@/lib/orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
      const page = Number(req.nextUrl.searchParams.get("page") || 1)
      const limit = 10;
      const offset = (page-1)*limit;

      const orm = await getOrm()
      const em = orm.em.fork()

      const response = await em.findAndCount(RequestHistory, {}, {
        orderBy: { createdAt: "DESC" },
        offset,
        limit
      })
      
      return NextResponse.json(response[0], {status: 200})
    } catch(error) {
        console.log(error)
      return NextResponse.json({message: "Server error"}, {status: 400})
    }
}