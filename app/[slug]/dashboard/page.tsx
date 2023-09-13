import AdminDashboard from '@/components/Dashboard/AdminDashboard'
import StudentDashboard from '@/components/Dashboard/StudentDashboard'
import React from 'react'

const DashboardPage = ({ params }: { params: { slug: string } }) => {
  return (
    <>
        {params.slug === 'admin' ? <AdminDashboard /> : null}
        {params.slug === 'student' ? <StudentDashboard /> : null}
    </>
  )
}

export default DashboardPage