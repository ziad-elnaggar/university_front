import React from 'react'

interface TableData {
    fields: Array<string>;
    content: Array<Record<string, any>>;
}

const Table = ({ data }: { data: TableData }) => {
  return (
    <>
        <table className="table">
            <thead>
            <tr>
                {data.fields.map((field) => {
                    return <th key={field}>{field}</th>
                })}
            </tr>
            </thead>
            <tbody>
                {data.content?.map((el: Record<string, any>) => (
                    <tr key={el.id}>
                    <td>{el.name}</td>
                    <td>{el.credit_hours}</td>
                    {el?.actions && 
                        <td>
                            {el.actions}    
                        </td>
                    }
                    </tr>
                ))}
            </tbody>
        </table>
    </>
  )
}

export default Table