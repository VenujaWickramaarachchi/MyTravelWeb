interface Props {
  title: string
  description?: string
}

export default function SectionHeading({ title, description }: Props) {
  return (
    <header>
      <h2>{title}</h2>

      {description && <p>{description}</p>}
    </header>
  )
}
