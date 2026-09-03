const Table = ({ columns, data }) => {
  return (
    <div className="relative overflow-hidden gov-panel">
      <div className="relative overflow-x-auto">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="bg-primary text-white">
              {columns.map((col) => (
                <th
                  key={col.key}
                  className="px-4 py-2.5 text-left text-sm font-semibold tracking-wide border-r border-white/20 last:border-r-0"
                >
                  {col.title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {data?.length > 0 ? (
              data.map((row, idx) => (
                <tr
                  key={row.id || idx}
                  className="hover:bg-primary-50/50 transition-colors"
                >
                  {columns.map((col) => (
                    <td
                      key={col.key}
                      className="px-4 py-2.5 text-sm text-slate-700 border-r border-slate-100 last:border-r-0"
                    >
                      {col.render ? col.render(row, idx) : row[col.dataIndex]}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length}
                  className="text-center py-12 text-slate-500 bg-slate-50"
                >
                  <span className="block font-medium text-slate-700">
                    কোন তথ্য পাওয়া যায়নি
                  </span>
                  <span className="block text-xs text-slate-400 mt-1">
                    এই মুহূর্তে কোন ডেটা উপলব্ধ নেই
                  </span>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
