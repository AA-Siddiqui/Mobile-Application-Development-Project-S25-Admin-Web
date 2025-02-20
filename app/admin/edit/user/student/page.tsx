"use client";
import { AdminEditStudentForm } from "@/components/AdminFormCollection"

function AdminEditStudentPage() {
  return (
    <main>
      <section className="w-full p-5 flex flex-col justify-start">
        <div className="flex flex-col justify-between self-center text-center">
          <h1 className="text-3xl">Edit Student</h1>
        </div>
      </section>

      <AdminEditStudentForm/>
    </main>

  )
}

export default AdminEditStudentPage;