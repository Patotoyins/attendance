import * as React from "react";
import { cn } from "@/lib/utils"; // Ensure this exists, or adjust the path

const Table = ({ className, ...props }) => (
  <table className={cn("min-w-full divide-y divide-gray-200", className)} {...props} />
);

const TableBody = ({ className, ...props }) => (
  <tbody className={cn("bg-white divide-y divide-gray-200", className)} {...props} />
);

const TableCell = ({ className, ...props }) => (
  <td className={cn("px-6 py-4 whitespace-nowrap", className)} {...props} />
);

const TableHead = ({ className, ...props }) => (
  <thead className={cn("bg-gray-50", className)} {...props} />
);

const TableHeader = ({ className, ...props }) => (
  <th
    className={cn("px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", className)}
    {...props}
  />
);

const TableRow = ({ className, ...props }) => (
  <tr className={cn("", className)} {...props} />
);

export { Table, TableBody, TableCell, TableHead, TableHeader, TableRow };
