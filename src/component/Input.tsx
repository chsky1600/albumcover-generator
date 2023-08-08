export function Input(props: React.ComponentPropsWithoutRef<"input">) {
  return <input type="text" {...props} className="border rounded border-gray-900 text-black px-2 py-1 gap-4"></input>;
}   