"use client";
import { AdminEditClassForm } from "@/components/AdminFormCollection";
import {withAuthAdmin, withAuthStudent, withAuthTeacher} from "@/lib/withAuth";

function AdminEditClassPage() {
  return (
    <main>
      <section className="w-full p-5 flex flex-col justify-start">
        <div className="flex flex-col justify-between self-center text-center">
          <h1 className="text-3xl">Edit Class</h1>
        </div>
      </section>

      <AdminEditClassForm/>
    </main>
  )
}

export default withAuthAdmin(AdminEditClassPage);