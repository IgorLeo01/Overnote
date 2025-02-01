import React from 'react';

export const Table = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <table className={`min-w-full table-auto ${className}`}>{children}</table>
);

export const TableHeader = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <thead className={`bg-gray-100 ${className}`}>{children}</thead>
);

export const TableBody = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <tbody className={className}>{children}</tbody>
);

export const TableRow = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <tr className={`border-b ${className}`}>{children}</tr>
);

export const TableCell = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <td className={`px-4 py-2 text-left ${className}`}>{children}</td>
);

export const TableHead = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <th className={`px-4 py-2 text-left ${className}`}>{children}</th>
);
