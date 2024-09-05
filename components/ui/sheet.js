import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { cn } from "@/lib/utils"; // Ensure the utils exist

const Sheet = DialogPrimitive.Root;
const SheetTrigger = DialogPrimitive.Trigger;
const SheetContent = React.forwardRef(({ className, ...props }, ref) => (
  <DialogPrimitive.Content
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 flex items-center justify-center bg-white shadow-lg",
      className
    )}
    {...props}
  />
));

SheetContent.displayName = "SheetContent";

export { Sheet, SheetContent, SheetTrigger };
