import * as React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";

import { cn } from "@/lib/utils"; // Ensure this exists

const TooltipProvider = TooltipPrimitive.Provider;

const Tooltip = ({ children, ...props }) => (
  <TooltipPrimitive.Root {...props}>
    {children}
  </TooltipPrimitive.Root>
);

const TooltipTrigger = React.forwardRef(({ className, ...props }, ref) => (
  <TooltipPrimitive.Trigger ref={ref} className={cn(className)} {...props} />
));

const TooltipContent = React.forwardRef(({ className, ...props }, ref) => (
  <TooltipPrimitive.Content
    ref={ref}
    className={cn(
      "bg-gray-900 text-white text-sm rounded-md shadow-md p-2",
      className
    )}
    {...props}
  />
));

TooltipTrigger.displayName = "TooltipTrigger";
TooltipContent.displayName = "TooltipContent";

export { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent };
