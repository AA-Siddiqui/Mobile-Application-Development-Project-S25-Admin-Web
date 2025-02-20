"use client";
import React, { useEffect, useState } from 'react';
import { RxMinus, RxPlus } from "react-icons/rx";
import Swal from 'sweetalert2';
import { AdminAddCourseForm } from './AdminFormCollectionServer';
import { createClient } from '@/utils/supabase/client';

function getTermsFromDate(startDate: string) {
  // Get the current date and start year
  const currentDate = new Date();
  const start = new Date(startDate);
  const startYear = start.getFullYear();
  const currentYear = currentDate.getFullYear();

  // Define the months for each term
  const terms = [
    { name: "Spring", startMonth: 0, endMonth: 4 }, // Jan to May
    { name: "Summer", startMonth: 5, endMonth: 7 }, // June to Aug
    { name: "Fall", startMonth: 8, endMonth: 11 },  // Sep to Dec
  ];


  // Array to store the terms
  const resultTerms = [];

  // Loop through years from startYear to currentYear
  for (let year = startYear; year <= currentYear; year++) {
    // Loop through terms for the given year
    for (const term of terms) {
      const termStartDate = new Date(year, term.startMonth, 1);
      const termEndDate = new Date(year, term.endMonth + 1, 0); // Last day of the term

      // Check if the term falls within the start date and the current date
      if (termStartDate <= currentDate && termEndDate >= start) {
        resultTerms.push(`${term.name}  ${year}`);
      }
    }
  }

  return resultTerms;
}


