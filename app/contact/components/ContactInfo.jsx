import { FiMapPin, FiPhone, FiMail } from "react-icons/fi";

const ContactInfo = ({ data }) => {
  const items = [
    {
      icon: FiMapPin,
      title: "ঠিকানা",
      value: data?.address || "lorem ipsum dolor sit amet",
    },
    {
      icon: FiPhone,
      title: "ফোন",
      value: data?.phone_no || "+88016########",
    },
    {
      icon: FiMail,
      title: "ইমেইল",
      value: data?.email || "email@example.com",
    },
  ];

  return (
    <section className="gov-panel h-full">
      <h2 className="gov-panel-header">যোগাযোগের তথ্য</h2>
      <div className="p-3 space-y-2">
        {items.map(({ icon: Icon, title, value }) => (
          <div
            key={title}
            className="flex items-center gap-3 border border-slate-200 bg-slate-50 p-3"
          >
            <span className="flex items-center justify-center w-10 h-10 bg-primary text-white text-xl shrink-0">
              <Icon />
            </span>
            <div>
              <h3 className="text-sm font-semibold text-slate-900">{title}</h3>
              <p className="text-slate-600 text-sm">{value}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ContactInfo;
