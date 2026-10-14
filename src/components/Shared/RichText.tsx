interface Props {
  content?: string | null
  className?: string
}

export default function RichText({ content, className = '' }: Props) {
  if (!content) {
    return null
  }

  return (
    <div
      className={`prose-editorial ${className}`}
      dangerouslySetInnerHTML={{
        __html: content,
      }}
    />
  )
}
