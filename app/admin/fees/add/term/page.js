"use client";
import {withAuthAdmin, withAuthStudent, withAuthTeacher} from '@/lib/withAuth';
import React from 'react'
import Swal from 'sweetalert2';

function FeesAddPage() {
  // WITH Class_Credit_Hours AS (
  //     SELECT
  //         c.classID,
  //         SUM(co.creditHr) AS totalCreditHours
  //     FROM
  //         Class c
  //     JOIN Course co ON c.courseIDCourseID = co.courseID
  //     WHERE
  //         c.term = '${YOUR_TERM_HERE}'
  //     GROUP BY
  //         c.classID
  // ),

  // Student_Invoice_Data AS (
  //     SELECT
  //         s.studentID,
  //         cch.totalCreditHours,
  //         (cch.totalCreditHours * ${15000}) AS invoiceAmount
  //     FROM
  //         Enrollment e
  //     JOIN Student s ON e.studentIDStudentID = s.studentID
  //     JOIN Class_Credit_Hours cch ON e.classIDClassID = cch.classID
  // )

  // INSERT INTO Invoice (studentID, description, amount)
  // SELECT
  //     sid,
  //     'Tuition Fee',
  //     invoiceAmount
  // FROM
  //     Student_Invoice_Data;
  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    console.log(formData.get('dueDate'));

    const response = await fetch(`http://localhost:3001/admin/fees/add/term/${formData.get('term')}&${formData.get('amount')}&${formData.get('description')}&${formData.get('dueDate')}`, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
    });

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
        <form onSubmit={handleSubmit} className="p-10 w-full flex flex-col gap-2">
          <h1>Term To Charge Fee To</h1>
          <div className="flex justify-between gap-5">
            <input type='text' className="w-full bg-background-color p-2 rounded-lg" name="term" id="">
              {/* <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option> */}
            </input>
          </div>

          <div>
            <div className="w-full h-full flex flex-col gap-2">
              <h1>Description</h1>
              <input type='text' className="w-full bg-background-color p-2 rounded-lg" name="description" />
            </div>
            <div className="w-full h-full flex flex-col gap-2">
              <h1>Amount Per Credit Hour</h1>
              <input type='number' className="w-full bg-background-color p-2 rounded-lg" name="amount" />
            </div>
            <div className="w-full h-full flex flex-col gap-2">
              <h1>Due Date</h1>
              <input type='date' className="w-full bg-background-color p-2 rounded-lg" name="dueDate" />
            </div>
            <button className='button-primary w-full mt-2' type="submit">Submit</button>
          </div>
        </form>
      </div>
    </main>
  )
}

export default withAuthAdmin(FeesAddPage);