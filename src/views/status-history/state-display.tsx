export interface StatusEntry {
  date: string
  state: string
  comment?: string
}

export function StateDisplay({ value }: { value: StatusEntry[] }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Date</th>
          <th>State</th>
          <th>Comment</th>
        </tr>
      </thead>
      <tbody>
        {value.map((entry, index) => (
          <tr key={index}>
            <td>{entry.date}</td>
            <td>{entry.state}</td>
            <td>{entry.comment ?? ''}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
