"use server";

import { createClient } from "../supabase/server";

export async function upsertCourseAction(formData: FormData, edit?: any) {
  const supabase = await createClient();
  const { error } = await supabase.from('Course').upsert(
    [
      edit ? {
        id: edit,
        name: formData.get('name') as string,
        credits: formData.get('creditHr') as string,
        mode: formData.get('mode') as string,
      } : {
        name: formData.get('name') as string,
        credits: formData.get('creditHr') as string,
        mode: formData.get('mode') as string,
      },
    ],
    { onConflict: 'id' }
  );

  if (error) {
    console.error('Error upserting course:', error);
    // return { success: false, error };
  }
  // const response = await fetch(`http://localhost:3001/admin/add/course`, {
  //   method: edit ? "PUT" : "POST",
  //   headers: {
  //     "Accept": "application/json",
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify({
  //     courseID: edit,
  //     name: formData.get('name'),
  //     creditHr: formData.get('creditHr'),
  //     mode: formData.get('mode')
  //   }),
  // });
  // Swal.fire({
  //   title: (await response.json()).message ?? "Error",
  //   timer: 2000,
  //   timerProgressBar: true,
  //   customClass: {
  //     timerProgressBar: 'bg-secondary-color',
  //     popup: 'bg-surface-color text-text-color',
  //     title: 'text-accent-color',
  //     confirmButton: 'button-primary px-4',
  //   }
  // });
}