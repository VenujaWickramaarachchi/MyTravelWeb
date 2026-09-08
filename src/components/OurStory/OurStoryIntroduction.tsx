interface OurStoryIntroductionProps {
  content: string
}

export default function OurStoryIntroduction({
  content,
}: OurStoryIntroductionProps) {
  return (
    <section>
      <div>
        <p>{content}</p>
      </div>
    </section>
  )
}
