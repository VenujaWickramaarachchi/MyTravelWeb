interface Props {
  title: string
  description?: string
  buttonText: string
  buttonHref: string
}

export default function CTA({
  title,
  description,
  buttonText,
  buttonHref,
}: Props) {
  return (
    <section>
      <h2>{title}</h2>

      {description && <p>{description}</p>}

      <a href={buttonHref}>{buttonText}</a>
    </section>
  )
}
