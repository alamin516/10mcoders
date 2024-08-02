"use client";
import { styles } from "@/styles/style";

type Props = {
  newUserData: any;
  setNewUserData: any;
  setOpen: (open: boolean) => void;
  handleSubmit: any;
};

const CreateMember: React.FC<Props> = ({ setOpen, newUserData, setNewUserData, handleSubmit }) => {
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setNewUserData({
      ...newUserData,
      [name]: value,
    });
  };

  const roles = [
    { value: "admin", label: "Admin" },
    { value: "moderator", label: "Moderator" },
    { value: "user", label: "User" },
  ];

  return (
    <div className="absolute top-0 left-0 w-full min-h-screen flex items-center justify-center bg-black/60 z-[99999] text-white">
      <div className="w-[30%] h-auto bg-slate-900 rounded-md p-4">
        <h2 className={`${styles.title} text-white`}>Add New Member</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className={`${styles.label}`}>Email</label>
            <input
              type="email"
              name="email"
              value={newUserData.email}
              onChange={handleChange}
              className={`text-base ${styles.input} text-white`}
              placeholder="Email ....."
            />
          </div>
          <div className="mb-3">
            <label className={`${styles.label}`}>Role</label>
            <select
              name="role"
              value={newUserData.role}
              onChange={handleChange}
              className={`text-base ${styles.input} text-white`}
            >
              <option value="" disabled>
                Select role...
              </option>
              {roles.map((role) => (
                <option
                  key={role.value}
                  value={role.value}
                  className="bg-slate-800"
                >
                  {role.label}
                </option>
              ))}
            </select>
          </div>
          <div className="mt-4 flex justify-between items-center gap-5">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className={`${styles.button}`}
            >
              Close
            </button>
            <button type="submit" className={`${styles.button}`}>
              Add Member
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateMember;
