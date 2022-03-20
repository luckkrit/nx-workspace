import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { UserDetailComponent } from './user-detail.component';

export default {
  title: 'UserDetailComponent',
  component: UserDetailComponent,
  decorators: [
    moduleMetadata({
      imports: [],
    })
  ],
} as Meta<UserDetailComponent>;

const Template: Story<UserDetailComponent> = (args: UserDetailComponent) => ({
  props: args,
});


export const Primary = Template.bind({});
Primary.args = {
}