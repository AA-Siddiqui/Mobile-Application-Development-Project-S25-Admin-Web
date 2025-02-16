import { upsertCourseAction } from '@/utils/actions/AdminActions';

export function AdminAddCourseForm({ data, edit }: { data?: any; edit?: any; }) {
  
  return (
    <form action={(formData) => upsertCourseAction(formData, edit)} className="p-10 pt-2 pb-0 flex flex-col gap-2">
      <div className="w-full flex flex-col gap-2">
        <h1>Name</h1>
        <input type='text' defaultValue={data?.name} className="w-full bg-background-color p-2 rounded-lg" name="name" id="" />
      </div>

      <div className="w-full flex flex-col gap-2">
        <h1>Credit Hours</h1>
        <input type='number' defaultValue={data?.creditHr} className="w-full bg-background-color p-2 rounded-lg" name="creditHr" id="" />
      </div>

      <div className="w-full flex flex-col gap-2">
        <h1>Mode</h1>
        <select defaultValue={data?.mode} className="w-full bg-background-color p-2 rounded-lg" name="mode" id="">
          <option value="Lecture">Lecture</option>
          <option value="Lab">Lab</option>
        </select>
      </div>

      <button type='submit' className="button-primary">{edit ? "Update" : "Add"}</button>
    </form>
  );
}