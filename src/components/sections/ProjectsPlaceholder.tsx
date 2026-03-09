const phrases: { text: string; color: 'white' | 'gray' }[] = [
    { text: 'PROJECTS', color: 'white' },
    { text: 'WERE STILL', color: 'gray' },
    { text: 'TO APPEAR', color: 'gray' },
    { text: 'HERE,', color: 'gray' },
    { text: 'BUT THEY', color: 'gray' },
    { text: 'ARE', color: 'gray' },
    { text: 'STILL', color: 'white' },
    { text: 'IN', color: 'white' },
    { text: 'PROGRESS.', color: 'white' },
    { text: 'THANK YOU', color: 'gray' },
    { text: 'FOR YOUR', color: 'gray' },
    { text: 'PATIENCE.', color: 'gray' },
    { text: 'PLEASE', color: 'gray' },
    { text: 'WAIT,', color: 'gray' },
    { text: 'AS WE', color: 'white' },
    { text: 'WILL HAVE', color: 'white' },
    { text: 'NEWS', color: 'white' },
    { text: 'SOON.', color: 'white' },
]

const phraseStyle = {
    fontFamily: "'Inter Tight', sans-serif",
    fontWeight: 900,
    fontStyle: 'italic' as const,
    fontSize: 'clamp(2.8rem, 6.5vw, 7.5rem)',
    lineHeight: 1,
    letterSpacing: '-0.03em',
    textTransform: 'uppercase' as const,
}

export default function ProjectsPlaceholder() {
    return (
        <section data-projects-placeholder>
            <div data-pp-track>
                {phrases.map((phrase, i) => (
                    <span
                        key={i}
                        data-pp-phrase
                        data-pp-color={phrase.color}
                        style={phraseStyle}
                    >
                        {phrase.text}
                    </span>
                ))}
            </div>
        </section>
    )
}
