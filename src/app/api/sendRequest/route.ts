import { RequestHistory } from "@/entities/RequestHistory";
import { getOrm } from "@/lib/orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
       const { method, url, headers, body } = await req.json();
       const fetchOptions:any = {
          method,
          headers
       }
       if(method!="GET") fetchOptions.body = body;

       //getting data from url
       const res = await fetch(url, fetchOptions);
       const data = await res.json();

       console.log('data is --------- ', data)

       const orm = await getOrm();   // MikroORM instance
       const em = orm.em.fork();    // forked EntityManager (thread-safe)

       const entry = em.create(RequestHistory, {
          method,
          url,
          headers,
          body,
          response: data,
          createdAt: new Date(),
       })

       await em.persistAndFlush(entry)   // Save request history to DB

       return NextResponse.json( entry, {status: 200})
    } catch(error) {
        console.log(error)
       return NextResponse.json({message: "server error"}, {status: 400})
    }
}