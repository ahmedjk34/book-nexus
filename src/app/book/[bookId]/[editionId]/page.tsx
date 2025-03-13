import React from "react";

type Props = {
  params: Promise<{ bookId: string; editionId: string }>;
};

async function page({ params }: Props) {
  const par = await params;
  const { bookId, editionId } = par;
  console.log(bookId, editionId);

  return <div>page</div>;
}

export default page;
