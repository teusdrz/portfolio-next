import Loader from '@/components/Loader'
import Nav from '@/components/Nav'
import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import PanelReveal from '@/components/sections/PanelReveal'
import Services from '@/components/sections/Services'
import WorkIntro from '@/components/sections/WorkIntro'
import PanelClose from '@/components/sections/PanelClose'
import ProjectsPlaceholder from '@/components/sections/ProjectsPlaceholder'
import Footer from '@/components/sections/Footer'
import ClientInit from '@/components/ClientInit'

export default function Home() {
  return (
    <>
      <Loader />
      <Nav />
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <Hero />
          <About />
          <PanelReveal />
          <Services />
          <WorkIntro />
          <PanelClose />
          <ProjectsPlaceholder />
          <Footer />
        </div>
      </div>
      <ClientInit />
    </>
  )
}
