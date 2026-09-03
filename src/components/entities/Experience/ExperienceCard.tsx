interface Props {
  experience: any
}

export default function ExperienceCard({ experience }: Props) {
  return (
    <article>
      {experience.heroImage && (
        <img
          src={experience.heroImage.url}
          alt={experience.heroImage.alt || experience.title}
          style={{
            width: '300px',
            height: '250px',
          }}
        />
      )}

      <h3>{experience.title}</h3>

      {experience.shortDescription && <p>{experience.shortDescription}</p>}

      <a href={`/experiences/${experience.slug}`}>Explore Experience</a>
    </article>
  )
}
