import {Directive, ElementRef, HostListener, Input, OnDestroy} from "@angular/core";
import {TooltipService} from "./tooltip.service";

@Directive({ selector: '[myTooltip]' })
export class TooltipDirective implements OnDestroy {

  @Input('tooltipConfig') config: any;
  @Input('tooltipId') id: string;

  constructor(private tooltipService: TooltipService, private element: ElementRef) {
    console.log('element', element);
  }

  @HostListener('mouseenter')
  @HostListener('focus')
  onMouseEnter(): void {
    if(this.config) {
      console.log('add new Tooltip', this.config);
      this.tooltipService.components.push({
        id: this.id,
        ref: this.element,
        config: this.config
      });
    }
  }

  @HostListener('mouseleave')
  @HostListener('blur')
  onMouseLeave(): void {
    this.destroy();
  }

  ngOnDestroy(): void {
    this.destroy();
  }

  destroy(): void {
    const idx = this.tooltipService.components.findIndex((t) => {
      return t.id === this.id;
    });

    this.tooltipService.components.splice(idx, 1);
  }

}
