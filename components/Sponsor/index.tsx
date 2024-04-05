import { Link } from 'mayumi/link'
import { Text } from 'mayumi/text'

import { social } from '~/utils/constants'

export const SponsorLink = () => {
  return (
    <Text
      p={true}
      type="quaternary"
      size="sm"
      className="w-fit underline decoration-dotted underline-offset-4"
    >
      💖 Sponsoring me on{' '}
      <Text weight="semibold" span={true}>
        <Link href={social.sponsor} title="sponsor">
          Github Sponsor
        </Link>
      </Text>
      .
    </Text>
  )
}
