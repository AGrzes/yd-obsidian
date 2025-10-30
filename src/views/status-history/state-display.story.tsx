import type { Meta, StoryObj } from '@storybook/react-vite'

import { StateDisplay } from './state-display.js'

const meta = {
  component: StateDisplay,
} satisfies Meta<typeof StateDisplay>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    value: [
      { date: '2023-01-01', state: 'Open', comment: 'Initial state' },
      { date: '2023-02-15', state: 'In Progress' },
      { date: '2023-03-30', state: 'Closed', comment: 'Completed successfully' },
    ],
  },
}
