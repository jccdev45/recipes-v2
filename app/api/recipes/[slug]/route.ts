import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { getOne } from "@/supabase/helpers";
import { Database, Recipe } from "@/types/supabase";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";

export const dynamic = "force-dynamic";

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  const supabase = createRouteHandlerClient<Database>({ cookies });
  const queryParams = {
    filters: {
      column: "slug",
      value: params.slug,
    },
  };

  try {
    const data: Recipe = await getOne(supabase, "recipes", queryParams);

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error: ", error);
    return null;
  }
}
