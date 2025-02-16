import { createClient } from "@/utils/supabase/server";
import Link from "next/link";

async function AdminDashboard() {
  const supabase = await createClient();

  const { data: { user: authUser }, error: authError } = await supabase.auth.getUser();

  if (authError || !authUser) {
    console.error('Error fetching authenticated user:', authError);
    return;
  }

  const { data: userData, error: userError } = await supabase
    .from('User')
    .select(`
      name,
      Department:departmentId (name)
    `)
    .eq('id', authUser.id)
    .single() as { data: { name: string, Department: { name: string } }, error: any };

  if (userError) {
    console.error('Error fetching user details:', userError);
    return;
  }

  const userName = userData.name;
  const departmentName = userData.Department.name;
  const pageData = {
    name: userName,
    department: departmentName,
  };

  const actions = [
    { title: "Add Student", link: "add/user/student" },
    { title: "Add Teacher", link: "add/user/teacher" },
    { title: "Add Course", link: "add/course" },
    { title: "Add Class", link: "add/class" },

    { title: "Edit Student", link: "edit/user/student" },
    { title: "Edit Teacher", link: "edit/user/teacher" },
    { title: "Edit Course", link: "edit/course" },
    { title: "Edit Class", link: "edit/class" },

    // { title: "Generate Fees For Term", link: "fees/add/term" },
    // { title: "Generate Fees For Student", link: "fees/add/student" },
    // { title: "Clear Fees", link: "fees/clear" },

    // { title: "Enroll Students to Course", link: "enroll" },
    // { title: "Review Requests", link: "requests" },

    // { title: "Schedule Extra Class", link: "schedule" }
  ];
  return (
    <main>
      <section className="m-5 p-5 bg-surface-color border-[1px] border-solid border-border-color flex flex-col justify-center items-center gap-2.5 md:flex-row md:justify-start md:items-start md:gap-0 [&_h2]:text-[17px] [&_h3]:text-[14px]">
        <div className="aspect-square w-32 flex rounded-full overflow-hidden border-[3px] border-solid border-accent-color">
          <img src="https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg"
            alt="" />
        </div>
        <div className="w-auto mx-8 flex justify-between flex-col gap-2.5 md:flex-row md:w-full md:m-5 md:gap-0 [&_span]:text-primary-color">
          <div>
            <h1>{pageData.name}</h1>
            <h2>{pageData.department}</h2>
          </div>
          <div></div>
        </div>
      </section>

      <section className="m-5 p-5 bg-surface-color border-[1px] border-solid border-border-color flex flex-col justify-center items-center gap-2.5 md:justify-start md:items-start">
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-2.5 p-2.5">
          {actions.map((action, index) => {
            return (
              <Link key={index} className="no-underline transition-all duration-300 ease-in-out" href={action.link}>
                <div className={`h-full min-h-full overflow-auto min-w-48 bg-background-color border-[1px] border-solid border-accent-color brightness-75 rounded-[5px] flex justify-center items-center gap-2.5 p-2.5 [&_h2]:text-[14px]`}>
                  <h1>{action.title}</h1>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </main>
  )
}

export default AdminDashboard;