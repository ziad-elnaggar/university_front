import React from 'react'

const page = ({ params }: { params: { slug: string } }) => {
    if(!['admin', 'student'].includes(params.slug)) console.log('wrong');
    return (
        <></>
    )
}

export default page