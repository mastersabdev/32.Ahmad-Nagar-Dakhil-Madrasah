import Image from "next/image";

const ManagingCommitteeCard = ({ committee }) => {
  return (
    <div className="gov-panel border-t-4 border-b-4 border-t-primary border-b-primary text-center p-3 hover:bg-primary-50/40 transition-colors">
      <div className="size-32 mx-auto rounded-full overflow-hidden border-2 border-primary mb-3">
        <Image
          className="object-cover w-full h-full object-top"
          src={committee?.image_url}
          alt={committee?.name || "Committee member"}
          height={300}
          width={300}
          quality={100}
        />
      </div>

      <h3 className="text-sm font-bold text-slate-900">{committee?.name}</h3>
      <p className="text-xs text-primary-700 font-semibold mt-1">
        {committee?.designation}
      </p>

      {committee?.email && (
        <a
          className="block text-xs text-slate-600 hover:text-primary-700 mt-2 break-words"
          href={`mailto:${committee.email}`}
        >
          {committee.email}
        </a>
      )}

      {committee?.mobile_no && (
        <a
          className="block text-xs text-slate-600 hover:text-primary-700 mt-1"
          href={`tel:${committee.mobile_no}`}
        >
          {committee.mobile_no}
        </a>
      )}
    </div>
  );
};

export default ManagingCommitteeCard;
