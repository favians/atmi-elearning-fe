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
import { Spinner } from "@heroui/spinner";
import { useGetCertificate } from "@/hooks/admin/useGetCertificate";
import FilterCertificate from "./filter-certificate";

export const columns = [
  { name: "Terbit", uid: "assign_date" },
  { name: "Nama Trainee", uid: "name" },
  { name: "Email", uid: "email" },
  { name: "Pelatihan", uid: "training" },
  { name: "Pembuat", uid: "created_by" },
  { name: "", uid: "actions" },
];

export default function TableTrainee() {
  const [filter, setFilter] = React.useState({
    page: 1,
    name_search: "",
    order_rule: "DESC",
  });
  const { data, isLoading } = useGetCertificate({
    params: {
      limit: 10,
      page: filter?.page,
      is_active: true,
      order_by: "id",
      order_rule: filter?.order_rule,
    },
  });

  const onValueChange = React.useCallback(
    (value) => {
      setFilter({ ...filter, ...value });
    },
    [filter],
  );

  const topContent = React.useMemo(() => {
    return <FilterCertificate onValueChange={onValueChange} />;
  });

  const renderCell = React.useCallback((user, columnKey) => {
    const cellValue = user[columnKey];

    switch (columnKey) {
      case "name":
        return <span>{user?.trainee_data?.full_name}</span>;
      case "email":
        return <span>{user?.trainee_data?.email}</span>;
      case "actions":
        return (
          <div
            onPress={() =>
              router.push(`/admin/management-certificate/edit/${user?.id}`)
            }
            className="relative flex justify-end items-center gap-2"
          >
            <Button
              size="sm"
              variant="bordered"
              color="secondary"
              className="border-1 border-slate-300"
            >
              Edit
            </Button>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  return (
    <Table
      aria-label="Example table with client side pagination"
      topContent={topContent}
      bottomContent={
        <div className="flex w-full mb-4 justify-center">
          <Pagination
            isCompact
            showControls
            showShadow
            color="secondary"
            page={filter?.page}
            total={data?.pagination?.page_total}
            onChange={(val) => onValueChange({ page: val })}
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
      <TableBody
        emptyContent={"No certificate found"}
        items={data?.data || []}
        isLoading={isLoading}
        loadingContent={<Spinner />}
      >
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
