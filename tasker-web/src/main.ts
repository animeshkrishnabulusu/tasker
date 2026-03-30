import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { App } from './app/app';

bootstrapApplication(App, {
  providers: [
    provideHttpClient(),
    ReactiveFormsModule
  ]
});
  
