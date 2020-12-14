import { IWebHostEnvironment } from './IWebHostEnvironment';

export class WebHostEnvironment extends IWebHostEnvironment {
    applicationName: string;
    environmentName: string;
    constructor(applicationName: string, environmentName: string) {
        super();
        this.applicationName = applicationName;
        this.environmentName = environmentName;
    }
}
