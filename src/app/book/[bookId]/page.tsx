import React from "react";

type Props = {
  params: Promise<{ bookId: string }>;
};

async function page({ params }: Props) {
  const bookId = Number((await params).bookId);
  console.log(bookId);

  return <div>page</div>;
}

export default page;
