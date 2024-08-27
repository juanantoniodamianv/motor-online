import { SupabaseClient } from "@supabase/supabase-js";
import Image from "next/image";
import type { Publication } from "../../types";
import { getFiles, getPublicUrl } from "../../utils/supabase/storage";

type PublicationProps = {
  publication: Publication;
  supabase: SupabaseClient;
};

export default async function Publication({
  publication,
  supabase,
}: PublicationProps) {
  const files = await getFiles(supabase, publication.id);
  const fileUrl = await getPublicUrl(supabase, files[0]);

  return (
    <div className="group relative w-64" key={publication.id}>
      <div className="aspect-video w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75">
        <Image
          src={fileUrl}
          width={415}
          height={224}
          alt="Publication image"
          className="object-cover object-center w-full h-full"
        />
      </div>
      <div className="mt-4 flex justify-between gap-4">
        <div>
          <h3 className="text-sm text-gray-700">
            <a href="#">
              <span aria-hidden="true" className="absolute inset-0"></span>
              {publication.title}
            </a>
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            {publication.vehicle_makes.name} · {publication.vehicle_models.name}
          </p>
        </div>
        <p className="text-sm font-medium dark:text-white text-black">
          ${publication.price}
        </p>
      </div>
    </div>
  );
}
