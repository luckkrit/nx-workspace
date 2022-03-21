import { HttpClientModule } from '@angular/common/http';
import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { AlertsComponent } from '../alerts/alerts.component';
import { LoginComponent } from './login.component';

export default {
  title: 'LoginComponent',
  component: LoginComponent,
  decorators: [
    moduleMetadata({
      declarations: [AlertsComponent],
      imports: [HttpClientModule,],
    })
  ],
} as Meta<LoginComponent>;

const Template: Story<LoginComponent> = (args: LoginComponent) => ({
  props: args,
});


export const Primary = Template.bind({});
Primary.args = {
}