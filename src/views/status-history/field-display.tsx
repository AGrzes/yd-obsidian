export function FieldDisplay({ value }: { value: any }) {
  return (
    <div className="p-2 text-lg">
      <strong>Field:</strong> {String(value)}
    </div>
  )
}
