import { ComponentFactoryResolver, ComponentRef, Injectable, Renderer2, RendererFactory2, ViewContainerRef } from '@angular/core';
import { FormEntry } from 'projects/forms-registry';
import { BehaviorSubject } from 'rxjs';
import { first } from 'rxjs/operators';
import { FloatingFormContainerComponent, TabSplitEvent } from './floating-form-container/floating-form-container.component';

@Injectable({
  providedIn: 'root'
})
export class FloatingFormsService {
  private boundingView: ViewContainerRef;
  private renderer: Renderer2;
  private zIndex = 100;
  private floatingContainers: ComponentRef<FloatingFormContainerComponent>[] = [];
  private floatingContainersCount = new BehaviorSubject<number>(0);

  constructor(private resolver: ComponentFactoryResolver, rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  setBoundingView(boundingView: ViewContainerRef): void {
    this.boundingView = boundingView;
  }

  open(formEntry: FormEntry): void {
    const container = this.floatingContainers[0] || this.createFloatingContainer();
    container.instance.addNewTab(formEntry);
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
    componentRef.instance.openFloatingFormContainers$ =
      this.floatingContainersCount.asObservable();

    componentRef.instance.closed
      .subscribe(() => this.disposeOfFloatingContainer(componentRef));

    componentRef.instance.afterViewInit.pipe(first())
      .subscribe(() => this.centerCreatedComponent(componentRef));

    componentRef.instance.splitTab.subscribe((event: TabSplitEvent) => this.splitTab(event, componentRef));
  }

  splitTab(event: TabSplitEvent, currentContainer: ComponentRef<FloatingFormContainerComponent>) {
    if (!event.isLastTab && this.floatingContainers.length === 1) {
      this.createFloatingContainer().instance.attach(event);
      return;
    }

    for (const floatingContainer of this.floatingContainers) {
      if (floatingContainer !== currentContainer) {
        floatingContainer.instance.attach(event);
        return;
      }
    }
  }

  private disposeOfFloatingContainer(componentRef: ComponentRef<FloatingFormContainerComponent>) {
    componentRef.destroy();
    const index = this.floatingContainers.indexOf(componentRef);
    this.floatingContainers.splice(index);
    this.floatingContainersCount.next(this.floatingContainersCount.value - 1);
  }

  private centerCreatedComponent(componentRef: ComponentRef<FloatingFormContainerComponent>) {
    const containerElement = componentRef.location.nativeElement.firstChild;
    const { offsetHeight: containerHeight, offsetWidth: containerWidth } = containerElement;
    const { offsetTop, offsetHeight: boundingHeight, offsetWidth: boundingWidth } = this.boundingView.element.nativeElement.parentNode;
    const top = offsetTop + (boundingHeight / 2) - (containerHeight / 2);
    const left = (boundingWidth / 2) - (containerWidth / 2);
    this.renderer.setStyle(containerElement, 'top', `${top}px`);
    this.renderer.setStyle(containerElement, 'left', `${left}px`);
    this.renderer.setStyle(containerElement, 'z-index', this.zIndex++);
  }
}
