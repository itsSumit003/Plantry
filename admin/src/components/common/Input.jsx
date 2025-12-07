export default function Input({ label, ...props }) {
  return (
    <div>
      <label className="block text-sm mb-1 font-medium">{label}</label>
      <input
        {...props}
        className="w-full border rounded-lg px-3 py-2 text-sm"
      />
    </div>
  );
}
