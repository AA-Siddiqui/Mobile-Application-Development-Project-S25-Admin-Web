import { createClient } from "@/utils/supabase/server";
import Swal from "sweetalert2";

async function getData() {
  // const response = await fetch(`http://localhost:3001/admin/classes `, {
  //   method: 'GET',
  // });
  // const data = await response.json();
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('Class')
    .select(`
      classID:id,
      term,
      section,
      Course(name)
    `);

  return data;
}

async function EnrollStudentsToClassPage() {
  const dataPage = await getData();

  async function handleSubmit(formData: FormData) {
    "use server";
    const classId = formData.get("classID");
    const rollNo = formData.get("rollNo");

    const supabase = await createClient();
    const { data: student, error: selectError } = await supabase
      .from("Student")
      .select("id")
      .eq("rollNo", rollNo)
      .single();

    if (selectError) {
      Swal.fire({
        title: "Error: " + selectError.message,
        timer: 2000,
        timerProgressBar: true,
        customClass: {
          timerProgressBar: 'bg-secondary-color',
          popup: 'bg-surface-color text-text-color',
          title: 'text-accent-color',
          confirmButton: 'button-primary px-4',
        }
      });
      return;
    }

    if (!student) {
      Swal.fire({
        title: "Student not found",
        timer: 2000,
        timerProgressBar: true,
        customClass: {
          timerProgressBar: 'bg-secondary-color',
          popup: 'bg-surface-color text-text-color',
          title: 'text-accent-color',
          confirmButton: 'button-primary px-4',
        }
      });
      return;
    }

    const studentId = student.id;
    const { error: insertError } = await supabase
      .from("Enrollment")
      .insert([{ studentId, classId }]);


    if (insertError) {
      Swal.fire({
        title: insertError.message,
        timer: 2000,
        timerProgressBar: true,
        customClass: {
          timerProgressBar: 'bg-secondary-color',
          popup: 'bg-surface-color text-text-color',
          title: 'text-accent-color',
          confirmButton: 'button-primary px-4',
        }
      });
      return;
    }

    Swal.fire({
      title: "Enrolled Successfully",
      timer: 2000,
      timerProgressBar: true,
      customClass: {
        timerProgressBar: 'bg-secondary-color',
        popup: 'bg-surface-color text-text-color',
        title: 'text-accent-color',
        confirmButton: 'button-primary px-4',
      }
    });
  }

  return (
    <main>
      <section className="w-full p-5 flex flex-col justify-start">
        <div className="flex flex-col justify-between self-center text-center">
          <h1 className="text-3xl">Add Student to Class</h1>
        </div>
      </section>

      <div className='bg-surface-color p-4 flex flex-col gap-4 [&_h1]:text-lg [&_h1]:md:text-xl'>
        <form action={handleSubmit} className="p-10 pb-0 w-full flex flex-col gap-2">
          <div className="w-full flex flex-col gap-2">
            <h1>Student's Roll No</h1>
            <input type='text' className="w-full bg-background-color p-2 rounded-lg" name={"rollNo"} />
          </div>
          <div className="w-full flex flex-col gap-2">
            <h1>Class</h1>
            <select className="w-full bg-background-color p-2 rounded-lg" name="classID">
              {dataPage?.map((classs: any) => {
                return <option value={classs.classID}>{classs.Course.name} - {classs.term} - Section {classs.section}</option>;
              }) ?? <option value={-1}>No classes available</option>}
            </select>
          </div>
          <button type="submit" className="w-full button-primary">Add</button>
        </form>
      </div>
    </main>
  )
}

export default EnrollStudentsToClassPage;