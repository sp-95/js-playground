import Layout from '@/components/layout'
import Home from '@components/home'
import React from 'react'

export default function HomePage(): React.ReactElement {
  return (
    <Layout
      title="Notification Component"
      description="Simulate notification component"
    >
      <Home />
    </Layout>
  )
}
