"use client";
import { AdminAddCourseForm } from "@/components/AdminFormCollection"
import {withAuthAdmin, withAuthStudent, withAuthTeacher} from "@/lib/withAuth";

function AdminAddCoursePage() {
  return (
    <main>
      <section className="w-full p-5 flex flex-col justify-start">
        <div className="flex flex-col justify-between self-center text-center">
          <h1 className="text-3xl">Add a Course</h1>
        </div>
      </section>

      <div className='bg-surface-color p-4 flex flex-col gap-4 [&_h1]:text-lg [&_h1]:md:text-xl'>
        <AdminAddCourseForm />
      </div>
    </main>
  )
}

export default withAuthAdmin(AdminAddCoursePage);