import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

import { getAll, searchRecipes } from "@/supabase/helpers";
import { Database, Recipe } from "@/types/supabase";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";

export const dynamic = "force-dynamic";
export const revalidate = 3600;

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;

  const supabase = createRouteHandlerClient<Database>({ cookies });
  const recipes: Recipe[] | null = params.get("search")
    ? await searchRecipes(supabase, params.get("search")!)
    : await getAll({ db: "recipes" }, supabase);

  return NextResponse.json(recipes);
}
