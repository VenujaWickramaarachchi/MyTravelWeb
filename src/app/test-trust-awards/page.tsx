import { getTrustAwards } from '@/lib/wordpress'

export default async function TestTrustAwardsPage() {
  const trustAwards = await getTrustAwards()

  return <pre>{JSON.stringify(trustAwards, null, 2)}</pre>
}
