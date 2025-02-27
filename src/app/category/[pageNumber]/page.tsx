import React from "react";

type Props = {};

async function Page({ params }: { params: Promise<{ pageNumber: string }> }) {
  const pageNumber = (await params).pageNumber;
  return <div>My Post: {}</div>;
}

export default Page;
