"use client";
import React, { useState } from 'react'
// import Swal from 'sweetalert2';

function FeeClearPage() {
  const [dataPage, setData] = useState([]);
  const [rollNoState, setRollNo] = useState("");

  async function getData(rollNo: string) {
    const response = await fetch(`http://localhost:3001/admin/fees/${rollNo}`, {
      method: 'GET',
    });
    const data = await response.json();
    setData(data.data);
  }

  async function fetchStudentData(e: any) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const rollNo = formData.get("rollNo") as string;
    setRollNo(rollNo);
    getData(rollNo);
  }

  async function deductFee(e: any) {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    const response = await fetch(`http://localhost:3001/admin/fees/${formData.get(`invoiceID`)}&${formData.get('amount')}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    });

    getData(rollNoState);

    // Swal.fire({
    //   title: (await response.json()).message,
    //   timer: 2000,
    //   timerProgressBar: true,
    //   customClass: {
    //     timerProgressBar: 'bg-secondary-color',
    //     popup: 'bg-surface-color text-text-color',
    //     title: 'text-accent-color',
    //     confirmButton: 'button-primary px-4',
    //   }
    // });
  }

  return (
    <main>
      <section className="w-full p-5 flex flex-col justify-start">
        <div className="flex flex-col justify-between self-center text-center">
          <h1 className="text-3xl">Clear Fee</h1>
        </div>
      </section>
      <div className='bg-surface-color p-4 flex flex-col gap-4 [&_h1]:text-lg [&_h1]:md:text-xl'>
        <div className="p-10 w-full flex flex-col gap-2">
          <h1>Enter Roll No of Student to Edit</h1>
          <form onSubmit={fetchStudentData} className="flex justify-between gap-5">
            <input type='text' className="w-full bg-background-color p-2 rounded-lg" name="rollNo" id="" />
            <button type='submit' className="button-primary">Fetch</button>
          </form>

          <form onSubmit={deductFee}>
            <div className="w-full h-full flex flex-col gap-2">
              <h1>Invoice</h1>
              <select className="w-full bg-background-color p-2 rounded-lg" name="invoiceID" id="">
                {dataPage.map((invoice: {invoiceID: string, description: string, term: string, amount: string}) => {
                  return <option value={invoice.invoiceID}>{invoice.description} - {invoice.term} - ({invoice.amount} Remaining)</option>;
                })}
              </select>
            </div>

            <div className="w-full h-full flex flex-col gap-2">
              <h1>Amount</h1>
              <input type='number' className="w-full bg-background-color p-2 rounded-lg" name="amount" id="student-to-fetch-to-edit" />
            </div>
            <button className='button-primary w-full mt-2' type="submit">Submit</button>
          </form>
        </div>
      </div>
    </main>
  );
}

export default FeeClearPage;