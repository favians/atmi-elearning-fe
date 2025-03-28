import React from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
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
export const items = [
  {
    id: "1",
    published_date: "2025-03-28T08:00:00Z",
    trainee_name: "John Doe",
    email: "john.doe@example.com",
    training: "Leadership Training",
    created_by: "Tony Reichert",
  },
  {
    id: "2",
    published_date: "2025-03-28T08:05:00Z",
    trainee_name: "Jane Smith",
    email: "jane.smith@example.com",
    training: "Advanced Coding",
    created_by: "Zoey Lang",
  },
  {
    id: "3",
    published_date: "2025-03-28T08:10:00Z",
    trainee_name: "Michael Brown",
    email: "michael.brown@example.com",
    training: "Agile Development",
    created_by: "Jane Fisher",
  },
  {
    id: "4",
    published_date: "2025-03-28T08:15:00Z",
    trainee_name: "Emily Davis",
    email: "emily.davis@example.com",
    training: "Public Relations",
    created_by: "William Howard",
  },
  {
    id: "5",
    published_date: "2025-03-28T08:20:00Z",
    trainee_name: "Chris Wilson",
    email: "chris.wilson@example.com",
    training: "Digital Marketing",
    created_by: "Emily Collins",
  },
  {
    id: "6",
    published_date: "2025-03-28T08:25:00Z",
    trainee_name: "Sarah Johnson",
    email: "sarah.johnson@example.com",
    training: "Product Strategy",
    created_by: "Brian Kim",
  },
];

export const columns = [
  { name: "Terbit", uid: "published_date" },
  { name: "Nama Trainee", uid: "trainee_name" },
  { name: "Email", uid: "email" },
  { name: "Pelatihan", uid: "training" },
  { name: "Pembuat", uid: "created_by" },
  { name: "", uid: "actions" },
];

export default function TableCertificate() {
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
                  Details
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
