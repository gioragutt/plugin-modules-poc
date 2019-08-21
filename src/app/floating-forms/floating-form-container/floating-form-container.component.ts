import { Component, Input, Type, Output, EventEmitter, AfterViewInit, ViewRef, QueryList, ViewChildren } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormEntry, FormRegistryComponentDirective, FormFromView } from 'projects/forms-registry';
import { Observable } from 'rxjs';

export type TabSplitEvent = FormFromView & {
  isLastTab: boolean;
};

export interface ComponentTab {
  formEntry: FormEntry;
  viewRef?: ViewRef;
}

@Component({
  selector: 'app-floating-form-container',
  templateUrl: './floating-form-container.component.html',
  styleUrls: ['./floating-form-container.component.scss']
})
export class FloatingFormContainerComponent implements AfterViewInit {
  @Input() formComponent: Type<any>;
  @Output() closed = new EventEmitter<void>();
  @Output() afterViewInit = new EventEmitter<void>();
  @Input() openFloatingFormContainers$: Observable<number>;
  @Output() splitTab = new EventEmitter<TabSplitEvent>();
  @ViewChildren(FormRegistryComponentDirective) registries: QueryList<FormRegistryComponentDirective<any>>;

  focused = true;
  selected = new FormControl(0);
  componentTabs: ComponentTab[] = [];

  ngAfterViewInit(): void {
    this.afterViewInit.next();
  }

  addNewTab(formEntry: FormEntry) {
    this.addTab({ formEntry });
  }

  closeTab() {
    this.componentTabs.splice(this.selected.value, 1);
    if (this.componentTabs.length === 0) {
      this.closed.emit();
    }
  }

  split(index: number, formEntry: FormEntry): void {
    const formRegistryComponent = this.registries.toArray()[index];
    const viewRef = formRegistryComponent.detach();
    const indexToReselect = indexToReselectAfterSplit(index);
    this.closeTab();
    this.splitTab.emit({ formEntry, viewRef, isLastTab: this.componentTabs.length === 0 });
    this.selected.setValue(indexToReselect);
  }

  attach(event: TabSplitEvent) {
    this.addTab(event);
  }

  private addTab(event: ComponentTab) {
    this.componentTabs.push(event);
    this.selected.setValue(this.componentTabs.length - 1);
  }
}

function indexToReselectAfterSplit(index: number) {
  return index === 0 ? 0 : index - 1;
}

