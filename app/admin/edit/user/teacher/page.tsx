"use client";
import { AdminEditTeacherForm } from "@/components/AdminFormCollectionClient"

function AdminEditTeacherPage() {
  return (
    <main>
      <section className="w-full p-5 flex flex-col justify-start">
        <div className="flex flex-col justify-between self-center text-center">
          <h1 className="text-3xl">Edit Teacher</h1>
        </div>
      </section>

      <AdminEditTeacherForm />
    </main>
  )
}

export default AdminEditTeacherPage;