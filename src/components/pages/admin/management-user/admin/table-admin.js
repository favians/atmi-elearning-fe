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
export const users = [
  {
    key: "1",
    name: "Tony Reichert",
    role: "CEO",
    status: "Active",
    email: "tony.reichert@example.com",
    phone: "(123) 456-7890",
    training: "Leadership Training",
    admin: true,
    created_at: "2025-03-28T08:00:00Z",
    creator: "System",
  },
  {
    key: "2",
    name: "Zoey Lang",
    role: "Technical Lead",
    status: "Paused",
    email: "zoey.lang@example.com",
    phone: "(987) 654-3210",
    training: "Advanced Coding",
    admin: false,
    created_at: "2025-03-28T08:05:00Z",
    creator: "Admin",
  },
  {
    key: "3",
    name: "Jane Fisher",
    role: "Senior Developer",
    status: "Active",
    email: "jane.fisher@example.com",
    phone: "(456) 789-0123",
    training: "Agile Development",
    admin: false,
    created_at: "2025-03-28T08:10:00Z",
    creator: "Admin",
  },
  {
    key: "4",
    name: "William Howard",
    role: "Community Manager",
    status: "Vacation",
    email: "william.howard@example.com",
    phone: "(321) 654-9870",
    training: "Public Relations",
    admin: false,
    created_at: "2025-03-28T08:15:00Z",
    creator: "System",
  },
  {
    key: "5",
    name: "Emily Collins",
    role: "Marketing Manager",
    status: "Active",
    email: "emily.collins@example.com",
    phone: "(555) 123-4567",
    training: "Digital Marketing",
    admin: false,
    created_at: "2025-03-28T08:20:00Z",
    creator: "Admin",
  },
  {
    key: "6",
    name: "Brian Kim",
    role: "Product Manager",
    status: "Active",
    email: "brian.kim@example.com",
    phone: "(777) 987-6543",
    training: "Product Strategy",
    admin: true,
    created_at: "2025-03-28T08:25:00Z",
    creator: "System",
  },
];

export const columns = [
  { name: "Nama", uid: "name" },
  { name: "Label Admin", uid: "name" },
  { name: "Email", uid: "email" },
  { name: "Dibuat", uid: "created_at" },
  { name: "Pembuat", uid: "creator" },
  { name: "", uid: "actions" },
];

export default function TableAdmin() {
  const [page, setPage] = React.useState(1);
  const rowsPerPage = 10;

  const pages = Math.ceil(users.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return users.slice(start, end);
  }, [page, users]);

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
      <TableBody emptyContent={"No users found"} items={items}>
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
