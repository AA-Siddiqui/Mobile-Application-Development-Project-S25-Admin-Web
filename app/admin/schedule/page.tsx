import { createClient } from "@/utils/supabase/server";
import Swal from "sweetalert2";

async function getData() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('Class')
    .select('id, term, section, Course(name)');

  if (error) {
    console.error('Error fetching classes:', error);
    return { success: false, data: [error] };
  }

  return { success: true, data };
}

async function ScheduleExtraClassPage() {
  const initData = await getData();
  const dataPage = initData.data;

  if (!initData.success) {
    return <h1>Something went wrong</h1>
  }

  async function handleSubmit(formData: FormData) {
    "use server";
    const classID = formData.get('classID') as string;
    const date = formData.get('date') as string;
    const startTime = formData.get('startTime') as string;
    const endTime = formData.get('endTime') as string;
    const venue = formData.get('venue') as string;

    const supabase = await createClient();

    async function postExtraClass(
      classID: string,
      body: { date: string; startTime: string; endTime: string; venue: string }
    ) {
      // Format start and end times correctly
      const startTime = new Date(`${body.date}T${body.startTime}`)
        .toISOString()
        .slice(0, 19)
        .replace('T', ' ');
      const endTime = new Date(`${body.date}T${body.endTime}`)
        .toISOString()
        .slice(0, 19)
        .replace('T', ' ');

      // Insert data into Supabase
      const { data, error } = await supabase.from('Schedule').insert([
        {
          classId: classID,
          startTime: startTime,
          endTime: endTime,
          venue: body.venue,
        },
      ]);

      if (error) {
        console.error('Error inserting extra class:', error);
        return { success: false, error };
      }

      return { success: true, data };
    }

    postExtraClass(classID, { date, startTime, endTime, venue });

    // const response = await fetch(`http://localhost:3001/admin/schedule/extra/${classID}`, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     "date": formData.get('date'),
    //     "startTime": formData.get('startTime'),
    //     "endTime": formData.get('endTime'),
    //     "venue": formData.get('venue'),
    //   }),
    // });
    // if (response.ok) {
    //   Swal.fire({
    //     title: (await response.json()).message,
    //     timer: 2000,
    //     timerProgressBar: true,
    //     customClass: {
    //       timerProgressBar: 'bg-secondary-color',
    //       popup: 'bg-surface-color text-text-color',
    //       title: 'text-accent-color',
    //       confirmButton: 'button-primary px-4',
    //     }
    //   });
    // }
  }
  return (
    <main>
      <section className="w-full p-5 flex flex-col justify-start">
        <div className="flex flex-col justify-between self-center text-center">
          <h1 className="text-3xl">Schedule Class</h1>
        </div>
      </section>

      <div className='bg-surface-color p-4 flex flex-col gap-4 [&_h1]:text-lg [&_h1]:md:text-xl'>
        <form action={handleSubmit} className="p-10 pb-0 w-full flex flex-col gap-2">
          <div className="w-full flex flex-col gap-2">
            <h1>Select Class</h1>
            <select className="w-full bg-background-color p-2 rounded-lg" name="classID" id="classID">
              {dataPage.map((classs: any, index: number) => {
                return <option key={index} value={classs.id}>{classs.Course.name} - {classs.term} - Section {classs.section}</option>;
              })}
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

export default ScheduleExtraClassPage;