export function AdminAddClassForm({ data, edit }: { data?: any, edit?: any }) {
  const [course, setCourse] = useState<any[]>([]);
  const [teacher, setTeacher] = useState<any[]>([]);
  const [rows, setRows] = useState(data?.schedule.length ?? 1);
  const [creditHr, setCreditHr] = useState(data?.creditHr ?? 3);

  async function getData() {
    const courseRequest = await fetch(`http://localhost:3001/admin/get/course`);
    const courses = await courseRequest.json();
    setCourse(courses);

    const teacherRequest = await fetch(`http://localhost:3001/admin/get/teachers`);
    const teachers = await teacherRequest.json();
    setTeacher(teachers);
  }

  async function handleSubmit(formData: FormData) {

    const item: any = {
      courseID: formData.get('courseID'),
      teacherID: formData.get('teacherID'),
      section: formData.get('section'),
      term: formData.get('term'),
      schedules: []
    };

    for (let i = 0; i < rows; i++) {
      item.schedules.push({
        day: formData.get(`day-${i}`),
        startTime: formData.get(`startTime-${i}`),
        endTime: formData.get(`endTime-${i}`),
        venue: formData.get(`venue-${i}`)
      });
    }

    const response = await fetch(`http://localhost:3001/admin/add/class`, {
      method: edit ? "PUT" : "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        classID: edit,
        ...item
      }),
    });

    console.log(item);

    Swal.fire({
      title: (await response.json()).message ?? "Error",
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

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    setRows(data?.schedule.length ?? 1);
  }, [data]);

  return (
    <form action={handleSubmit} className="p-10 pt-2 pb-0 flex flex-col gap-2">
      <div className="w-full flex flex-col gap-2">
        <h1>Course</h1>
        <select onChange={(e) => { setCreditHr(course.find((c) => e.target.value == c.courseID).creditHr); }} className="w-full bg-background-color p-2 rounded-lg" name="courseID" id="">
          {course.map((c) => {
            return <option selected={data?.course == c.courseID} value={c.courseID}>{c.name}</option>
          })}
        </select>
      </div>

      <div className="w-full flex flex-col gap-2">
        <h1>Teacher</h1>
        <select className="w-full bg-background-color p-2 rounded-lg" name="teacherID" id="">
          {teacher.map((t) => {
            return <option selected={data?.teacher == t.teacherID} value={t.teacherID}>{t.name}: {t.username}</option>
          })}
        </select>
      </div>

      <div className="w-full flex flex-col gap-2">
        <h1>Term</h1>
        <select className="w-full bg-background-color p-2 rounded-lg" name={`term`}>
          {getTermsFromDate('2023-03-15').map((term) => {
            return <option selected={data?.term == term} value={term}>{term}</option>
          })}
        </select>
      </div>

      <div className="w-full flex flex-col gap-2">
        <h1>Section</h1>
        <input defaultValue={data?.section} className="w-full bg-background-color p-2 rounded-lg" type="text" name={`section`} />
      </div>

      <div className="w-full flex flex-col gap-2">
        <h1>Schedule</h1>
        <div className="w-full grid grid-cols-4 col gap-2.5 items-center [&_h2]:text-secondary-color">
          <h2>Day</h2>
          <h2>Start Time</h2>
          <h2>End Time</h2>
          <h2>Venue</h2>

          {
            Array.from({ length: rows }).map((_, index) => {
              // if (index >= data?.schedule.length) return;
              return (
                <React.Fragment key={index}>
                  <select className="w-full bg-background-color p-2 rounded-lg" name={`day-${index}`} id="">
                    <option selected={index >= data!.schedule.length ? false : data?.schedule[index].day == "1"} value="1">Monday</option>
                    <option selected={index >= data!.schedule.length ? false : data?.schedule[index].day == "2"} value="2">Tuesday</option>
                    <option selected={index >= data!.schedule.length ? false : data?.schedule[index].day == "3"} value="3">Wednesday</option>
                    <option selected={index >= data!.schedule.length ? false : data?.schedule[index].day == "4"} value="4">Thursday</option>
                    <option selected={index >= data!.schedule.length ? false : data?.schedule[index].day == "5"} value="5">Friday</option>
                    <option selected={index >= data!.schedule.length ? false : data?.schedule[index].day == "6"} value="6">Saturday</option>
                    <option selected={index >= data!.schedule.length ? false : data?.schedule[index].day == "0"} value="0">Sunday</option>
                  </select>

                  <input defaultValue={index >= data?.schedule.length ? null : data?.schedule[index].startTime} className="w-full bg-background-color p-2 rounded-lg" type="time" name={`startTime-${index}`} />

                  <input defaultValue={index >= data?.schedule.length ? null : data?.schedule[index].endTime} className="w-full bg-background-color p-2 rounded-lg" type="time" name={`endTime-${index}`} />

                  <input defaultValue={index >= data?.schedule.length ? null : data?.schedule[index].venue} className="w-full bg-background-color p-2 rounded-lg" type='text' name={`venue-${index}`} />
                </React.Fragment>
              );
            })
          }
        </div>

        <div className="flex gap-8 justify-center">
          <button type='button' onClick={() => { if (rows < creditHr) setRows(rows + 1) }} className="bg-accent-color self-center w-8 border-2 border-border-color aspect-square rounded-full flex justify-center items-center"><RxPlus /></button>
          <button type='button' onClick={() => { if (rows > 1) setRows(rows - 1) }} className="bg-accent-color self-center w-8 border-2 border-border-color aspect-square rounded-full flex justify-center items-center"><RxMinus /></button>
        </div>
      </div>


      <button className="button-primary">{edit ? "Update" : "Add"}</button>
    </form>
  )
}

