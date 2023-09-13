'use client'

import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import CourseList from './CourseList'

const AdminDashboard = () => {
  const router = useRouter()

  useEffect(() => {
    if(!localStorage.getItem('token') || !(localStorage.getItem('role') === 'Admin'))
      router.push('/admin/login')
  })
  return (
    <>
      <CourseList roles={{canAdd: true, canEdit: true, canDelete: true, canShowStudents: true, canSchedule: false}} />
    </>
  )
}

export default AdminDashboard