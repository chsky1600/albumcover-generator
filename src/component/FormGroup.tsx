import React from 'react';

export function FormGroup(props: React.ComponentPropsWithoutRef<"div">) {
  const children = React.Children.toArray(props.children);

  const newChildren = children.map((child, index) => {
    if (React.isValidElement(child)) {
      const isButton = child.type === 'button';
      const className = isButton ? 'mt-3' : 'mb-1';
      return React.cloneElement(child, {
        ...child.props,
        className: `${child.props.className ?? ''} ${className}`
      });
    }
    return child;
  });

  return (
    <div className="flex flex-col gap-2" {...props}>
      {newChildren}
    </div>
  );
}
