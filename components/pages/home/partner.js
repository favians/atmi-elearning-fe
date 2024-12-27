import { title } from "@/components/primitives";
import Section from "@/layouts/section";
import { Image } from "@nextui-org/image";
import React from "react";

export default function Partner() {
  return (
    <Section wrapperClass="p-16 flex items-center flex-col">
      <h1
        className={title({
          class: "text-center mx-auto font-semibold",
          size: "sm",
        })}
      >
        Telah bekerja sama dengan berbagai <br />
        perusahaan dan akademisi terkemuka di Indonesia
      </h1>
      <div className="flex w-2/3 flex-wrap gap-10 justify-center items-center   mt-8">
        <Image
          alt="Card background"
          className="rounded-xl mb-1"
          src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Cakap_Logo.png"
          height={56}
        />
        <Image
          alt="Card background"
          className="rounded-xl mb-1"
          src="https://upload.wikimedia.org/wikipedia/id/a/a2/Logo_Binus_University.png"
          height={56}
        />
        <Image
          alt="Card background"
          className="rounded-xl mb-1"
          src="https://karirlab-prod-bucket.s3.ap-southeast-1.amazonaws.com/files/privates/anLAosQJlodXYAD7OiDo8OmNAUqFkjbsFx0cZON7.png"
          height={56}
        />

        <Image
          alt="Card background"
          className="rounded-xl mb-1"
          src="https://upload.wikimedia.org/wikipedia/id/thumb/6/62/Logo-UMN-e1634700898276.png/800px-Logo-UMN-e1634700898276.png"
          height={56}
        />

        <Image
          alt="Card background"
          className="rounded-xl mb-1"
          src="https://www.umm.ac.id/files/image/Logo_umm.png"
          height={56}
        />
        <Image
          alt="Card background"
          className="rounded-xl mb-1"
          src="https://diskominfo.bone.go.id/wp-content/uploads/2021/07/cropped-logo-kominfo.jpg"
          height={56}
        />
        <Image
          alt="Card background"
          className="rounded-xl mb-1"
          src="https://unmer.ac.id/wp-content/uploads/2022/12/Unmer_Small-300x296.png"
          height={56}
        />
        <Image
          alt="Card background"
          className="rounded-xl mb-1"
          src="https://karirlab-prod-bucket.s3.ap-southeast-1.amazonaws.com/files/privates/OJnft3gpe7ref3Ah1A1KQHjtbyeqr6n3G8qyqgyx.png"
          height={56}
        />
        <Image
          alt="Card background"
          className="rounded-xl mb-1"
          src="https://lelogama.go-jek.com/cms_editor/2021/05/28/info-gojek-2.png"
          height={56}
        />
        <Image
          alt="Card background"
          className="rounded-xl mb-1"
          src="https://seeklogo.com/images/T/tokopedia-logo-40654CCDD6-seeklogo.com.png"
          height={56}
        />
      </div>
    </Section>
  );
}
