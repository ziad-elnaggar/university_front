'use client'

import { sendPatchReq, sendPostReq } from '@/core/api.crud';
import { Course } from '@/core/types';
import React, { useEffect, useState } from 'react';
import useSWRMutation from 'swr/mutation';

export interface Dialog {
    isOpen: boolean;
    onClose: () => void;
    course: Course | null;
    refetchData: () => void;
}

const CourseDialog = ({ isOpen, onClose, course, refetchData }: Dialog) => {
  const [formData, setFormData] = useState(course ? course : { name: '', credit_hours: '' });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const { trigger: addCourse } = useSWRMutation('courses', sendPostReq, {
    onSuccess() {
        refetchData()
    }
  })
  const { trigger: editCourse } = useSWRMutation(`admin/course/${course?.id}`, sendPatchReq, {
    onSuccess() {
        refetchData()
    }
  })

  const handleSubmit = () => {
    if(course) {
        editCourse({ name: formData.name, credit_hours: +formData.credit_hours })
    } else {
        addCourse({...formData, credit_hours: +formData.credit_hours})
    }
    onClose();
  };

  useEffect(() => {
    if(course) setFormData(course)
    else setFormData({ name: '', credit_hours: '' })
    
  }, [course])
  return (
    <div className={`modal ${isOpen ? 'show' : ''}`} role="dialog" style={{ display: isOpen ? 'block' : 'none' }}>
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{course ? 'Edit Course' : 'Add Course'}</h5>
          </div>
          <div className="modal-body">
            <form>
              <div className="mb-3">
                <label htmlFor="name">Course Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="credit_hours">Credit Hours</label>
                <input
                  type="number"
                  className="form-control"
                  id="credit_hours"
                  name="credit_hours"
                  value={formData.credit_hours}
                  onChange={handleChange}
                />
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Close
            </button>
            <button type="button" className="btn btn-primary" onClick={handleSubmit}>
              {course ? 'Edit' : 'Add'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDialog;
