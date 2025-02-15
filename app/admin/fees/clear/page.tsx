"use client";
import { createClient } from '@/utils/supabase/client';
import { Tables } from '@/utils/types/supabase';
import React, { useState } from 'react'
import Swal from 'sweetalert2';

function FeeClearPage() {
  const [dataPage, setData] = useState<Tables<'Invoice'>[]>([]);
  const [rollNoState, setRollNo] = useState(0);

  async function getData(studentId: number) {
    const supabase = createClient();
    const { data: userData, error: userError } = await supabase
      .from('Invoice')
      .select(`*`)
      .eq('studentId', studentId) as { data: Tables<'Invoice'>[], error: any };

    setData(userData);
  }

  async function fetchStudentData(formData: FormData) {
    const rollNo = formData.get("rollNo") as string;
    const supabase = createClient();

    const { data: userData, error: userError } = await supabase
      .from('Student')
      .select(`
      id
    `)
      .eq('rollNo', rollNo)
      .single() as { data: { id: number }, error: any };

    if (userError) {
      console.error('Error fetching user details:', userError);
      return;
    }
    setRollNo(userData.id);
    getData(userData.id);
  }

  async function deductFee(formData: FormData) {
    const invoiceID = formData.get("invoiceID");
    const amount = formData.get("amount") as unknown as number;

    const supabase = createClient();
    const { data, error } = await supabase
      .from('Invoice')
      .select('amount')
      .eq('id', invoiceID)
      .single();

    if (error) {
      console.error('Error fetching invoice:', error);
      return;
    }

    const newAmount = data.amount - amount;
    const updatePayload = {
      amount: newAmount,
      ...(newAmount <= 0 && { paidDate: new Date().toISOString().split('T')[0] })
    };

    // Update the invoice
    const { error: updateError } = await supabase
      .from('Invoice')
      .update(updatePayload)
      .eq('id', invoiceID);


    getData(rollNoState);

    const updateMessage = updateError ? `Error updating invoice: ${updateError.message}` : "Invoice updated successfully";
    Swal.fire({
      title: updateMessage,
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
          <h1 className="text-3xl">Clear Fee</h1>
        </div>
      </section>
      <div className='bg-surface-color p-4 flex flex-col gap-4 [&_h1]:text-lg [&_h1]:md:text-xl'>
        <div className="p-10 w-full flex flex-col gap-2">
          <h1>Enter Roll No of Student to Edit</h1>
          <form className="flex justify-between gap-5">
            <input type='text' className="w-full bg-background-color p-2 rounded-lg" name="rollNo" id="" />
            <button formAction={fetchStudentData} type='submit' className="button-primary">Fetch</button>
          </form>

          <form>
            <div className="w-full h-full flex flex-col gap-2">
              <h1>Invoice</h1>
              <select className="w-full bg-background-color p-2 rounded-lg" name="invoiceID" id="">
                {dataPage.map((invoice: Tables<'Invoice'>) => {
                  return <option key={invoice.id} value={invoice.id}>{invoice.description} - {invoice.term} - ({invoice.amount} Remaining)</option>;
                })}
              </select>
            </div>

            <div className="w-full h-full flex flex-col gap-2">
              <h1>Amount</h1>
              <input type='number' className="w-full bg-background-color p-2 rounded-lg" name="amount" id="student-to-fetch-to-edit" />
            </div>
            <button formAction={deductFee} className='button-primary w-full mt-2' type="submit">Submit</button>
          </form>
        </div>
      </div>
    </main>
  );
}

export default FeeClearPage;