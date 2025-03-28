"use client";
import ProfileForm from "@/components/pages/dashboard/profile/profile-form";
import { headline } from "@/components/primitives";
import { DashboardLayout } from "@/layouts/dashboard-layout";

export default function SettingPage() {
  return (
    <DashboardLayout>
      <section className="flex flex-col justify-center gap-4 p-6">
        <div className="inline-block max-w-lg justify-center">
          <h1 className={headline({})}>Profil Saya</h1>
        </div>
      </section>
      <div className="flex bg-white flex-wrap flex-grow flex-col">
        <ProfileForm />
      </div>
    </DashboardLayout>
  );
}
