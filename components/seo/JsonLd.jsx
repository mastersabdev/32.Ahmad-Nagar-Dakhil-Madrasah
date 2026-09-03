const JsonLd = ({ data }) => {
  if (!data) return null;

  const graphs = Array.isArray(data) ? data : [data];
  const payload =
    graphs.length === 1
      ? graphs[0]
      : {
          "@context": "https://schema.org",
          "@graph": graphs,
        };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(payload) }}
    />
  );
};

export default JsonLd;
