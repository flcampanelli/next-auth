"use client";

import { useSession } from "next-auth/react";

export function ClientComponentAuth() {
  const session = useSession();

  return (
    <>
      {session?.data && (
        <div className="bg-slate-50 border gap-2 w-full h-60 max-w-md break-all flex flex-col items-center">
          <h2>Client component</h2>
          {JSON.stringify(session)}
        </div>
      )}
    </>
  );
}
