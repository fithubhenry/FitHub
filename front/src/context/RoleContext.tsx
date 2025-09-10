"use client";
import { createContext, useContext, useState, ReactNode } from "react";

export type Role = "guest" | "registered" | "premium";

type Ctx = { role: Role; setRole: (r: Role) => void };
const RoleCtx = createContext<Ctx | null>(null);

export function RoleProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<Role>("guest"); // invitado por defecto
  return <RoleCtx.Provider value={{ role, setRole }}>{children}</RoleCtx.Provider>;
}

export const useRole = () => useContext(RoleCtx)!;