export function AdminAddStudentForm({ data, edit, departmentID, setDepartmentID }: { data?: any, edit?: any, departmentID?: any, setDepartmentID?: any }) {
  // const [departmentID, setDepartmentID] = useState(data?.department ?? -1);
  const [departments, setDeparments] = useState<any[]>([]);
  const [programs, setPrograms] = useState<any[]>([]);
  async function fetchInitialData() {
    const departmentResponse = await fetch("http://localhost:3001/department/list");
    const departmentData = await departmentResponse.json();
    setDeparments(departmentData);

    const programsResponse = await fetch("http://localhost:3001/admin/get/programs");
    const programsData = await programsResponse.json();
    setPrograms(programsData);
  }
  useEffect(() => {
    fetchInitialData();
  }, []);

  async function handleSubmit(formData: FormData) {
    const response = await fetch(`http://localhost:3001/admin/add/student`, {
      method: edit ? "PUT" : "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userID: edit?.userID ?? undefined,
        studentID: edit?.studentID ?? undefined,
        name: formData.get('name'),
        email: formData.get('email'),
        gender: formData.get('gender'),
        dob: formData.get('dob'),
        phoneNo: formData.get('phoneNo'),
        emergencyNo: formData.get('emergencyNo'),
        address: formData.get('address'),
        departmentID: formData.get('departmentID'),
        enrollmentDate: formData.get('enrollmentDate'),
        programID: formData.get('programID')
      }),
    })
    Swal.fire({
      title: (await response.json()).message ?? "Error",
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
    <form action={handleSubmit} className="p-10 pt-2 pb-0 flex flex-col gap-2">
      <div className="w-full justify-between flex gap-2.5">
        <div className="w-[49%] flex flex-col gap-2">
          <h1>Name</h1>
          <input type='text' defaultValue={data?.name} className="w-full bg-background-color p-2 rounded-lg" name="name" id="" />
        </div>

        <div className="w-[49%] flex flex-col gap-2">
          <h1>Email</h1>
          <input type='email' defaultValue={data?.email} className="w-full bg-background-color p-2 rounded-lg" name="email" id="" />
        </div>
      </div>

      <div className="w-full justify-between flex gap-2.5">
        <div className="w-[49%] h-full flex flex-col gap-2">
          <h1>Gender</h1>
          <select className="w-full bg-background-color p-2 rounded-lg" name="gender" id="">
            <option selected={data?.gender == "Male"} value="Male">Male</option>
            <option selected={data?.gender == "Female"} value="Female">Female</option>
            <option selected={data?.gender == "Other"} value="Other">Other (Only for Talha)</option>
          </select>
        </div>

        <div className="w-[49%] h-full flex flex-col gap-2">
          <h1>Date of Birth</h1>
          <input type='date' defaultValue={data?.dob ? new Date(data?.dob).toISOString().split("T")[0] : ''} className="w-full bg-background-color p-2 rounded-lg" name="dob" id="" />
        </div>
      </div>

      <div className="w-full justify-between flex gap-2.5">
        <div className="w-[49%] flex flex-col gap-2">
          <h1>Phone</h1>
          <input type='tel' defaultValue={data?.phone} className="w-full bg-background-color p-2 rounded-lg" name="phoneNo" id="" />
        </div>

        <div className="w-[49%] flex flex-col gap-2">
          <h1>Emergency Phone</h1>
          <input type='tel' defaultValue={data?.emergencyPhone} className="w-full bg-background-color p-2 rounded-lg" name="emergencyNo" id="" />
        </div>
      </div>

      <div className="w-full flex flex-col gap-2">
        <h1>Address</h1>
        <input type='text' defaultValue={data?.address} className="w-full bg-background-color p-2 rounded-lg" name="address" id="" />
      </div>

      <div className="w-full flex flex-col gap-2">
        <h1>Department</h1>
        <select onChange={(e) => { setDepartmentID(e.target.value); }} className="w-full bg-background-color p-2 rounded-lg" name="departmentID" id="">
          {departments.map((department, index) => {
            return <option key={index} selected={data?.department == department.departmentID} value={department.departmentID}>{department.name}</option>;
          })}
        </select>
      </div>

      <div className="w-full flex flex-col gap-2">
        <h1>Enrollment Date</h1>
        <input type='date' defaultValue={data?.enrollmentDate ? new Date(data?.enrollmentDate).toISOString().split("T")[0] : ''} className="w-full bg-background-color p-2 rounded-lg" name="enrollmentDate" id="" />
      </div>

      <div className="w-full flex flex-col gap-2">
        <h1>Program</h1>
        <select defaultValue={data?.program} className="w-full bg-background-color p-2 rounded-lg" name="programID" id="">
          {programs.filter((program) => {
            return program.departmentIDDepartmentID == departmentID;
          }).map((program, index) => {
            return <option key={index} selected={data?.program == program.programID} value={program.programID}>{program.name}</option>;
          })}
        </select>
      </div>

      <button type='submit' className="button-primary">Add</button>
    </form>
  );
}

