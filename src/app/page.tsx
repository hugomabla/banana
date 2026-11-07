import { Hero } from '@/components/layout/Hero'
import { Stats } from '@/components/layout/Stats'
import { Features } from '@/components/layout/Features'
import { ContentPreview } from '@/components/layout/ContentPreview'
import { Newsletter } from '@/components/layout/Newsletter'

export default function HomePage() {
  return (
    <>
      <Hero />
      <Stats />
      <Features />
      <ContentPreview />
      <Newsletter />
    </>
  )
}
