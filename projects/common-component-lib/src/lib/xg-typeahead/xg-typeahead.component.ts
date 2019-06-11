import { NgModule, Component, OnInit, Input, forwardRef, Output, Renderer, EventEmitter, ViewChild, TemplateRef, ElementRef, ContentChild, AfterViewInit } from '@angular/core';
// import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Observable, Subject, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, switchMap, catchError, tap } from 'rxjs/operators';
import { XgObjectUtils } from '../shared/utilities';
import { SharedModule } from '../shared/shared.module';
import { CommonModule } from '@angular/common';
import { MultiRequiredValidator } from './directives/xg-multi-requireValidator';

@Component({
  selector: 'xg-typeahead',
  templateUrl: './xg-typeahead.component.html',
  styleUrls: ['./xg-typeahead.component.scss'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => XgTypeaheadComponent), multi: true }]
})
export class XgTypeaheadComponent implements OnInit, AfterViewInit {
  private bDisabled: boolean;
  private bRequired: boolean;
  private sPlaceholder: string;
  private sLabelName: string;
  private sTypeaheadValue: string;
  private bMultiple: boolean;
  public searchTerm$: Subject<any>;
  public xgSuggestions: any[];
  private sDebounceTime: number;
  private bDropdown: boolean;
  private sDisplayValue: string;
  private sKeyValue: string;
  public sHighlightSuggestion: string;
  public bSuggestionOverlayVisible: boolean;
  private sSuggestionMaxHeight: string;
  public aSelectedSuggestions: any[];
  public bLoading: boolean;
  private sId: string;
  private bAutofocus: boolean;
  private sTabindex: number;
  private aSuggestions: any[];
  private sMaximumLength: number;
  public xgTypeAheadmultiValue: string;
  private bOnFocusOut: boolean;
  private onChangeInput: (_: any) => void = () => { };
  private onTouchedInput: () => void = () => { };
  @Output('onValueChange') onValueChange = new EventEmitter<any>();
  @Output('onBlur') onBlur = new EventEmitter<any>();
  @Output('onFocus') onFocus = new EventEmitter<any>();
  @Output('onEnter') onEnter = new EventEmitter<any>();
  @ViewChild('xgTypeaheadInput') xgTypeaheadInput: ElementRef;
  @ViewChild('xgTypeaheadMultiple') xgTypeaheadMultiple: ElementRef;
  @ContentChild('xgCustomTemplate') xgCustomTemplate: TemplateRef<any>;
  @ContentChild('xgAdversiorTemplate') xgAdversiorTemplate: TemplateRef<any>;

  get typeaheadModelValue(): any {
    return this.sTypeaheadValue;
  };
  set typeaheadModelValue(sValue: any) {
    let keyValue = '';
    let displayValue = '';
    if (XgObjectUtils.isObject(sValue)) {
      displayValue = sValue.label;
      keyValue = sValue.value;
    }
    else {
      displayValue = sValue;
      keyValue = sValue;
    }
    if (displayValue !== this.sTypeaheadValue) {
      this.sTypeaheadValue = displayValue;
      this.onChangeInput(keyValue);
    }
    if (this.onValueChange.observers && this.onValueChange.observers.length) {
      this.onValueChange.emit(sValue);
    }
    if (this.bOnFocusOut) {
      this.hideSuggestionOverlay();
      this.bOnFocusOut = false;
    }
  }
  @Input('onSearch') onSearch: Function;
  @Input()
  get suggestionMaxHeight() {
    return this.sSuggestionMaxHeight;
  }
  set suggestionMaxHeight(value) {
    if (value) {
      if (value.indexOf('px') !== -1) {
        if (XgObjectUtils.isNumber(value.split('px')[0])) {
          this.sSuggestionMaxHeight = value;
        }
      }
      else {
        if (XgObjectUtils.isNumber(value)) {
          this.sSuggestionMaxHeight = `${value}px`;
        }
      }

    }
  }
  @Input()
  get suggestions() {
    return this.aSuggestions;
  }
  set suggestions(aValue) {
    this.aSuggestions = aValue || [];
  }
  @Input()
  get displayValue() {
    return this.sDisplayValue;
  }
  set displayValue(value) {
    this.sDisplayValue = value || '';
  }
  @Input()
  get keyValue() {
    return this.sKeyValue;
  }
  set keyValue(value) {
    this.sKeyValue = value || '';
  }
  @Input()
  get debounceTime() {
    return this.sDebounceTime;
  }
  set debounceTime(value) {
    const sValueType = Object.prototype.toString.call(value);
    const sValue = sValueType.indexOf('Number') !== -1 ? value : 400
    this.sDebounceTime = sValue
  }
  @Input()
  get labelName() {
    return this.sLabelName
  }
  set labelName(value) {
    this.sLabelName = value || '';
  }
  @Input()
  get id() {
    return this.sId
  }
  set id(value) {
    this.sId = value || '';
  }
  @Input()
  get autofocus() {
    return this.bAutofocus
  }
  set autofocus(value) {
    this.bAutofocus = XgObjectUtils.coerceBooleanProperty(value);
  }
  @Input()
  get tabindex() {
    return this.sTabindex
  }
  set tabindex(value) {
    this.sTabindex = value || 0;
  }

