// "use client";
// TODO: get it back to client cuz its not good rn
import { createClient } from "@/utils/supabase/server";
import DecisionCard from "./DecisionCard";
// import React, { useEffect, useState } from "react";

async function getData() : Promise<any[]> {
  // Fetch user  
  const supabase = await createClient();
  const { data: { user: authUser }, error: authError } = await supabase.auth.getUser();

  const { data: user, error: userError } = await supabase
    .from('User')
    .select('departmentId')
    .eq('id', authUser!.id)
    .single();

  if (userError || !user) {
    console.error('Error fetching user:', userError);
    return [];
  }

  const departmentID = user.departmentId;

  // Fetch requests
  const { data, error } = await supabase
    .from('Request')
    .select(`
          id,
          Class(
            Course(name)
          ),
          Student(rollNo, User(departmentId))
          `)
    // .eq('User.departmentId', departmentID)
    .is('approved', null);
  if (error) {
    console.error('Error fetching requests:', error);
    return [];
  }

  // Transform data to match expected output
  const formattedData = data.map((rq: any) => ({
    requestID: rq.id,
    class: rq.Class.Course.name,
    studentRoll: rq.Student.rollNo,
  }));

  // setData(formattedData);

  return formattedData;
}

async function ReviewRequestPage() {
  const dataPage: any[] = await getData();
  // const [dataPage, setData] = useState<any[]>([]);
  // async function getData() {
  //   const response = await fetch(`http://localhost:3001/admin/requests/${localStorage.id}`, {
  //     method: 'GET',
  //   });
  //   const data = await response.json();
  //   setData(data.data);
  // }
  // useEffect(() => {
  //   getData();
  // }, []);
  async function decideUponTheFateOfTheRequest(requestID: number, approved: boolean) {
    "use server";
    // const response = await fetch(`http://localhost:3001/admin/requests/${requestID}`, {
    //   method: 'PUT',
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({ approved }),
    // });
    // Update the request status

    // FIXME: Truncated behaviour because I might change the way Attendance works
    // DID: Fixed, Not tested
    const supabase = await createClient();
    const { error: updateError } = await supabase
      .from("Request")
      .update({ approved })
      .eq("id", requestID);

    if (updateError) {
      console.error("Error updating request:", updateError);
      return { message: "Error updating request", error: updateError };
    }

    // If approved, fetch student and class IDs
    if (approved) {
      const { data, error: selectError } = await supabase
        .from("Request")
        .select("studentId, classId")
        .eq("id", requestID)
        .single(); // Expecting only one row

      if (selectError || !data) {
        console.error("Error fetching request data:", selectError);
        return { message: "Error fetching request data", error: selectError };
      }

      const { studentId, classId } = data;

      const { error: insertError } = await supabase
        .from("Enrollment")
        .insert([{ studentId, classId }]);

      if (insertError) {
        console.error("Error inserting into Enrollment:", insertError);
        return { message: "Error inserting into Enrollment", error: insertError };
      }

      const { data: scheduleIDs, error: scheduleError } = await supabase
        .from('Schedule')
        .select('id')
        .eq('classId', classId);

      if (scheduleError) {
        console.error('Error fetching schedule IDs:', scheduleError);
        return { success: false, error: scheduleError };
      }

      if (!scheduleIDs || scheduleIDs.length === 0) {
        console.log('No schedules found for this class.');
        return { success: false, message: 'No schedules found' };
      }

      const attendanceRecords = scheduleIDs.map((schedule) => ({
        studentId: studentId,
        scheduleId: schedule.id,
      }));

      const { error: attendanceError } = await supabase
        .from('Attendance')
        .insert(attendanceRecords);

      if (attendanceError) {
        console.error('Error inserting attendance:', attendanceError);
        return { success: false, error: attendanceError };
      }

    }
    return { message: "Request updated successfully" };
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
              dataPage.map((item: any, index) => {
                return (
                  <DecisionCard key={index} item={item} decideUponTheFateOfTheRequest={decideUponTheFateOfTheRequest} />
                );
              })}
        </div>
      </div>
    </main>
  );
}

export default ReviewRequestPage;