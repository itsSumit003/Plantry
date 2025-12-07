export default function Table({ headers, children }) {
  return (
    <table className="w-full text-sm">
      <thead>
        <tr className="border-b">
          {headers.map((h, i) => (
            <th key={i} className="text-left py-2">{h}</th>
          ))}
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </table>
  );
}