export function AdminAddTeacherForm({ data, edit }: { data?: any, edit?: any }) {
  const [departments, setDeparments] = useState<any[]>([]);
  async function fetchInitialData() {
    const departmentResponse = await fetch("http://localhost:3001/department/list");
    const departmentData = await departmentResponse.json();
    setDeparments(departmentData);
  }
  useEffect(() => {
    fetchInitialData();
  }, []);

  async function handleSubmit(formData: FormData) {
    const response = await fetch(`http://localhost:3001/admin/add/teacher`, {
      method: edit ? "PUT" : "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userID: edit?.userID ?? undefined,
        teacherID: edit?.teacherID ?? undefined,
        name: formData.get('name'),
        email: formData.get('email'),
        gender: formData.get('gender'),
        dob: formData.get('dob'),
        phoneNo: formData.get('phoneNo'),
        emergencyNo: formData.get('emergencyNo'),
        address: formData.get('address'),
        departmentID: formData.get('departmentID'),
        hireDate: formData.get('hireDate'),
        position: formData.get('position'),
        officeLocation: formData.get('officeLocation')
      }),
    })
    Swal.fire({
      title: (await response.json()).message ?? "Error",
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
    <form action={handleSubmit} className="p-10 pt-2 pb-0 flex flex-col gap-2">
      <div className="w-full justify-between flex gap-2.5">
        <div className="w-[49%] flex flex-col gap-2">
          <h1>Name</h1>
          <input type='text' defaultValue={data?.name} className="w-full bg-background-color p-2 rounded-lg" name="name" id="" />
        </div>

        <div className="w-[49%] flex flex-col gap-2">
          <h1>Email</h1>
          <input type='email' defaultValue={data?.email} className="w-full bg-background-color p-2 rounded-lg" name="email" id="" />
        </div>
      </div>

      <div className="w-full justify-between flex gap-2.5">
        <div className="w-[49%] h-full flex flex-col gap-2">
          <h1>Gender</h1>
          <select className="w-full bg-background-color p-2 rounded-lg" name="gender" id="">
            <option selected={data?.gender == "Male"} value="Male">Male</option>
            <option selected={data?.gender == "Female"} value="Female">Female</option>
            <option selected={data?.gender == "Other"} value="Other">Other (Only for Talha)</option>
          </select>
        </div>

        <div className="w-[49%] h-full flex flex-col gap-2">
          <h1>Date of Birth</h1>
          <input type='date' defaultValue={data?.dob ? new Date(data?.dob).toISOString().split("T")[0] : ''} className="w-full bg-background-color p-2 rounded-lg" name="dob" id="" />
        </div>
      </div>

      <div className="w-full justify-between flex gap-2.5">
        <div className="w-[49%] flex flex-col gap-2">
          <h1>Phone</h1>
          <input type='tel' defaultValue={data?.phone} className="w-full bg-background-color p-2 rounded-lg" name="phoneNo" id="" />
        </div>

        <div className="w-[49%] flex flex-col gap-2">
          <h1>Emergency Phone</h1>
          <input type='tel' defaultValue={data?.emergencyPhone} className="w-full bg-background-color p-2 rounded-lg" name="emergencyNo" id="" />
        </div>
      </div>

      <div className="w-full flex flex-col gap-2">
        <h1>Address</h1>
        <input type='text' defaultValue={data?.address} className="w-full bg-background-color p-2 rounded-lg" name="address" id="" />
      </div>

      <div className="w-full flex flex-col gap-2">
        <h1>Department</h1>
        <select className="w-full bg-background-color p-2 rounded-lg" name="departmentID" id="">
          {departments.map((department, index) => {
            return <option key={index} selected={data?.department == department.departmentID} value={department.departmentID}>{department.name}</option>;
          })}
        </select>
      </div>

      <div className="w-full flex flex-col gap-2">
        <h1>Hire Date</h1>
        <input type='date' defaultValue={data?.hireDate ? new Date(data?.hireDate).toISOString().split("T")[0] : ''} className="w-full bg-background-color p-2 rounded-lg" name="hireDate" id="" />
      </div>

      <div className="w-full flex flex-col gap-2">
        <h1>Position</h1>
        <input type='position' defaultValue={data?.position} className="w-full bg-background-color p-2 rounded-lg" name="position" id="">
          {/* <option value="A">A</option>
          <option value="B">B</option>
          <option value="C">C</option> */}
        </input>
      </div>

      {/* <div className="w-full flex flex-col gap-2">
        <h1>Salary</h1>
        <input type='number' defaultValue={data?.salary} className="w-full bg-background-color p-2 rounded-lg" name="salary" id="" />
      </div> */}

      <div className="w-full flex flex-col gap-2">
        <h1>Office Location</h1>
        <input type='text' defaultValue={data?.officeLocation} className="w-full bg-background-color p-2 rounded-lg" name="officeLocation" id="">
          {/* <option value="A">A</option>
          <option value="B">B</option>
          <option value="C">C</option> */}
        </input>
      </div>

      <button type='submit' className="button-primary">{edit ? "Update" : "Add"}</button>
    </form>
  );
}

