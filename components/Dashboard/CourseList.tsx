'use client'

import React, { useState } from 'react';
import CourseDialog from './CourseDialog';
import { Course } from '@/core/types';
import useSWR from 'swr'
import useSWRMutation from 'swr/mutation';
import { sendDeleteReq, sendGetReq, sendPostNoDataReq, sendPostReq } from '@/core/api.crud';
import ConfirmDialog from './ConfirmModal';
import Schedule from './Schedule';
import Table from '../Table/Table';
import ShowStudents from './ShowStudents';

interface Roles {
    canAdd: boolean;
    canEdit: boolean;
    canDelete: boolean;
    canShowStudents: boolean;
    canSchedule: boolean;
}

const CourseList = ({ roles }: {roles: Roles}) => {
    const fields = ['Course Name', 'Credit Hours', 'Actions']
    const [isDialogOpen, setDialogOpen] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
    
    const [showAddModal, setShowAddModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showStudentModal, setShowStudentModal] = useState(false);
    const [courseId, setCourseId] = useState<number | null>(null);

    const { data, mutate, isLoading } = useSWR('courses', sendGetReq, {
        onSuccess(data) {
            const addActions: any = [...data?.data]
            addActions?.map((el: any) => {
                return el.actions = <>
                    {roles.canEdit &&
                      <button className="btn btn-primary btn-sm mx-1" onClick={() => handleEdit(el)}>Edit</button>}
                    {roles.canDelete &&
                      <button className="btn btn-danger btn-sm mx-1" onClick={() => handleDelete(el.id)}>Delete</button>}
                    {roles.canSchedule &&
                      <button className="btn btn-secondary btn-sm mx-1" onClick={() => handleAddSchedule(el.id)}>Add to Schedule</button>}
                    {roles.canShowStudents &&
                      <button className="btn btn-alert btn-sm mx-1" onClick={() => handleShowStudents(el)}>Show Students</button>}
                </>
            })
            return addActions
        },
    })

    const { trigger: deleteCourse } = useSWRMutation(`admin/course/${courseId}`, sendDeleteReq, {
        onSuccess() {
            closeModal()
            mutate()
        }
    })

    const { trigger: addToSchedule } = useSWRMutation(`student/add-course/${courseId}`, sendPostNoDataReq, {
        onSuccess() {
            closeModal()
            mutate()
        },
    })

    const handleAdd = () => {
        setSelectedCourse(null);
        setDialogOpen(true);
      };
    
      const handleEdit = (course: Course) => {
        setSelectedCourse(course);
        setDialogOpen(true);
      };

      const handleDelete = (id: number) => {
        setCourseId(id);
        setShowDeleteModal(true);
      }

      const handleAddSchedule = (id: number) => {
        setCourseId(id);
        setShowAddModal(true)
      }

      const handleShowStudents = (course: Course) => {
        setShowStudentModal(true)
        setSelectedCourse(course)
      }

      const closeModal = () => {
        setCourseId(null);
        setShowAddModal(false)
        setShowDeleteModal(false);
        setSelectedCourse(null)
      }

  return (
    <div className="container mt-5">
      <div className='d-flex justify-content-between align-items-center'>
        <h2>Course List</h2>
        {roles.canAdd && <button className="btn btn-primary" onClick={handleAdd}>
            Add Course
        </button>}
      </div>

      {!isLoading && data?.data?.length > 0 ?
        <Table data={{fields, content: data?.data}} />
        : <h5 className='text-center'>No Courses Found</h5>
      }

      {roles.canSchedule && 
        <Schedule />
      }

      <CourseDialog
        isOpen={isDialogOpen}
        onClose={() => {
            setDialogOpen(false)
            setSelectedCourse(null)
        }}
        course={selectedCourse}
        refetchData={mutate}
      />

      <ConfirmDialog
        isOpen={showAddModal}
        title={"Take Course"}
        message={"Do you want to add this item to your schedule?"}
        button={"btn-primary"}
        onAction={addToSchedule}
        onClose={closeModal}
      />
      
      <ConfirmDialog
        isOpen={showDeleteModal}
        title={"Delete Confirmation"}
        message={"Are you sure you want to delete this item?"}
        button={"btn-danger"}
        onAction={deleteCourse}
        onClose={closeModal}
      />

      {roles.canShowStudents && selectedCourse && selectedCourse?.students.length > 0 &&
        <ShowStudents course={selectedCourse} isOpen={showStudentModal} onClose={closeModal} />
      }
    </div>
  );
};

export default CourseList;
