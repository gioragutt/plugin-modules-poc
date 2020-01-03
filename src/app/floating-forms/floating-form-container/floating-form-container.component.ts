import { AfterViewInit, Component, EventEmitter, OnDestroy, Output, QueryList, ViewChildren, ViewRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormEntry, FormEntryViewRef, FormRegistryComponentDirective } from 'projects/forms-registry';
import { Observable } from 'rxjs';
import { FloatingFormContainer, TabSplitEvent } from '../floating-form-container';

export interface ComponentTab {
  formEntry: FormEntry;
  viewRef?: ViewRef;
}

@Component({
  selector: 'app-floating-form-container',
  templateUrl: './floating-form-container.component.html',
  styleUrls: ['./floating-form-container.component.scss']
})
export class FloatingFormContainerComponent implements AfterViewInit, OnDestroy, FloatingFormContainer {
  private static idCounter = 0;

  @ViewChildren(FormRegistryComponentDirective) private registries: QueryList<FormRegistryComponentDirective>;

  @Output() readonly closed = new EventEmitter<void>();
  @Output() readonly afterViewInit = new EventEmitter<void>();
  @Output() readonly splitTab = new EventEmitter<TabSplitEvent>();
  @Output() readonly gainFocus = new EventEmitter<void>();
  @Output() readonly destroyed = new EventEmitter<void>();

  readonly id = FloatingFormContainerComponent.idCounter++;
  openFloatingFormContainers$: Observable<number>;

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

  onFocus(): void {
    this.focused = true;
  }

  onFocusOut(): void {
    this.focused = false;
  }

  closeCurrentTab(): void {
    if (this.closeTab(this.selected.value)) {
      this.closed.emit();
    }
  }

  split(index: number): void {
    const formRegistryComponent = this.registries.toArray()[index];
    const formFromView = formRegistryComponent.detach();
    const isLastTab = this.closeTab(index);
    this.splitTab.emit({ formFromView, isLastTab });
    if (!isLastTab) {
      this.selected.setValue(index);
    }
  }

  closeTab(index: number) {
    this.componentTabs.splice(index, 1);
    return this.componentTabs.length === 0;
  }

  attach(event: FormEntryViewRef): void {
    this.addTab(event);
  }

  private addTab(event: ComponentTab) {
    this.componentTabs.push(event);
    this.selected.setValue(this.componentTabs.length - 1);
  }
}
