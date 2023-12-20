import { useEffect, useState } from 'react'
import { Table, Modal } from '@mantine/core'
import Code from '../Code/Code'
// import useDisclosure from '@mantine/hooks'
const CodeTable = () => {
  const [data, setData] = useState([])
  // const [opened, { open, close }] = useDisclosure(false)
  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    const response = await fetch(
      'https://nikostin.pythonanywhere.com/api/codes/'
    )
    const d = await response.json()
    if (response.ok) {
      setData(d)
    }
  }

  const handleFormSubmit = () => {
    getData() // Обновляем данные при успешной отправке формы
  }
ч
  return (
    <>
      <Code onFormSubmit={handleFormSubmit} />
      <Table>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>ID</Table.Th>
            <Table.Th>Name</Table.Th>
            <Table.Th>Code</Table.Th>
            <Table.Th>Execution Response</Table.Th>
            <Table.Th>Created at</Table.Th>
            <Table.Th>Updated at</Table.Th>
          </Table.Tr>
        </Table.Thead>

        <Table.Tbody>
          {data.map((el) => (
            <Table.Tr key={el.id}>
              <Table.Td>{el.id}</Table.Td>
              <Table.Td>
                <a key={el?.id} href={`/code/${el.id}`}>
                  {el.name}
                </a>
              </Table.Td>
              <Table.Td>{el.code}</Table.Td>
              <Table.Td bg="green">{el.execution_response}</Table.Td>
              <Table.Td>{el.created_at}</Table.Td>
              <Table.Td>{el.updated_at}</Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </>
  )
}

export default CodeTable
