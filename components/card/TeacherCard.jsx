import Image from "next/image";

const TeacherCard = ({ teacher }) => {
  return (
    <div className="gov-panel border-t-4 border-b-4 border-t-primary border-b-primary text-center p-3 hover:bg-primary-50/40 transition-colors">
      <div className="w-28 h-28 mx-auto rounded-full overflow-hidden border-2 border-primary mb-3">
        <Image
          className="object-cover w-full h-full object-top"
          src={teacher?.image_url}
          alt={teacher?.name || "Teacher"}
          height={300}
          width={300}
          quality={100}
        />
      </div>

      <h3 className="text-sm font-bold text-slate-900">{teacher?.name}</h3>
      <p className="text-xs text-primary-700 font-semibold mt-1">
        {teacher?.designation}
      </p>

      {teacher?.email && (
        <p className="text-xs text-slate-500 mt-2 break-all">{teacher?.email}</p>
      )}

      {teacher?.mobile_no && (
        <p className="text-xs text-slate-500 mt-0.5">{teacher?.mobile_no}</p>
      )}
    </div>
  );
};

export default TeacherCard;
