// import { PipeTransform, Pipe, Injectable } from '@angular/core';
// import { IScreenPop } from '../model/screenpop';

// @Pipe({
//     name: 'screenPopFilter'
// })

// @Injectable()
// export class ScreenPopFilterPipe implements PipeTransform {

//     transform(value: IScreenPop[], filter: string): IScreenPop[] {
//         filter = filter ? filter.toLocaleLowerCase() : null;
//         return filter ? value.filter((app: IScreenPop) =>
//             app.display_tag != null && app.display_tag.toLocaleLowerCase().indexOf(filter) != -1
//             || app.screen_pop_header != null && app.screen_pop_header.toLocaleLowerCase().indexOf(filter) != -1
//             || app.data_source_connection_txt != null && app.data_source_connection_txt.toLocaleLowerCase().indexOf(filter) != -1
//         ) : value;
//     }

// }