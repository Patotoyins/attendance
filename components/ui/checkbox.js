import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { CheckIcon } from "@heroicons/react/solid"; // Or any icon of your choice
import { cn } from "@/lib/utils"; // Adjust this path based on your setup

const Checkbox = React.forwardRef(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      "flex items-center justify-center w-5 h-5 rounded border border-gray-300",
      "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500",
      className
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator>
      <CheckIcon className="w-4 h-4 text-indigo-500" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
));

Checkbox.displayName = "Checkbox";

export { Checkbox };
