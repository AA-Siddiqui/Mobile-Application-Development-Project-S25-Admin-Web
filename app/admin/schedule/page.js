"use client";
import {withAuthAdmin, withAuthStudent, withAuthTeacher} from "@/lib/withAuth";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

function ScheduleExtraClassPage() {
  const [dataPage, setData] = useState([]);
  async function getData() {
    // const response = await fetch(`http://localhost:3001/admin/add/extraClass/${localStorage.id}`, {
    const response = await fetch(`http://localhost:3001/admin/classes`, {
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
    const response = await fetch(`http://localhost:3001/admin/schedule/extra/${formData.get('classID')}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "date": formData.get('date'),
        "startTime": formData.get('startTime'),
        "endTime": formData.get('endTime'),
        "venue": formData.get('venue'),
      }),
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
          <h1 className="text-3xl">Schedule Class</h1>
        </div>
      </section>

      <div className='bg-surface-color p-4 flex flex-col gap-4 [&_h1]:text-lg [&_h1]:md:text-xl'>
        <form onSubmit={handleSubmit} className="p-10 pb-0 w-full flex flex-col gap-2">
          <div className="w-full flex flex-col gap-2">
            <h1>Select Class</h1>
            <select className="w-full bg-background-color p-2 rounded-lg" name="classID" id="classID">
              {dataPage.map((classs) => {
                return <option value={classs.classID}>{classs.name} - {classs.term} - Section {classs.section}</option>;
              })}
              {/* <opti value="B">B</opti
              <option value="C">C</option> */}
            </select>
          </div>

          <div className="w-full flex flex-col gap-2">
            <div className="w-full grid grid-cols-4 col gap-2.5 items-center [&_h2]:text-secondary-color">
              <h2>Day</h2>
              <h2>Start Time</h2>
              <h2>End Time</h2>
              <h2>Venue</h2>


              <input type="date" className="w-full bg-background-color p-2 rounded-lg" name={`date`} itemID={`date`}></input>

              <input className="w-full bg-background-color p-2 rounded-lg" type="time" name={`startTime`} itemID={`startTime`} />

              <input className="w-full bg-background-color p-2 rounded-lg" type="time" name={`endTime`} itemID={`endTime`} />

              <input type="text" className="w-full bg-background-color p-2 rounded-lg" name={`venue`} itemID={`venue`}></input>

            </div>
            <button type="submit" className="w-full button-primary">Schedule</button>
          </div>
        </form>
      </div>
    </main>
  )
}

export default withAuthAdmin(ScheduleExtraClassPage);