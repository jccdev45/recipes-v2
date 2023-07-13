import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { AddRecipeForm } from "./AddRecipeForm";
import { redirect } from "next/navigation";

export default async function AddRecipePage() {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return <AddRecipeForm user={user} />;
}
