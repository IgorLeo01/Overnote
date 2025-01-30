import  getServerSession  from "next-auth";
import { handlers } from "@/lib/auth";

export async function validateSession(req: Request) {
    const session = await getServerSession(req, handlers);
  
    if (!session) {
      return {
        error: true,
        response: new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 }),
      };
    }
  
    return { error: false, session };
  }