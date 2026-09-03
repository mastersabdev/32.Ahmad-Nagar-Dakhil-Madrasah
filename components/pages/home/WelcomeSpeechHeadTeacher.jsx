import Image from "next/image";

const WelcomeSpeechHeadTeacher = ({ data, compact = false }) => {
  if (!data || !(data.name || data.speech || data.image_url)) {
    return null;
  }

  if (compact) {
    return (
      <div className="gov-panel border-t-4 border-b-4 border-t-primary border-b-primary text-center p-3">
        {data.image_url && (
          <div className="mx-auto size-28 rounded-full overflow-hidden border-2 border-primary mb-2">
            <Image
              className="object-cover w-full h-full object-top"
              src={data.image_url}
              width={200}
              height={200}
              draggable={false}
              alt={data.name || "Head teacher"}
            />
          </div>
        )}
        {data.name && (
          <p className="font-bold text-slate-900 text-sm leading-snug">{data.name}</p>
        )}
        {data.designation && (
          <p className="text-xs text-primary-700 font-medium mt-1">{data.designation}</p>
        )}
      </div>
    );
  }

  return (
    <div className="gov-panel flex flex-col md:flex-row items-center md:items-start gap-4 p-4">
      <div className="flex flex-col items-center w-full md:w-1/4">
        {data.image_url && (
          <div className="max-w-[180px] rounded-full overflow-hidden border-2 border-primary">
            <Image
              className="object-cover w-full"
              src={data.image_url}
              width={450}
              height={450}
              draggable={false}
              alt={data.name || "Head teacher"}
            />
          </div>
        )}
        {data.name && (
          <h2 className="mt-3 text-base font-bold text-slate-900 text-center w-full">
            {data.name}
          </h2>
        )}
        {data.designation && (
          <p className="text-sm text-primary-700 font-medium text-center w-full mt-1">
            {data.designation}
          </p>
        )}
      </div>

      <div className="w-full md:w-3/4">
        <h3 className="gov-panel-header mb-3 -mx-4 md:mx-0 md:rounded-none">
          Welcome Speech
        </h3>
        {data.speech && (
          <p className="text-slate-700 leading-relaxed text-justify text-sm">
            {data.speech}
          </p>
        )}
      </div>
    </div>
  );
};

export default WelcomeSpeechHeadTeacher;
