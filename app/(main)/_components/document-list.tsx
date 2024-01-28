"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useQuery } from "convex/react";
import { FileIcon } from "lucide-react";

import { Doc, Id } from "@/convex/_generated/dataModel";
import { api } from "@/convex/_generated/api";
import { cn } from "@/lib/utils";

import { Item } from "./item";

interface DocumentListProps {
  data?: Doc<"documents">[];
}

export const DocumentList = () => {
  const params = useParams();
  const router = useRouter();

  const documents = useQuery(api.documents.getSidebar, {});

  const onRedirect = (documentId: string) => {
    router.push(`/documents/${documentId}`);
  };

  if (documents === undefined) {
    return (
      <>
        <Item.Skeleton />
      </>
    );
  };

  return (
    <>
      {documents.map((document) => (
          <div key={document._id}>
            <Item
                id={document._id}
                onClick={() => onRedirect(document._id)}
                label={document.title}
                icon={FileIcon}
                documentIcon={document.icon}
                active={params.documentId === document._id}
            />
          </div>
      ))}
    </>
  );
};
