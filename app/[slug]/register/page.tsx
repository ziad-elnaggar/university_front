import Registration from '@/components/Register/Register'
import React from 'react'

const RegisterPage = ({ params }: { params: { slug: string } }) => {
  return (
    <Registration role={params.slug} />
  )
}

export default RegisterPage