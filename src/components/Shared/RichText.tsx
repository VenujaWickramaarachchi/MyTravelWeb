interface Props {
  content?: string | null
}

export default function RichText({ content }: Props) {
  if (!content) {
    return null
  }

  return (
    <div
      dangerouslySetInnerHTML={{
        __html: content,
      }}
    />
  )
}
