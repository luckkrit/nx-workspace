import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { CourseComponent } from './course.component';

export default {
  title: 'CourseComponent',
  component: CourseComponent,
  decorators: [
    moduleMetadata({
      imports: [],
    })
  ],
} as Meta<CourseComponent>;

const Template: Story<CourseComponent> = (args: CourseComponent) => ({
  props: args,
});


export const Primary = Template.bind({});
Primary.args = {
}