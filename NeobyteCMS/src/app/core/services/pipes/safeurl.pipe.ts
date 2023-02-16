import { Pipe, PipeTransform } from '@angular/core';
import {DomSanitizer} from "@angular/platform-browser";

@Pipe({
  name: 'safeurl'
})
export class SafeurlPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) { }
  transform(url: string): any {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
