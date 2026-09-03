interface Props {
  experience: any
}

export default function ExperienceCard({ experience }: Props) {
  return (
    <article>
      {experience.acf?.hero_image && (
        <img
          src={experience.acf.hero_image.url}
          alt={experience.acf.hero_image.alt || experience.title.rendered}
          style={{
            width: '300px',
            height: '250px',
          }}
        />
      )}

      <h3>{experience.title.rendered}</h3>

      {experience.acf?.short_description && (
        <p>{experience.acf.short_description}</p>
      )}

      <a href={`/experiences/${experience.slug}`}>Explore Experience</a>
    </article>
  )
}
