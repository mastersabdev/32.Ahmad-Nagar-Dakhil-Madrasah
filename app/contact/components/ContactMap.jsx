const ContactMap = () => {
  return (
    <section className="gov-panel">
      <h2 className="gov-panel-header">আমাদের অবস্থান</h2>
      <div className="w-full h-[360px] bg-slate-100 border-t border-slate-200">
        <iframe
          src=""
          width="100%"
          height="360"
          style={{ border: "0" }}
          allowFullScreen={true}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </section>
  );
};

export default ContactMap;
