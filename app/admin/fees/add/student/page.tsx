import { createClient } from '@/utils/supabase/server';
import React from 'react'
import Swal from 'sweetalert2';

function FeesAddStudentPage() {
  async function handleSubmit(formData: FormData) {
    "use server";
    const data: Record<string, FormDataEntryValue> = {};

    formData.forEach((value, key) => {
      data[key] = value;
    });

    const supabase = await createClient();
    const { data: student, error: selectError } = await supabase
      .from("Student")
      .select("id")
      .eq("rollNo", data.rollNo)
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

    const description = data.description;
    const term = data.term;
    const dueDate = data.dueDate;
    const amount = data.amount;

    const { error: insertError } = await supabase
      .from("Invoice")
      .insert([{ studentId, description, term, dueDate, amount }]);


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
          <h1 className="text-3xl">Add Fees</h1>
        </div>
      </section>
      <div className='bg-surface-color p-4 flex flex-col gap-4 [&_h1]:text-lg [&_h1]:md:text-xl'>
        <div className="p-10 w-full flex flex-col gap-2">
          <form action={handleSubmit}>
            <h1>Enter Roll No of Student to Charge Fee To</h1>
            <div className="flex justify-between gap-5">
              <input type='text' className="w-full bg-background-color p-2 rounded-lg" name="rollNo" />
            </div>

            <div className="w-full h-full flex flex-col gap-2">
              <h1>Description</h1>
              <input type='text' className="w-full bg-background-color p-2 rounded-lg" name="description" />
            </div>
            <div className="w-full h-full flex flex-col gap-2">
              <h1>Term</h1>
              <input type='text' className="w-full bg-background-color p-2 rounded-lg" name="term" />
            </div>
            <div className="w-full h-full flex flex-col gap-2">
              <h1>Due Date</h1>
              <input type='date' className="w-full bg-background-color p-2 rounded-lg" name="dueDate" />
            </div>
            <div className="w-full h-full flex flex-col gap-2">
              <h1>Amount</h1>
              <input type='number' className="w-full bg-background-color p-2 rounded-lg" name="amount" />
            </div>
            <button className='button-primary w-full mt-2' type="submit">Submit</button>
          </form>
        </div>
      </div>
    </main >
  )
}

export default FeesAddStudentPage;