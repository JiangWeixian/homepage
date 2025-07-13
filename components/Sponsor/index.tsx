import { Typography } from '~/components/ui/typography'
import { Link as UILink } from '~/components/ui/link'

import { social } from '~/utils/constants'

export const SponsorLink = () => {
  return (
    <Typography
      p={true}
      type="quaternary"
      size="sm"
      className="w-fit underline decoration-dotted underline-offset-4"
    >
      💖 Sponsoring me on{' '}
      <Typography weight="semibold" span={true}>
        <UILink href={social.sponsor} title="sponsor">
          Github Sponsor
        </UILink>
      </Typography>
      .
    </Typography>
  )
}
