import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StickyTableDirective } from './sticky-table.directive';
import { StickyLeftDirective } from './sticky-left.directive';
import { StickyTopDirective } from './sticky-top-header.directive';

@NgModule({
  imports     : [ CommonModule ],
  exports     : [ StickyLeftDirective, StickyTableDirective, StickyTopDirective ],
  declarations: [ StickyLeftDirective, StickyTableDirective, StickyTopDirective ],
})
export class StickyTableDirectiveModule {}
