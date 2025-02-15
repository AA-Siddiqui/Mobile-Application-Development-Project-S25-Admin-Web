import { createClient } from '@/utils/supabase/server';
import { Tables } from '@/utils/types/supabase';
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
  async function handleSubmit(formData: FormData) {
    "use server";
    const term = formData.get('term') as string;
    const amount = Number(formData.get('amount'));
    const description = formData.get('description') as string;
    const dueDate = formData.get('dueDate') as string;

    const supabase = await createClient();
    try {
      const { data: result, error } = await supabase.rpc('get_student_invoice_data', {
        term_input: term,
        amount: amount,
        desc_text: description
      });

      if (error) throw error;

      // Insert invoice records safely using Supabase .insert()
      const invoices: Tables<'Invoice'> = result.map((row: any) => ({
        studentId: row.sid,
        description: row.description,
        amount: row.invoiceamount,
        dueDate: dueDate,
        term: row.term
      }));

      const { error: insertError } = await supabase.from('Invoice').insert(invoices);

      if (insertError) throw insertError;

      console.log('Invoices inserted successfully.');
    } catch (err) {
      console.error('Error:', err);
    }
  }

  // }
  return (
    <main>
      <section className="w-full p-5 flex flex-col justify-start">
        <div className="flex flex-col justify-between self-center text-center">
          <h1 className="text-3xl">Add Fees</h1>
        </div>
      </section>
      <div className='bg-surface-color p-4 flex flex-col gap-4 [&_h1]:text-lg [&_h1]:md:text-xl'>
        <form action={handleSubmit} className="p-10 w-full flex flex-col gap-2">
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

export default FeesAddPage;