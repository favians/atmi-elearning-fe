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
import { Button } from "@heroui/button";
import { Spinner } from "@heroui/spinner";
import FilterTrainee from "./filter-trainer";
import { useGetTrainer } from "@/hooks/admin/useGetTrainer";
import { useRouter } from "next/navigation";

export const columns = [
  { name: "Nama User", uid: "full_name" },
  { name: "Email", uid: "email" },
  { name: "Nomor Telepon", uid: "phone" },
  { name: "Keahlian", uid: "job" },
  { name: "", uid: "actions" },
];

export default function TableTrainer() {
  const router = useRouter();
  const [filter, setFilter] = React.useState({
    page: 1,
    name_search: "",
    order_rule: "DESC",
  });
  const { data, isLoading } = useGetTrainer({
    params: {
      limit: 10,
      page: filter?.page,
      name_search: filter?.name_search,
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
    return <FilterTrainee onValueChange={onValueChange} />;
  });

  const renderCell = React.useCallback((user, columnKey) => {
    const cellValue = user[columnKey];
    switch (columnKey) {
      case "actions":
        return (
          <div className="relative flex justify-end items-center gap-2">
            <Button
              size="sm"
              variant="bordered"
              color="secondary"
              className="border-1 border-slate-300"
              onPress={() =>
                router.push(`/admin/management-user/trainer/edit/${user?.id}`)
              }
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
        emptyContent={"No users found"}
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
