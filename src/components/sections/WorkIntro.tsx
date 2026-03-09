export default function WorkIntro() {
    return (
        <section
            data-work-intro
            style={{
                position: 'relative',
                backgroundColor: '#ffffff',
                minHeight: '130vh',
                paddingTop: '25vh',
            }}
        >
            <div
                data-work-intro-sticky
                style={{
                    position: 'sticky',
                    top: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100vh',
                    width: '100%',
                }}
            >
                <h2
                    data-work-intro-heading
                    style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: 'clamp(3rem, 8vw, 8rem)',
                        fontWeight: 900,
                        letterSpacing: '-0.04em',
                        lineHeight: 1.05,
                        color: '#000000',
                        textAlign: 'center',
                        textTransform: 'uppercase',
                        padding: '0 var(--space-8)',
                    }}
                >
                    <span data-work-intro-line style={{ display: 'block' }}>
                        WANT MORE PROOF?
                    </span>
                    <span data-work-intro-line style={{ display: 'block' }}>
                        EXPLORE MY PROJECTS
                    </span>
                </h2>
            </div>
        </section>
    )
}
