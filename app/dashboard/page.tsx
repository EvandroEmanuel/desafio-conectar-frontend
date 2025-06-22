"use client"

import AdminUsers from "@/admin-users"
import { Layout } from "@/components/layout"
import { useUsuarios } from "@/hooks/useUsuarios";


export default function Page() {
  return (
    <Layout>
      <AdminUsers />
    </Layout>
  )
}
