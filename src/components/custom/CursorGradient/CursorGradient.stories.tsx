import type { Meta, StoryObj } from '@storybook/react';

import CursorGradient from '../CursorGradient';

const meta = {
  component: CursorGradient,
} satisfies Meta<typeof CursorGradient>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {}
};