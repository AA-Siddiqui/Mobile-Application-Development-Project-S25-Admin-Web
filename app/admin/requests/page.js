"use client";
import {withAuthAdmin, withAuthStudent, withAuthTeacher} from "@/lib/withAuth";
import { useEffect, useState } from "react";

function ReviewRequestPage() {
  const [dataPage, setData] = useState([]);
  async function getData() {
    const response = await fetch(`http://localhost:3001/admin/requests/${localStorage.id}`, {
      method: 'GET',
    });
    const data = await response.json();
    setData(data.data);
  }
  useEffect(() => {
    getData();
  }, []);

  async function decideUponTheFateOfTheRequest(requestID, approved) {
    const response = await fetch(`http://localhost:3001/admin/requests/${requestID}`, {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ approved }),
    });
    await getData();
  }
  return (
    <main>
      <section className="w-full p-5 flex flex-col justify-start">
        <div className="flex flex-col justify-between self-center text-center">
          <h1 className="text-3xl">Review Request</h1>
        </div>
      </section>

      <div className='bg-surface-color p-4 flex flex-col gap-4 [&_h1]:text-lg [&_h1]:md:text-xl'>
        <div className="p-10 w-full flex flex-col gap-2">
          {
            // [
            //   { studentRoll: "F22-001", class: "Computer Network", enrollInClass: 70 },
            //   { studentRoll: "F22-001", class: "Database", enrollInClass: 50 },
            //   { studentRoll: "F22-002", class: "Computer Network", enrollInClass: 70 },
            //   { studentRoll: "F22-002", class: "Database", enrollInClass: 50 },
            // ]
            dataPage.length === 0 ?
            <h1 className="w-full flex justify-center items-center">Nothing to See Here</h1> :
            dataPage.map((item, index) => {
              return (
                <div key={index} className="bg-border-color p-4 flex justify-between rounded-lg items-center">
                  <div className="flex flex-col">
                    <h2 className="text-primary-color">{item.class}</h2>
                    <h2 className="text-secondary-color">{item.studentRoll}</h2>
                  </div>
                  <div className="flex items-center gap-4">
                    {/* <h2>{item.enrollInClass}</h2> */}
                    <button onClick={() => {decideUponTheFateOfTheRequest(item.requestID, true)}} className="button-primary bg-green-700">Approve</button>
                    <button onClick={() => {decideUponTheFateOfTheRequest(item.requestID, false)}} className="button-primary bg-red-700">Deny</button>
                  </div>
                </div>
              );
            })
          }
        </div>
      </div>
    </main>
  )
}

export default withAuthAdmin(ReviewRequestPage);