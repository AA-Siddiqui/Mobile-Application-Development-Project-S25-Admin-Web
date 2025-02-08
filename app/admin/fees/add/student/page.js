"use client";
import {withAuthAdmin, withAuthStudent, withAuthTeacher} from '@/lib/withAuth';
import React from 'react'
import Swal from 'sweetalert2';

function FeesAddStudentPage() {
  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {};

    formData.forEach((value, key) => {
      data[key] = value;
    });

    const response = await fetch(`http://localhost:3001/admin/fees/add/student`, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })

    if (response.ok) {
      Swal.fire({
        title: (await response.json()).message,
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
          <form onSubmit={handleSubmit}>
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

export default withAuthAdmin(FeesAddStudentPage);