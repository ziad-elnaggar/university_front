import React from 'react'
import CourseList from './CourseList'

const StudentDashboard = () => {
  return (
    <>
        <div>StudentDashboard</div>
        <CourseList roles={{canAdd: false, canEdit: false, canDelete: false, canShowStudents: false, canSchedule: true}} />
    </>
  )
}

export default StudentDashboard