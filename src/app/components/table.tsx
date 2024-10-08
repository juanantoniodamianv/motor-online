"use client";

import Image from "next/image";
import { Table } from "flowbite-react";
import { formatCurrency } from "../utils/currency";

type TableColumn = {
  label: string;
  showHeader: boolean;
};

export type Row = { value: string; type: "image-url" | "text" | "currency" };

type TableProps = {
  columns: TableColumn[];
  rows: Row[][];
};

export default function CustomTable({ columns, rows }: TableProps) {
  const ImageCell = ({ imageUrl }: { imageUrl: string }) => (
    <Image
      src={imageUrl}
      width={30}
      height={30}
      alt="Picture of the account"
      className="rounded-full"
      unoptimized
      priority
    />
  );

  const renderCellContent = (cell: Row) => {
    switch (cell.type) {
      case "currency":
        return formatCurrency(parseInt(cell.value), "ars");
      case "image-url":
        return <ImageCell imageUrl={cell.value} />;
      default:
        return cell.value;
    }
  };

  return (
    <Table>
      <Table.Head>
        {columns.map((column, index) => (
          <Table.HeadCell key={index}>
            {column.showHeader ? column.label : ""}
          </Table.HeadCell>
        ))}
      </Table.Head>
      <Table.Body className="divide-y">
        {rows.map((row, rowIndex) => (
          <Table.Row
            key={rowIndex}
            className="bg-white dark:border-gray-700 dark:bg-gray-800"
          >
            {row.map((cell, cellIndex) => (
              <Table.Cell key={cellIndex}>{renderCellContent(cell)}</Table.Cell>
            ))}
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
}
