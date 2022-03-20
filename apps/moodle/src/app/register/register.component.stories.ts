import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { RegisterComponent } from './register.component';

export default {
  title: 'RegisterComponent',
  component: RegisterComponent,
  decorators: [
    moduleMetadata({
      imports: [],
    })
  ],
} as Meta<RegisterComponent>;

const Template: Story<RegisterComponent> = (args: RegisterComponent) => ({
  props: args,
});


export const Primary = Template.bind({});
Primary.args = {
}