import { sendDeleteReq, sendGetReq } from '@/core/api.crud'
import React, { useState } from 'react'
import useSWR from 'swr'
import Table from '../Table/Table'
import useSWRMutation from 'swr/mutation';
import ConfirmDialog from './ConfirmModal';

const Schedule = () => {
    const [courseId, setCourseId] = useState<number | null>(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    
    const { data, mutate, isLoading } = useSWR('student/schedule', sendGetReq, {
        onSuccess(data, key, config) {
            const addActions: any = [...data?.data]
            addActions.map((el: any) => {
                return el.actions =
                    <button className="btn btn-secondary btn-sm mx-1" onClick={() => handleRemoveSchedule(el.id)}>Remove from Schedule</button>
            })
            return addActions
        },
    })

    const { trigger: removeFromSchedule } = useSWRMutation(`student/remove-course/${courseId}`, sendDeleteReq, {
        onSuccess() {
            closeConfirmModal()
            mutate()
        },
    })

    const handleRemoveSchedule = (id: number) => {
        setCourseId(id);
        setShowDeleteModal(true)
      }

      const closeConfirmModal = () => {
        setCourseId(null);
        setShowDeleteModal(false);
      }
  return (
    <>
        <h2>My Schedule</h2>
        {!isLoading && data?.data?.length > 0 ?
            <Table data={{fields: ['Name', 'Credit Hours', 'Actions'], content: data?.data}} />
            : <h5 className='text-center'>Add courses to your schedule to start your journey.</h5>
        }

        <ConfirmDialog
            isOpen={showDeleteModal}
            title={"Delete Confirmatio"}
            message={"Are you sure you want to delete this item?"}
            button={"btn-danger"}
            onAction={removeFromSchedule}
            onClose={closeConfirmModal}
        />
    </>
  )
}

export default Schedule