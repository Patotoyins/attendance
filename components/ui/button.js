// components/ui/button.js

import * as React from "react";
import { cn } from "@/lib/utils"; // Make sure utils exists or adjust the path

const Button = React.forwardRef(({ className, ...props }, ref) => (
  <button
    ref={ref}
    className={cn(
      "px-4 py-2 font-semibold text-white bg-blue-500 rounded hover:bg-blue-700",
      className
    )}
    {...props}
  />
));

Button.displayName = "Button";

export { Button };
