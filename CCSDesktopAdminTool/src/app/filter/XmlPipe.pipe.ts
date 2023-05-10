import * as vkbeautify from 'vkbeautify';
import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'xml'
})
export class XmlPipe implements PipeTransform {
    transform(value: string): string {
        console.log('pipe called');
        console.log('value'+ value);
       // value = value ? value.toLocaleLowerCase() : null;
       if(value == undefined)
       return "";
       else
        return vkbeautify.xml(value);
    }
}