  @Input()
  get placeholder() {
    return this.sPlaceholder;
  };
  set placeholder(value) {
    this.sPlaceholder = value || '';
  }
  @Input()
  get maxlength() {
    return this.sMaximumLength;
  }
  set maxlength(value) {
    this.sMaximumLength = value;
  }
  @Input()
  get disabled() {
    return this.bDisabled;
  }
  set disabled(value) {
    this.bDisabled = XgObjectUtils.coerceBooleanProperty(value);
  }
  @Input()
  get required() {
    return this.bRequired;
  }
  set required(value) {
    this.bRequired = XgObjectUtils.coerceBooleanProperty(value);
  }
  @Input()
  get multiple() {
    return this.bMultiple;
  }
  set multiple(value) {
    this.bMultiple = XgObjectUtils.coerceBooleanProperty(value);
  }
  @Input()
  get dropdown() {
    return this.bDropdown;
  }
  set dropdown(value) {
    this.bDropdown = XgObjectUtils.coerceBooleanProperty(value);
  }
  constructor(private renderer: Renderer) {
    this.xgSuggestions = [];
    this.sHighlightSuggestion = '';
    this.sSuggestionMaxHeight = "200px";
    this.bSuggestionOverlayVisible = false;
    this.bLoading = false;
    this.aSelectedSuggestions = [];
    this.searchTerm$ = new Subject<string>();
    this.bAutofocus = false;
    this.sId = "";
    this.bOnFocusOut = false;
    renderer.listenGlobal("document", "click", (event: any) => {
      if (
        this.bSuggestionOverlayVisible &&
        event.target &&
        !event.target.closest('.xg-typehead-multi') || this.bOnFocusOut
      ) {
        this.bAutofocus = false;
        this.hideSuggestionOverlay();
      }
    });
  }
  ngOnInit() {
    const that = this;
    this.search(this.searchTerm$).subscribe((aDatasource: any[]) => {
      that.bLoading = false;
      that.xgSuggestions = this.onSearch ? that.prepareSuggestions(aDatasource) : aDatasource;
      this.sHighlightSuggestion = that.xgSuggestions.length ? that.xgSuggestions[0].value : '';
      (this.typeaheadModelValue || this.xgTypeAheadmultiValue) ? that.showSuggestionOverlay() : this.hideSuggestionOverlay();
    })
  }
  ngAfterViewInit() {
    // this.suggestions = this.prepareSuggestions(this.suggestions);
    // this.aSuggestions = this.suggestions;
  }
  onStaticSearch(term) {
    let aData = this.suggestions || [];
    if (this.suggestions && this.suggestions.length && !this.suggestions[0].label) {
      aData = this.prepareSuggestions(this.suggestions);
    }
    return new Observable(observer => {
      const aFilteredArray = term ? aData.filter(oSuggestion => oSuggestion.label.toLowerCase().indexOf(term.toLowerCase()) !== -1) : [];
      observer.next(aFilteredArray)
    })
  }
  search(text$: Observable<string>) {
    let that = this;
    return text$.pipe(
      debounceTime(this.debounceTime),
      // distinctUntilChanged(),
      tap(() => this.bLoading = true),
      switchMap(term => {
        if (that.onSearch && term) {
          return that.onSearch(term).pipe(
            catchError(() => {
              this.bLoading = false;
              return of([]);
            })
          )
        }
        else {
          return that.onStaticSearch(term)
        }
      })
    )
  }
  selectSuggestion(oSuggestion) {
    if (this.multiple) {
      // this.xgTypeaheadMultiple.nativeElement.value = ''
      this.xgTypeAheadmultiValue = '';
      this.prepareSelectedSuggestions(oSuggestion);
    }
    else {
      this.typeaheadModelValue = oSuggestion;
    }
    this.hideSuggestionOverlay();
  }
  prepareSelectedSuggestions(oSuggestion) {
    const oSelectedObject = this.aSelectedSuggestions.find(oSelectedSuggestion => oSelectedSuggestion.value === oSuggestion.value);
    if (!oSelectedObject) {
      this.aSelectedSuggestions.push(JSON.parse(JSON.stringify(oSuggestion)));
      this.updateMultipleModel();
    }
  }
  removeSelectedSuggtions(oSuggestion) {
    const sIndex = this.aSelectedSuggestions.findIndex(oSelectedSuggestion => oSelectedSuggestion.value === oSuggestion.value);
    if (sIndex !== -1) {
      this.aSelectedSuggestions.splice(sIndex, 1);
      this.updateMultipleModel();
    }
  }
  prepareSuggestions(aDatasource) {
    let aSuggestionResult = [];
    if (aDatasource && aDatasource.length) {
      aSuggestionResult = XgObjectUtils.convertToDropdownListItems(aDatasource, this.displayValue, this.keyValue)
    }
    return aSuggestionResult;
  }
  onFocusOut($event) {
    this.bOnFocusOut = true;
    if (this.onBlur.observers && this.onBlur.observers.length) {
      this.onBlur.emit($event);
    }
    this.onTouchedInput();
  }
  onFocusIn($event) {
    if (this.onFocus.observers && this.onFocus.observers.length) {
      this.onFocus.emit($event);
    }
  }
  handleDropdownClick($event) {

  }
  updateMultipleModel() {
    this.onChangeInput(this.aSelectedSuggestions);
    if (this.onValueChange.observers && this.onValueChange.observers.length) {
      this.onValueChange.emit(this.aSelectedSuggestions);
    }
  }
  onKeyup(event) {
    switch (event.which || event.keyCode) {
      case 13:
        const sValue = this.multiple ? this.xgTypeAheadmultiValue : this.typeaheadModelValue;
        this.xgTypeAheadmultiValue = '';
        this.onEnter.emit({ value: sValue, suggetionList: this.xgSuggestions });
        this.hideSuggestionOverlay();
    }
  }
  onKeydown(event) {
    if (this.bSuggestionOverlayVisible) {
      let highlightItemIndex = this.xgSuggestions.findIndex(oSuggestion => oSuggestion.value === this.sHighlightSuggestion)

      switch (event.which || event.keyCode) {
        case 40:
          if (highlightItemIndex != -1) {
            var nextItemIndex = highlightItemIndex + 1;
            if (nextItemIndex != (this.xgSuggestions.length)) {
              this.sHighlightSuggestion = this.xgSuggestions[nextItemIndex].value;
            }
          }
          else {
            this.sHighlightSuggestion = this.xgSuggestions[0].value;
          }

          event.preventDefault();
          break;

        case 38:
          if (highlightItemIndex > 0) {
            let prevItemIndex = highlightItemIndex - 1;
            this.sHighlightSuggestion = this.xgSuggestions[prevItemIndex].value;
          }

          event.preventDefault();
          break;

        case 13:
          if (this.sHighlightSuggestion) {
            this.selectSuggestion(this.xgSuggestions[highlightItemIndex]);
            this.hideSuggestionOverlay();
          }
          event.preventDefault();
          break;

        case 27:
          this.hideSuggestionOverlay();
          event.preventDefault();
          break;


        case 9:
          if (this.sHighlightSuggestion) {
            this.selectSuggestion(this.xgSuggestions[highlightItemIndex]);
          }
          this.hideSuggestionOverlay();
          break;
      }
    }
    if (this.multiple) {
      switch (event.which) {
        case 8:
          if (this.aSelectedSuggestions && this.aSelectedSuggestions.length && !this.xgTypeaheadMultiple.nativeElement.value) {
            this.aSelectedSuggestions.pop();
            this.updateMultipleModel();
          }
          break;
      }
    }

  }
  writeValue(sValue) {
    if (this.multiple) {
      let aSelectedList = [];
      if (XgObjectUtils.isArray(sValue)) {
        aSelectedList = sValue;
      }
      else if (XgObjectUtils.isObject(sValue)) {
        aSelectedList = [sValue]
      }
      this.aSelectedSuggestions = XgObjectUtils.convertToDropdownListItems(aSelectedList, this.displayValue, this.keyValue)
    }
    else {
      this.sTypeaheadValue = sValue || '';
      this.typeaheadModelValue = this.sTypeaheadValue;
    }
  }
  hideSuggestionOverlay() {
    this.bSuggestionOverlayVisible = false;
  }
  showSuggestionOverlay() {
    let hasFocus = this.multiple ? document.activeElement === this.xgTypeaheadMultiple.nativeElement : document.activeElement == this.xgTypeaheadInput.nativeElement;

    if (!this.bSuggestionOverlayVisible && hasFocus) {
      this.bSuggestionOverlayVisible = true;
    }
  }
  registerOnChange(fn: (_: any) => void): void { this.onChangeInput = fn; }
  registerOnTouched(fn: () => void): void { this.onTouchedInput = fn; }
}
@NgModule({
  imports: [CommonModule, SharedModule],
  exports: [XgTypeaheadComponent, SharedModule, MultiRequiredValidator],
  declarations: [XgTypeaheadComponent, MultiRequiredValidator],
  providers: []
})
export class XgTypeaheadComponentModule { }
