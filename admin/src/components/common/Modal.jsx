export default function Modal({ children, open }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
      <div className="bg-white rounded-xl p-4 min-w-[300px]">
        {children}
      </div>
    </div>
  );
}
