"use client";
import { SidebarTraining } from "@/components/pages/dashboard/training/sidebar-training";
import { TrainingContent } from "@/components/pages/dashboard/training/training-content";
import { PDFViewer } from "@/components/pdf-viewer";
import { headline } from "@/components/primitives";
import { NavbarWrapper } from "@/components/shared/navbar/navbar";
import VideoViewer from "@/components/video-viewer";
export default function TrainingDetailPage() {
  return (
    <>
      <NavbarWrapper></NavbarWrapper>
      <div className="relative flex min-h-screen bg-gray-100  overflow-y-auto overflow-x-hidden">
        <SidebarTraining />
        <div className="flex ml-[320px] mt-16 flex-col flex-1 gap-6 py-6">
          <div className="flex flex-wrap flex-grow flex-col rounded-md bg-white mx-6">
            <PDFViewer url="https://pslb3.menlhk.go.id/internal/uploads/pengumuman/1545111808_contoh-pdf.pdf" />
            {/* <VideoViewer url="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" /> */}
          </div>
          <div className="flex flex-wrap flex-grow flex-col rounded-md bg-white mx-6 p-4">
            <TrainingContent />
          </div>
        </div>
      </div>
    </>
  );
}
