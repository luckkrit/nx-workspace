import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { CourseCategoryComponent } from './course-category.component';

export default {
  title: 'CourseCategoryComponent',
  component: CourseCategoryComponent,
  decorators: [
    moduleMetadata({
      imports: [],
    })
  ],
} as Meta<CourseCategoryComponent>;

const Template: Story<CourseCategoryComponent> = (args: CourseCategoryComponent) => ({
  props: args,
});


export const Primary = Template.bind({});
Primary.args = {
}