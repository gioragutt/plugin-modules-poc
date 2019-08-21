import { AfterViewInit, Component, EventEmitter, Input, OnDestroy, Output, QueryList, Type, ViewChildren, ViewRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormEntry, FormEntryViewRef, FormRegistryComponentDirective } from 'projects/forms-registry';
import { Observable } from 'rxjs';

export interface TabSplitEvent {
  formFromView: FormEntryViewRef;
  isLastTab: boolean;
}

export interface ComponentTab {
  formEntry: FormEntry;
  viewRef?: ViewRef;
}

@Component({
  selector: 'app-floating-form-container',
  templateUrl: './floating-form-container.component.html',
  styleUrls: ['./floating-form-container.component.scss']
})
export class FloatingFormContainerComponent implements AfterViewInit, OnDestroy {
  static idCounter = 0;
  @ViewChildren(FormRegistryComponentDirective) registries: QueryList<FormRegistryComponentDirective>;

  @Input() formComponent: Type<any>;
  @Input() openFloatingFormContainers$: Observable<number>;

  @Output() closed = new EventEmitter<void>();
  @Output() afterViewInit = new EventEmitter<void>();
  @Output() splitTab = new EventEmitter<TabSplitEvent>();
  @Output() gainFocus = new EventEmitter<void>();
  @Output() destroyed = new EventEmitter<void>();

  readonly id = FloatingFormContainerComponent.idCounter++;
  focused = false;
  selected = new FormControl(0);
  componentTabs: ComponentTab[] = [];

  ngOnDestroy() {
    this.destroyed.emit();
  }

  ngAfterViewInit(): void {
    this.afterViewInit.next();
  }

  addNewTab(formEntry: FormEntry) {
    this.addTab({ formEntry });
  }

  onFocus() {
    this.focused = true;
  }

  onFocusOut() {
    this.focused = false;
  }

  closeCurrentTab(): boolean {
    if (this.closeTab(this.selected.value)) {
      this.closed.emit();
      return true;
    }
    return false;
  }

  split(index: number): void {
    const formRegistryComponent = this.registries.toArray()[index];
    const formFromView = formRegistryComponent.detach();
    const isLastTab = this.closeTab(index);
    this.splitTab.emit({ formFromView, isLastTab: this.componentTabs.length === 0 });
    if (!isLastTab) {
      this.selected.setValue(index);
    }
  }

  closeTab(index: number) {
    this.componentTabs.splice(index, 1);
    return this.componentTabs.length === 0;
  }

  attach(event: FormEntryViewRef) {
    this.addTab(event);
  }

  private addTab(event: ComponentTab) {
    this.componentTabs.push(event);
    this.selected.setValue(this.componentTabs.length - 1);
  }
}
