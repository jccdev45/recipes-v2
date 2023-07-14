import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';

export default async function EditProfilePage() {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <section>
      <h1>Profile</h1>
      <p>{user?.email}</p>
    </section>
  );
}
