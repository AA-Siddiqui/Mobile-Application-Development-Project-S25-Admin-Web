"use client";

import {withAuthAdmin, withAuthStudent, withAuthTeacher} from "@/lib/withAuth";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

function EnrollStudentsToClassPage() {
  const [dataPage, setData] = useState([]);
  async function getData() {
    const response = await fetch(`http://localhost:3001/admin/classes `, {
      method: 'GET',
    });
    const data = await response.json();
    setData(data);
  }
  useEffect(() => {
    getData();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const response = await fetch(`http://localhost:3001/admin/enroll/${formData.get("rollNo")}&${formData.get("classID")}`, {
      method: 'POST',
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
          <h1 className="text-3xl">Add Student to Class</h1>
        </div>
      </section>

      <div className='bg-surface-color p-4 flex flex-col gap-4 [&_h1]:text-lg [&_h1]:md:text-xl'>
        <form onSubmit={handleSubmit} className="p-10 pb-0 w-full flex flex-col gap-2">
          <div className="w-full flex flex-col gap-2">
            <h1>Student's Roll No</h1>
            <input type='text' className="w-full bg-background-color p-2 rounded-lg" name={"rollNo"} />
          </div>
          <div className="w-full flex flex-col gap-2">
            <h1>Class</h1>
            <select className="w-full bg-background-color p-2 rounded-lg" name="classID">
              {dataPage.map((classs) => {
                return <option value={classs.classID}>{classs.name} - {classs.term} - Section {classs.section}</option>;
              })}
            </select>
          </div>
          <button type="submit" className="w-full button-primary">Add</button>
        </form>
      </div>
    </main>
  )
}

export default withAuthAdmin(EnrollStudentsToClassPage);