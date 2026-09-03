const AboutUs = ({ data }) => {
  if (!data?.description && !data?.title) return null;

  return (
    <div className="gov-panel mt-3">
      <h2 className="gov-panel-header">About Us</h2>
      <div className="p-3 sm:p-4 space-y-3">
        <h3 className="text-base font-bold text-slate-900">
          {data?.title || "Our Journey"}
        </h3>
        {data?.description ? (
          <div
            className="text-slate-700 leading-relaxed text-justify text-sm prose prose-sm max-w-none"
            dangerouslySetInnerHTML={{ __html: data.description }}
          />
        ) : null}
      </div>
    </div>
  );
};

export default AboutUs;
