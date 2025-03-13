import { getMostPopularEdition } from "@/util/APIUtil";
import { redirect } from "next/navigation";
import React from "react";

type Props = {
  params: Promise<{ bookId: string }>;
};

//The whole purpose of this page is to redirect if the user only entered a work id
//! Add a more intuitive way with proper loading!
async function page({ params }: Props) {
  const { bookId } = await params;
  const mostPopularEdition = await getMostPopularEdition(bookId);
  return redirect(`/book/${bookId}/${mostPopularEdition?.key.split("/")[2]}`);
}

export default page;
