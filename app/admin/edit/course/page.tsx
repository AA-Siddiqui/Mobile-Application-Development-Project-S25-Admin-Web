import { AdminEditCourseForm } from '@/components/AdminFormCollectionClient';

function AdminEditCoursePage() {
  return (
    <main>
      <section className="w-full p-5 flex flex-col justify-start">
        <div className="flex flex-col justify-between self-center text-center">
          <h1 className="text-3xl">Edit Course</h1>
        </div>
      </section>

      <AdminEditCourseForm />
    </main>
  )
}

export default AdminEditCoursePage;