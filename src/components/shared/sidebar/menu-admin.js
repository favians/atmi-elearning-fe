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
  const { data } = useGetProfile();

  const profile = data?.data;
  const role = profile?.role;
  const permissionMap = profile?.permission_map || {};

  /**
   * central access control
   */
  const canAccess = (module) => {
    // SUPER ADMIN → akses semua
    if (role === "SUPER_ADMIN") return true;

    // ADMIN → akses terbatas
    if (role === "ADMIN") {
      const allowedModules = [
        "trainee",
        "trainer",
        "certificate trainee",
        "questionnaire template",
      ];
      return allowedModules.includes(module);
    }

    // default → pakai permission_map
    return permissionMap?.[module]?.actions?.get === true;
  };

  return (
    <div className={Sidebar.Body()}>
      <SidebarTitle
        title="DASHBOARD"
        items={[
          /**
           * MANAGEMENT USER
           */
          (canAccess("trainee") || canAccess("trainer")) && (
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

          /**
           * MANAGEMENT MATERI → SUPER_ADMIN only
           */
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

          /**
           * CERTIFICATE → ADMIN + SUPER_ADMIN
           */
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

          /**
           * QUESTIONNAIRE → SUPER_ADMIN only
           */
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
        ].filter(Boolean)}
      />
    </div>
  );
};
