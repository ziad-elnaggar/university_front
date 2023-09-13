import { Course } from '@/core/types'
import React from 'react'

const ShowStudents = ({ course, isOpen, onClose }: { course: Course; isOpen: boolean; onClose: () => void; }) => {
  return (
    <div className={`modal ${isOpen ? 'show' : ''}`} role="dialog" style={{ display: isOpen ? 'block' : 'none' }}>
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{course ? 'Edit Course' : 'Add Course'}</h5>
          </div>
          <div className="modal-body">
            {course.students.map((st) => {
                return <p key={st.id}>{st.name}</p>
            })}
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ShowStudents