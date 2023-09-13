import Login from '@/components/Login/Login'
import { sendPostReq } from '@/core/api.crud'
import React from 'react'

const LoginPage = ({ params }: { params: { slug: string } }) => {
  // const handleSubmit = async () => {
  //   const res = await sendPostReq('login', {"email": "ziadstudent@mail.com", "password": "abc123s"})
  // }
  return (
    <Login role={params.slug} />
  )
}

export default LoginPage