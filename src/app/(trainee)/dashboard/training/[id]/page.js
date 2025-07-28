"use client";
import { SidebarTraining } from "@/components/pages/dashboard/training/sidebar-training";
import { TrainingContent } from "@/components/pages/dashboard/training/training-content";

import { NavbarWrapper } from "@/components/shared/navbar/navbar";
import { ModuleProvider } from "@/context/module-context";
import { useGetTrainingDetail } from "@/hooks/trainee/useGetTrainingDetail";
import { useParams } from "next/navigation";

export default function TrainingDetailPage() {
  const params = useParams();
  const { data, isLoading } = useGetTrainingDetail({
    params: { training_id: params?.id },
  });
  return (
    <ModuleProvider>
      <NavbarWrapper></NavbarWrapper>
      <div className="relative flex min-h-screen bg-gray-100  overflow-y-auto overflow-x-hidden">
        <SidebarTraining data={data} isLoading={isLoading} />
        <TrainingContent data={data} />
      </div>
    </ModuleProvider>
  );
}
