import { getCurrentUser } from "@/lib/session";

export default async function ServerComponentAuth() {
  const user = await getCurrentUser();

  return (
    <>
      {user !== undefined && (
        <div className="bg-slate-500 text-white gap-2 h-60 max-w-md break-all flex flex-col items-center">
          <h2>Server component</h2>
          {JSON.stringify(user)}
        </div>
      )}
    </>
  );
}
