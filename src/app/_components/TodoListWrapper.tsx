'use client'

import dynamic from 'next/dynamic'
import { Suspense } from 'react'

const TodoListSSR = dynamic(() => import('./TodoListSSR'), {
  ssr: false,
  loading: () => <div>Loading...</div>
})

export default function TodoListWrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <TodoListSSR />
    </Suspense>
  )
}