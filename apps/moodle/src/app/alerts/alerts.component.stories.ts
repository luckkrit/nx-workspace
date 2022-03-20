import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { AlertsComponent } from './alerts.component';

export default {
  title: 'AlertsComponent',
  component: AlertsComponent,
  decorators: [
    moduleMetadata({
      imports: [],
    })
  ],
} as Meta<AlertsComponent>;

const Template: Story<AlertsComponent> = (args: AlertsComponent) => ({
  props: args,
});


export const Primary = Template.bind({});
Primary.args = {
}