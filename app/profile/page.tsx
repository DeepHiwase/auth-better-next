import { ReturnButton } from "@/components/return-btn";
import { SignOutButton } from "@/components/sign-out-btn";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const headersList = await headers();
  const session = await auth.api.getSession({
    headers: headersList,
  });

  if (!session) {
    // return <p className="text-destructive">Unauthorized</p>;
    return redirect("/auth/login"); // if some how pass middleware/proxy, this will ensure to protect this route
  }

  const FULL_POST_ACCESS = await auth.api.userHasPermission({
    headers: headersList,
    body: {
      // userId: session.user.id, // you can use just pass headers instead of this, both works
      permissions: {
        posts: ["update", "delete"],
      },
    },
  });

  return (
    <div className="px-8 py-16 container mx-auto max-w-5xl space-y-8">
      <div className="space-y-8">
        <ReturnButton href="/" label="Home" />

        <h1 className="text-3xl font-bold">Profile</h1>
      </div>

      <div className="flex items-center gap-2">
        {session.user.role === "ADMIN" && (
          <Button size={"sm"} asChild>
            <Link href={"/admin/dashboard"}>Admin Dashboard</Link>
          </Button>
        )}

        <SignOutButton />
      </div>

      <div className="text-2xl font-bold">Permissions</div>

      <div className="space-x-4">
        <Button size={"sm"}>MANAGE OWN POSTS</Button>
        <Button size={"sm"} disabled={!FULL_POST_ACCESS.success}>
          MANAGE ALL POSTS
        </Button>
      </div>

      <pre className="text-sm overflow-clip">
        {JSON.stringify(session, null, 2)}
      </pre>
    </div>
  );
}
