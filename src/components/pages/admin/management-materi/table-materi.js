import React from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  getKeyValue,
} from "@heroui/table";
import { Pagination } from "@heroui/pagination";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/dropdown";
import { Button } from "@heroui/button";
import { IoMdArrowDropdown } from "react-icons/io";
import { Avatar } from "@heroui/avatar";
export const items = [
  {
    id: "1",
    coarse_name: "Leadership Training",
    price: 500,
    total_materi: 10,
    trainer: "Tony Reichert",
    updated_at: "2025-03-28T08:00:00Z",
  },
  {
    id: "2",
    coarse_name: "Advanced Coding",
    price: 750,
    total_materi: 15,
    trainer: "Zoey Lang",
    updated_at: "2025-03-28T08:05:00Z",
  },
  {
    id: "3",
    coarse_name: "Agile Development",
    price: 600,
    total_materi: 12,
    trainer: "Jane Fisher",
    updated_at: "2025-03-28T08:10:00Z",
  },
  {
    id: "4",
    coarse_name: "Public Relations",
    price: 400,
    total_materi: 8,
    trainer: "William Howard",
    updated_at: "2025-03-28T08:15:00Z",
  },
  {
    id: "5",
    coarse_name: "Digital Marketing",
    price: 550,
    total_materi: 10,
    trainer: "Emily Collins",
    updated_at: "2025-03-28T08:20:00Z",
  },
  {
    id: "6",
    coarse_name: "Product Strategy",
    price: 700,
    total_materi: 14,
    trainer: "Brian Kim",
    updated_at: "2025-03-28T08:25:00Z",
  },
];

export const columns = [
  { name: "Nama Pelatihan", uid: "coarse_name" },
  { name: "Harga", uid: "price" },
  { name: "Total Materi", uid: "total_materi" },
  { name: "Trainer", uid: "trainer" },
  { name: "Update date", uid: "updated_at" },
  { name: "", uid: "actions" },
];

export default function TableMateri() {
  const [page, setPage] = React.useState(1);
  const rowsPerPage = 10;

  const pages = Math.ceil(items.length / rowsPerPage);

  const data = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return items.slice(start, end);
  }, [page, items]);

  const renderCell = React.useCallback((user, columnKey) => {
    const cellValue = user[columnKey];

    switch (columnKey) {
      case "price":
        return (
          <div className="flex gap-3 items-center">
            <span>Rp{cellValue}</span>
          </div>
        );
      case "total_materi":
        return (
          <div className="flex gap-3 items-center">
            <span>{cellValue} Topik</span>
          </div>
        );
      case "trainer":
        return (
          <div className="flex gap-3 items-center">
            <Avatar
              size="sm"
              src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
            />
            <span>{cellValue}</span>
          </div>
        );
      case "actions":
        return (
          <div className="relative flex justify-end items-center gap-2">
            <Dropdown>
              <DropdownTrigger>
                <Button
                  size="sm"
                  endContent={<IoMdArrowDropdown size={16} />}
                  variant="bordered"
                  color="secondary"
                  className="border-1 border-slate-300"
                >
                  Actions
                </Button>
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem key="view">View</DropdownItem>
                <DropdownItem key="edit">Edit</DropdownItem>
                <DropdownItem key="delete">Delete</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  return (
    <Table
      aria-label="Example table with client side pagination"
      bottomContent={
        <div className="flex w-full mb-4 justify-center">
          <Pagination
            isCompact
            showControls
            showShadow
            color="secondary"
            page={page}
            total={pages}
            onChange={(page) => setPage(page)}
          />
        </div>
      }
      classNames={{
        wrapper: "gap-8 overflow-hidden shadow-none p-0",
        td: "py-4 border-b-1",
      }}
    >
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.uid === "actions" ? "center" : "start"}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody emptyContent={"No items found"} items={data}>
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
