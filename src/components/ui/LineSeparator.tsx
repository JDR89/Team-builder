interface LineSeparatorProps {
  name?: string,
  className?: string
}

export const LineSeparator = ({name = "SJD", className}: LineSeparatorProps) => {
  return (
    <div className={`flex items-center justify-center w-full ${className}`}>
      <div className="flex-grow bg-success h-px"></div>
      <div className="mx-4 text-neutral-content ">{name}</div>
      <div className="flex-grow bg-success h-px"></div>
    </div>
  )
}
