"use client";

import { Table } from "flowbite-react";

type TableProps = {
  columns: string[];
  rows: { field: string; value: string }[][];
};

export default function CustomTable({ columns, rows }: TableProps) {
  return (
    <div className="overflow-x-auto">
      <Table>
        <Table.Head>
          {columns.map((column) => (
            <Table.HeadCell>{column}</Table.HeadCell>
          ))}
        </Table.Head>
        <Table.Body className="divide-y">
          {rows.map((row) => (
            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
              {row.map((cell) => (
                <Table.Cell>{cell.value}</Table.Cell>
              ))}
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
}
