import React from "react";
import { SidebarItem } from "./sidebar-item";
import { TrainingIcon } from "@/assets/icons/sidebar/training-icon";
import { TrainingIconActive } from "@/assets/icons/sidebar/training-icon-active";
import { usePathname } from "next/navigation";
import { Sidebar } from "./sidebar.styles";
import { SidebarTitle } from "./sidebar-title";
import { CertificateIconActive } from "@/assets/icons/sidebar/certificate-icon-active";
import { CertificateIcon } from "@/assets/icons/sidebar/certificate-icon";
import { ManagementUserIcon } from "@/assets/icons/sidebar/management-user-icon";
import { KuisionerIcon } from "@/assets/icons/sidebar/kuisioner-icon";
import { KuisionerIconActive } from "@/assets/icons/sidebar/kuisioner-icon-active";
import { useGetProfile } from "@/hooks/trainee/useGetProfile";

export const MenuAdmin = () => {
  const paths = usePathname();
  const { data, isLoading } = useGetProfile();
  const permissionMap = data?.data?.permission_map || {};
  const canAccess = (module) => {
    return permissionMap?.[module]?.actions?.get === true;
  };
  return (
    <div className={Sidebar.Body()}>
      <SidebarTitle
        title="DASHBOARD"
        items={[
          // MANAGEMENT USER
          (canAccess("trainee") ||
            canAccess("trainer") ||
            canAccess("admin")) && (
            <SidebarItem
              key="management-user"
              title="Manajemen User"
              icon={<ManagementUserIcon />}
              iconActive={<ManagementUserIcon />}
              isActive={paths?.includes("/admin/management-user")}
              defaultExpandedKeys={
                paths?.includes("/admin/management-user") ? ["1"] : []
              }
              items={[
                canAccess("trainee") && (
                  <SidebarItem
                    key="trainee"
                    title="Trainee"
                    isActive={paths?.includes("/admin/management-user/trainee")}
                    href="/admin/management-user/trainee"
                  />
                ),

                canAccess("trainer") && (
                  <SidebarItem
                    key="trainer"
                    title="Trainer"
                    isActive={paths?.includes("/admin/management-user/trainer")}
                    href="/admin/management-user/trainer"
                  />
                ),

                canAccess("admin") && (
                  <SidebarItem
                    key="admin"
                    title="Admin"
                    isActive={paths?.includes("/admin/management-user/admin")}
                    href="/admin/management-user/admin"
                  />
                ),
              ].filter(Boolean)}
            />
          ),

          // MANAGEMENT MATERI
          canAccess("training") && (
            <SidebarItem
              key="training"
              title="Manajemen Materi"
              icon={<TrainingIcon />}
              iconActive={<TrainingIconActive />}
              isActive={paths?.includes("/admin/management-materi")}
              href="/admin/management-materi"
            />
          ),

          // CERTIFICATE
          canAccess("certificate trainee") && (
            <SidebarItem
              key="certificate"
              title="Manajemen Sertifikat"
              icon={<CertificateIcon />}
              iconActive={<CertificateIconActive />}
              isActive={paths?.includes("/admin/management-certificate")}
              href="/admin/management-certificate"
            />
          ),

          // QUESTIONNAIRE
          canAccess("questionnaire template") && (
            <SidebarItem
              key="questionnaire"
              title="Kuisioner"
              icon={<KuisionerIcon />}
              iconActive={<KuisionerIconActive />}
              isActive={paths?.includes("/admin/questionnaire")}
              href="/admin/questionnaire"
            />
          ),
          // <SidebarItem
          //   key={5}
          //   title="Manajemen Notifikasi"
          //   icon={<ManagementNotificationIcon />}
          //   iconActive={<ManagementNotificationIconActive />}
          //   isActive={paths?.includes("/admin/management-notification")}
          //   href="/admin/management-notification"
          // />,
        ].filter(Boolean)}
      />
    </div>
  );
};
