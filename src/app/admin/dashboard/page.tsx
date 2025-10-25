// app/admin/dashboard/page.tsx
'use client';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { AdminDashboard } from '@/components/AdminDashboard/AdminDashboard';

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <AdminDashboard />
    </ProtectedRoute>
  );
}