import React from "react";
import { SidebarItem } from "./sidebar-item";
import { TrainingIcon } from "@/assets/icons/sidebar/training-icon";
import { TrainingIconActive } from "@/assets/icons/sidebar/training-icon-active";
import { usePathname } from "next/navigation";
import { Sidebar } from "./sidebar.styles";
import { SidebarTitle } from "./sidebar-title";

export const Menu = () => {
  const paths = usePathname();
  return (
    <div className={Sidebar.Body()}>
      <SidebarTitle
        title="DASHBOARD"
        items={[
          <SidebarItem
            key={1}
            title="Pelatihan Saya"
            icon={<TrainingIcon />}
            iconActive={<TrainingIconActive />}
            isActive={paths?.includes("/dashboard")}
            href="/dashboard"
          />,
          <SidebarItem
            key={1}
            title="Sertifikat"
            icon={<TrainingIcon />}
            iconActive={<TrainingIconActive />}
            isActive={paths?.includes("/dashboard/sertifikat")}
            href="/dashboard/sertifikat"
          />,
        ]}
      />

      <SidebarTitle
        title="SETTING"
        items={[
          <SidebarItem
            key={1}
            title="Profil"
            icon={<TrainingIcon />}
            iconActive={<TrainingIconActive />}
            isActive={paths?.includes("/dashboard/setting")}
            href="/dashboard/setting"
          />,
        ]}
      />

      {/* <SidebarItem
            isActive={paths?.includes('/admin/manajemen-pengingat')}
            title='Manajemen Pengingat'
            icon={<NotificationIcon />}
            iconActive={<NotificationIconActive />}
            href='/admin/manajemen-pengingat'
          /> */}
    </div>
  );
};
