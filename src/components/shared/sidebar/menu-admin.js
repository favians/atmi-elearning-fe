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
import { ManagementNotificationIcon } from "@/assets/icons/sidebar/management-notification-icon";
import { ManagementNotificationIconActive } from "@/assets/icons/sidebar/management-notification-icon-active";

export const MenuAdmin = () => {
  const paths = usePathname();
  return (
    <div className={Sidebar.Body()}>
      <SidebarTitle
        key={1}
        title="DASHBOARD"
        items={[
          <SidebarItem
            key={1}
            title="Manajemen User"
            icon={<ManagementUserIcon />}
            iconActive={<ManagementUserIcon />}
            isActive={paths?.includes("/admin/user")}
            items={[
              <SidebarItem
                key={1}
                title="Trainee"
                isActive={paths?.includes("/admin/management-user/trainee")}
                href="/admin/management-user/trainee"
              />,
              <SidebarItem
                key={2}
                title="Trainer"
                isActive={paths?.includes("/admin/management-user/trainer")}
                href="/admin/management-user/trainer"
              />,
              <SidebarItem
                key={3}
                title="Admin"
                isActive={paths?.includes("/admin/management-user/admin")}
                href="/admin/management-user/admin"
              />,
            ]}
          />,
          <SidebarItem
            key={2}
            title="Manajemen Materi"
            icon={<TrainingIcon />}
            iconActive={<TrainingIconActive />}
            isActive={paths?.includes("/admin/management-materi")}
            href="/admin/management-materi"
          />,
          <SidebarItem
            key={3}
            title="Manajemen Sertifikat"
            icon={<CertificateIcon />}
            iconActive={<CertificateIconActive />}
            isActive={paths?.includes("/admin/management-certificate")}
            href="/admin/management-certificate"
          />,
          <SidebarItem
            key={4}
            title="Kuisioner"
            icon={<KuisionerIcon />}
            iconActive={<KuisionerIconActive />}
            isActive={paths?.includes("/admin/questionnaire")}
            href="/admin/questionnaire"
          />,
          <SidebarItem
            key={5}
            title="Manajemen Notifikasi"
            icon={<ManagementNotificationIcon />}
            iconActive={<ManagementNotificationIconActive />}
            isActive={paths?.includes("/admin/management-notification")}
            href="/admin/management-notification"
          />,
        ]}
      />
    </div>
  );
};
