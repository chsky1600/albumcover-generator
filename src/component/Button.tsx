export function Button(props: React.ComponentPropsWithoutRef<"button">) {
    return (
    <button 
        {...props}
        className="bg-blue-400 transition hover:bg-blue-500 rounded px-4 py-2" > {props.children}
      </button>
    );
  }   