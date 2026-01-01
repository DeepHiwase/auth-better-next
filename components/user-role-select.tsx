"use client";

import { admin } from "@/lib/auth-client";
import { UserRole } from "@/lib/generated/prisma/enums";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";

interface UserRoleSelectProps {
  userId: string;
  role: UserRole;
}

export const UserRoleSelect = ({ userId, role }: UserRoleSelectProps) => {
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  async function handleChange(evnt: React.ChangeEvent<HTMLSelectElement>) {
    const newRole = evnt.target.value as UserRole;

    const canChangeRole = await admin.hasPermission({
      // no need to pass headers as we are already on client -> so has access to cookies
      permissions: {
        user: ["set-role"],
      },
    });

    if (!canChangeRole.data?.success) {
      return toast.error("Forbidden");
    }

    await admin.setRole({
      userId,
      role: newRole,
      fetchOptions: {
        // this looks similer to React Query
        onRequest: () => {
          setIsPending(true);
        },
        onResponse: () => {
          setIsPending(false);
        },
        onError: (ctx) => {
          toast.error(ctx.error.message);
        },
        onSuccess: () => {
          toast.success("User role updated.");
          router.refresh();
        },
      },
    });
  }

  return (
    <select
      name=""
      id=""
      value={role}
      onChange={handleChange}
      disabled={role === "ADMIN" || isPending}
      className="px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-50"
    >
      <option value="ADMIN">ADMIN</option>
      <option value="USER">USER</option>
    </select>
  );
};
