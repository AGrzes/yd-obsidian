import type { Meta, StoryObj } from '@storybook/react-vite'

import { FieldDisplay } from './field-display.js'

const meta = {
  component: FieldDisplay,
} satisfies Meta<typeof FieldDisplay>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    value: 'Example Field Value',
  },
}
