import React from "react";
import { SidebarItem } from "./sidebar-item";
import { TrainingIcon } from "@/assets/icons/sidebar/training-icon";
import { TrainingIconActive } from "@/assets/icons/sidebar/training-icon-active";
import { usePathname } from "next/navigation";
import { Sidebar } from "./sidebar.styles";
import { SidebarTitle } from "./sidebar-title";
import { CertificateIconActive } from "@/assets/icons/sidebar/certificate-icon-active";
import { ProfileIcon } from "@/assets/icons/sidebar/profile-icon";
import { ProfileIconActive } from "@/assets/icons/sidebar/profile-icon-active";
import { ContactIcon } from "@/assets/icons/sidebar/contact-icon";
import { CertificateIcon } from "@/assets/icons/sidebar/certificate-icon";

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
            isActive={paths?.includes("/dashboard/training")}
            href="/dashboard/training"
          />,
          <SidebarItem
            key={1}
            title="Sertifikat"
            icon={<CertificateIcon />}
            iconActive={<CertificateIconActive />}
            isActive={paths?.includes("/dashboard/certificate")}
            href="/dashboard/certificate"
          />,
        ]}
      />

      <SidebarTitle
        title="SETTING"
        items={[
          <SidebarItem
            key={1}
            title="Profil"
            icon={<ProfileIcon />}
            iconActive={<ProfileIconActive />}
            isActive={paths?.includes("/dashboard/profile")}
            href="/dashboard/profile"
          />,
        ]}
      />

      <SidebarTitle
        title="HELP"
        items={[
          <SidebarItem
            key={1}
            title="Hubungi Kami"
            icon={<ContactIcon />}
            iconActive={<ContactIcon />}
            isActive={paths?.includes("/dashboard/setting")}
            href=""
            onClick={() => {
              const phoneNumber = "+6283834493118"; // Replace with actual phone number
              const message = "Hello, I'm interested!";
              const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
              window.open(whatsappUrl, "_blank");
            }}
          />,
        ]}
      />
    </div>
  );
};
