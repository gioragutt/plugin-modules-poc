import { Injectable, ViewContainerRef, Renderer2, ComponentRef, ComponentFactoryResolver, RendererFactory2 } from '@angular/core';
import { FloatingFormContainerComponent, TabSplitEvent } from './floating-form-container/floating-form-container.component';
import { BehaviorSubject } from 'rxjs';
import { first, takeUntil } from 'rxjs/operators';

export type FloatingContainerRef = ComponentRef<FloatingFormContainerComponent>;

@Injectable({
  providedIn: 'root'
})
export class FloatingContainersService {
  private boundingView: ViewContainerRef;
  private renderer: Renderer2;
  private floatingContainers: FloatingContainerRef[] = [];
  private floatingContainersCount = new BehaviorSubject<number>(0);
  private focusedContainer: FloatingContainerRef;

  constructor(private resolver: ComponentFactoryResolver, rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  setBoundingView(boundingView: ViewContainerRef): void {
    this.boundingView = boundingView;
  }

  getContainer(): FloatingContainerRef {
    return this.focusedContainer || this.floatingContainers[0] || this.createFloatingContainer();
  }

  private createFloatingContainer() {
    const componentFactory = this.resolver.resolveComponentFactory(FloatingFormContainerComponent);
    const componentRef = this.boundingView.createComponent(componentFactory);

    this.initializeFloatingContainer(componentRef);

    this.floatingContainers.push(componentRef);
    this.floatingContainersCount.next(this.floatingContainersCount.value + 1);
    return componentRef;
  }

  private initializeFloatingContainer(componentRef: ComponentRef<FloatingFormContainerComponent>) {
    const floatingContainer = componentRef.instance;

    const untilDestroyed = takeUntil(floatingContainer.destroyed);

    floatingContainer.openFloatingFormContainers$ =
      this.floatingContainersCount.asObservable();

    floatingContainer.closed.pipe(untilDestroyed)
      .subscribe(() => this.disposeOfFloatingContainer(componentRef));

    floatingContainer.afterViewInit.pipe(first())
      .subscribe(() => this.centerCreatedComponent(componentRef));

    floatingContainer.splitTab
      .subscribe((event: TabSplitEvent) => this.handleSplit(event, componentRef));

    floatingContainer.gainFocus.pipe(untilDestroyed)
      .subscribe(() => this.focusOn(componentRef));
  }

  handleSplit({ formFromView, isLastTab }: TabSplitEvent, splitFrom: ComponentRef<FloatingFormContainerComponent>) {
    if (isLastTab) {
      console.log(`Last tab of ${splitFrom.instance.id} split, disposing of container`);
      this.disposeOfFloatingContainer(splitFrom);
    }

    if (this.floatingContainers.length === 0) {
      console.error('Split called with only tab when there was just one floating container! This is a bug!');
      formFromView.viewRef.destroy();
      return;
    }

    for (const container of this.floatingContainers) {
      if (container !== splitFrom) {
        if (isLastTab) {
          console.log(`Moving to ${container.instance.id} after ${splitFrom.instance.id} was disposed of`);
        } else {
          console.log(`Splitting from ${splitFrom.instance.id} to existing(${container.instance.id})`);
        }
        container.instance.attach(formFromView);
        if (isLastTab) {
          this.focusOn(container);
        } else {
          this.focusOn(splitFrom);
        }
        return;
      }
    }

    const attachingTo = this.createFloatingContainer();
    console.log(`Splitting from ${splitFrom.instance.id} to new(${attachingTo.instance.id})`);
    attachingTo.instance.attach(formFromView);
    this.focusOn(attachingTo);
  }

  private disposeOfFloatingContainer(floatingContainerRef: FloatingContainerRef) {
    if (this.focusedContainer === floatingContainerRef) {
      this.focusedContainer = null;
    }
    const index = this.floatingContainers.indexOf(floatingContainerRef);
    console.log(`Disposing of container ${floatingContainerRef.instance.id} from index ${index}`);
    floatingContainerRef.destroy();
    this.floatingContainers.splice(index, 1);
    this.floatingContainersCount.next(this.floatingContainersCount.value - 1);
  }

  private centerCreatedComponent(floatingContainerRef: FloatingContainerRef) {
    const containerElement = floatingContainerRef.location.nativeElement.firstChild;
    const { offsetHeight: containerHeight, offsetWidth: containerWidth } = containerElement;
    const { offsetTop, offsetHeight: boundingHeight, offsetWidth: boundingWidth } = this.boundingView.element.nativeElement.parentNode;
    const top = offsetTop + (boundingHeight / 2) - (containerHeight / 2);
    const left = (boundingWidth / 2) - (containerWidth / 2);
    this.renderer.setStyle(containerElement, 'top', `${top}px`);
    this.renderer.setStyle(containerElement, 'left', `${left}px`);
  }

  private focusOn(container: FloatingContainerRef): void {
    this.floatingContainers.forEach(c => {
      if (c === container) {
        c.instance.onFocus();
        this.focusedContainer = container;
      } else {
        c.instance.onFocusOut();
      }
    });
  }
}
