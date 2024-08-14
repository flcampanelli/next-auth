"use client";

import { useSession } from "next-auth/react";

export default function ClientComponentAuth() {
  const session = useSession();

  return (
    <>
      {session?.data && (
        <div className="bg-slate-50 border gap-2 h-60 max-w-md break-all flex flex-col items-center">
          <h2>Client component</h2>
          {JSON.stringify(session)}
        </div>
      )}
    </>
  );
}