export function AdminEditClassForm() {
  const [classes, setClasses] = useState<any[]>([]);
  const [dataSelected, setDataSelected] = useState<any>(undefined);
  async function getData() {
    const response = await fetch(`http://localhost:3001/admin/get/classes`, {
      method: "GET"
    });
    const data = await response.json();
    setClasses(data);
  }

  async function deleteClass(formData: FormData) {
    const response = await fetch(`http://localhost:3001/admin/delete/class/${formData.get('classID')}`, {
      method: "DELETE"
    });

    Swal.fire({
      title: (await response.json()).message ?? "Error",
      timer: 2000,
      timerProgressBar: true,
      customClass: {
        timerProgressBar: 'bg-secondary-color',
        popup: 'bg-surface-color text-text-color',
        title: 'text-accent-color',
        confirmButton: 'button-primary px-4',
      }
    });

    getData();
  }

  useEffect(() => {
    getData();
  }, []);
  return (
    <div className='bg-surface-color p-4 flex flex-col gap-4 [&_h1]:text-lg [&_h1]:md:text-xl'>
      <div className="p-10 pb-0 w-full flex flex-col gap-2">
        <h1>Select Class to Edit</h1>
        <form action={deleteClass} className="flex justify-between gap-5">
          <select onChange={(e) => { setDataSelected(classes.find((classs) => e.target.value == classs.classID)); }} className="w-full bg-background-color p-2 rounded-lg" name="classID" id="class-to-fetch-to-edit">
            {classes.map((c) => {
              return <option value={c.classID}>{c.name} - Section {c.section} - {c.term}</option>;
            })}
          </select>
          <div className="flex justify-between gap-2">
            <button type='submit' className="button-primary !bg-red-700">Remove</button>
          </div>
        </form>
      </div>
      <AdminAddClassForm data={dataSelected} edit={dataSelected?.classID ?? undefined} />
    </div>
  );
}

export function AdminEditCourseForm() {
  const [dataAll, setData] = useState<any[]>([]);
  const [dataSelected, setDataSelected] = useState<any>(undefined);

  async function getData() {
    const supabase = createClient();
    const { data, error } = await supabase.from("Course").select("courseID:id, name, creditHr:credits, mode");
    if (error) {
      console.error(error);
      return;
    }
    setData(data ?? []);
    setDataSelected(data[0] ?? {});
  }

  function setDataInForm(val: any) {
    const item = dataAll.find((course) => course.courseID === Number(val));
    setDataSelected(item);
  }

  async function deleteCourse(formData: FormData) {
    const courseID = formData.get("courseID");
    const supabase = createClient();
    const { error } = await supabase.from('Course').delete().eq('id', courseID);

    if (error) {
      console.error('Error deleting course:', error);
    }
    // const response = await fetch(`http://localhost:3001/admin/delete/course/${formData.get("courseID")}`, {
    //   method: "DELETE",
    // });

    Swal.fire({
      title: error?.cause ?? "Deleted Successfully",
      timer: 2000,
      timerProgressBar: true,
      customClass: {
        timerProgressBar: 'bg-secondary-color',
        popup: 'bg-surface-color text-text-color',
        title: 'text-accent-color',
        confirmButton: 'button-primary px-4',
      }
    });

    getData();
  }

  useEffect(() => {
    getData();
  }, []);
  return (
    <div className='bg-surface-color p-4 flex flex-col gap-4 [&_h1]:text-lg [&_h1]:md:text-xl'>
      <form action={deleteCourse} className="p-10 pb-0 w-full flex flex-col gap-2">
        <h1>Select Course to Edit</h1>
        <div className="flex justify-between gap-5">
          <select onChange={(e) => { setDataInForm(e.target.value); }} className="w-full bg-background-color p-2 rounded-lg" name="courseID">
            {dataAll.map((course: any, index: number) => {
              return <option key={index} value={course.courseID}>{course.name}</option>
            })}
          </select>
          <div className="flex justify-between gap-2">
            <button type='submit' className="button-primary !bg-red-700">Remove</button>
          </div>
        </div>
      </form>
      <AdminAddCourseForm data={dataSelected} edit={dataSelected?.courseID ?? undefined} />
    </div>
  );
}

