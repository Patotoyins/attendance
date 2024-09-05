import * as React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { cn } from "@/lib/utils"; // Adjust if necessary

const Select = React.forwardRef(({ className, ...props }, ref) => (
  <SelectPrimitive.Root {...props}>
    <SelectPrimitive.Trigger
      ref={ref}
      className={cn(
        "inline-flex items-center justify-between p-2 border rounded-md",
        className
      )}
    >
      {props.children}
    </SelectPrimitive.Trigger>
  </SelectPrimitive.Root>
));

const SelectContent = React.forwardRef(({ className, ...props }, ref) => (
  <SelectPrimitive.Content ref={ref} className={cn("p-2", className)} {...props}>
    {props.children}
  </SelectPrimitive.Content>
));

const SelectGroup = SelectPrimitive.Group;
const SelectItem = SelectPrimitive.Item;
const SelectLabel = SelectPrimitive.Label;
const SelectValue = SelectPrimitive.Value;

Select.displayName = "Select";
SelectContent.displayName = "SelectContent";

export { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectValue };
