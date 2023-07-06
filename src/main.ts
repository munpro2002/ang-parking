import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

import { registerLicense } from '@syncfusion/ej2-base';

registerLicense(
  'ORg4AjUWIQA/Gnt2V1hhQlJAfVddXnxLflF1VWJYdV51flFHcDwsT3RfQF5jTn5XdEZjXn9Yc3xURQ=='
);

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));