export function AdminEditStudentForm() {
  const [departmentID, setDepartmentID] = useState(-1);
  const [data, setData] = useState<any>(undefined);
  async function getData() {
    const response = await fetch(`http://localhost:3001/admin/get/student/${(document.getElementById("student-to-fetch-to-edit") as HTMLInputElement)?.value ?? 0}`);
    const res = await response.json();
    console.log(res);
    setData(res[0]);
    setDepartmentID(res[0].department);
  }

  async function deleteStudent(formData: FormData) {
    const response = await fetch(`http://localhost:3001/admin/delete/student/${formData.get("rollNo")}`, {
      method: "DELETE",
    });

    Swal.fire({
      title: (await response.json()).message ?? "Error",
      timer: 2000,
      timerProgressBar: true,
      customClass: {
        timerProgressBar: 'bg-secondary-color',
        popup: 'bg-surface-color text-text-color',
        title: 'text-accent-color',
        confirmButton: 'button-primary px-4',
      }
    });

    getData();

  }
  return (
    <div className='bg-surface-color p-4 flex flex-col gap-4 [&_h1]:text-lg [&_h1]:md:text-xl'>
      <form action={deleteStudent} className="p-10 pb-0 w-full flex flex-col gap-2">
        <h1>Enter Roll No of Student to Edit</h1>
        <div className="flex justify-between gap-5">
          <input type='text' className="w-full bg-background-color p-2 rounded-lg" name="rollNo" id="student-to-fetch-to-edit" />

          <div className="flex justify-between gap-2">
            <button type='button' onClick={getData} className="button-primary">Fetch</button>
            <button type='submit' className="button-primary !bg-red-700">Remove</button>
            {/* <button className="button-primary !bg-red-700">Block</button> */}
          </div>
        </div>
      </form>
      <AdminAddStudentForm departmentID={departmentID} setDepartmentID={setDepartmentID} data={data} edit={(data?.userID && data?.studentID) ? { userID: data.userID, studentID: data.studentID } : undefined} />
    </div>
  );
}

export function AdminEditTeacherForm() {
  const [dataAll, setData] = useState<any[]>([]);
  const [dataSelected, setDataSelected] = useState<any>(undefined);

  async function getData() {
    const response = await fetch(`http://localhost:3001/admin/get/teachers`);
    const teachers = await response.json();
    setData(teachers);
    if (teachers.length > 0)
      setDataSelected(teachers[0]);
  }


  function setDataInForm(val: any) {
    const item = dataAll.find((course) => course.userID === Number(val));
    setDataSelected(item);
  }

  useEffect(() => {
    getData();
  }, []);


  async function deleteTeacher(formData: FormData) {
    const response = await fetch(`http://localhost:3001/admin/delete/teacher/${formData.get("userID")}`, {
      method: "DELETE",
    });

    Swal.fire({
      title: (await response.json()).message ?? "Error",
      timer: 2000,
      timerProgressBar: true,
      customClass: {
        timerProgressBar: 'bg-secondary-color',
        popup: 'bg-surface-color text-text-color',
        title: 'text-accent-color',
        confirmButton: 'button-primary px-4',
      }
    });

    getData();
  }

  return (
    <div className='bg-surface-color p-4 flex flex-col gap-4 [&_h1]:text-lg [&_h1]:md:text-xl'>
      <form action={deleteTeacher} className="p-10 pb-0 w-full flex flex-col gap-2">
        <h1>Select Teacher to Edit</h1>
        <div className="flex justify-between gap-5">
          <select onChange={(e) => { setDataInForm(e.target.value); }} className="w-full bg-background-color p-2 rounded-lg" name="userID">
            {dataAll.map((teacher) => {
              return <option value={teacher.userID}>{teacher.name}: {teacher.username}</option>
            })}
          </select>
          <div className="flex justify-between gap-2">
            {/* <button onClick={getData} className="button-primary">Fetch</button> */}
            <button type='submit' className="button-primary !bg-red-700">Remove</button>
          </div>
        </div>
      </form>
      <AdminAddTeacherForm data={dataSelected} edit={{ userID: dataSelected?.userID, teacherID: dataSelected?.teacherID }} />
    </div>
  );
}