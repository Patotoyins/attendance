// components/ui/card.js

import * as React from "react";
import { cn } from "@/lib/utils"; // Ensure you have utils or adjust the path

const Card = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("bg-white shadow rounded-lg p-6", className)} {...props} />
));

const CardContent = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-4", className)} {...props} />
));

const CardDescription = React.forwardRef(({ className, ...props }, ref) => (
  <p ref={ref} className={cn("text-gray-600", className)} {...props} />
));

const CardHeader = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("pb-4", className)} {...props} />
));

const CardTitle = React.forwardRef(({ className, ...props }, ref) => (
  <h3 ref={ref} className={cn("text-lg font-semibold", className)} {...props} />
));

Card.displayName = "Card";
CardContent.displayName = "CardContent";
CardDescription.displayName = "CardDescription";
CardHeader.displayName = "CardHeader";
CardTitle.displayName = "CardTitle";

export { Card, CardContent, CardDescription, CardHeader, CardTitle };
