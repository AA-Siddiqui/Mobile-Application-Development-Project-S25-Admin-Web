"use client";
import { AdminAddClassForm } from "@/components/AdminFormCollection";
import { withAuthAdmin } from "@/lib/withAuth";

function AdminAddClassPage() {
  return (
    <main>
      <section className="w-full p-5 flex flex-col justify-start">
        <div className="flex flex-col justify-between self-center text-center">
          <h1 className="text-3xl">Make Class</h1>
        </div>
      </section>

      <div className='bg-surface-color p-4 flex flex-col gap-4 [&_h1]:text-lg [&_h1]:md:text-xl'>
        <AdminAddClassForm/>
      </div>
    </main>
  )
}

export default withAuthAdmin(AdminAddClassPage);