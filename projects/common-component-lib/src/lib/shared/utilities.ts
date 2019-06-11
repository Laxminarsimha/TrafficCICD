// @dynamic
export class XgObjectUtils {

    public static convertToDropdownListItems(aSource: any[], sDisplayField: string, sKeyField: string) {
        const isArrayOfObjects = XgObjectUtils.isObject(aSource[0]); //Object.prototype.toString.call(aSource[0]).indexOf('Object') !== -1
        let oTypeaheadObject = {};
        const aResult = [];
        if (isArrayOfObjects) {
            aSource.forEach((oDataSource) => {
                oTypeaheadObject['label'] = oDataSource.hasOwnProperty(sDisplayField) ? oDataSource[sDisplayField] : '';
                oTypeaheadObject['value'] = oDataSource.hasOwnProperty(sKeyField) ? oDataSource[sKeyField] : '';
                oTypeaheadObject = { ...oTypeaheadObject, ...oDataSource }
                aResult.push(JSON.parse(JSON.stringify(oTypeaheadObject)))
            });
        }
        else {
            aSource.forEach((oDataSource) => {
                oTypeaheadObject['label'] = oDataSource;
                oTypeaheadObject['value'] = oDataSource;
                aResult.push(JSON.parse(JSON.stringify(oTypeaheadObject)))
            });
        }
        return aResult;
    }
    public static isNumber(sValue): boolean {
        return /^\d+$/.test(sValue)
    }
    public static isObject(sValue): boolean {
        return Object.prototype.toString.call(sValue).indexOf('Object') !== -1;
    }
    public static isArray(sValue): boolean {
        return Object.prototype.toString.call(sValue).indexOf('Array') !== -1;
    }
    public static convertToTabItems(aTabs) {
        const isArrayOfObjects = XgObjectUtils.isObject(aTabs[0]);
        let oTabObject = {};
        const aResult = [];
        if (isArrayOfObjects) {
            aTabs.forEach((oTab) => {
                oTabObject['label'] = oTab.hasOwnProperty('label') ? oTab['label'] : '';
                oTabObject['key'] = oTab.hasOwnProperty('key') ? oTab['key'] : '';
                oTabObject = { ...oTabObject, ...oTab }
                if (oTabObject['key']) {
                    aResult.push(JSON.parse(JSON.stringify(oTabObject)))
                }
            });
        }
        else {
            aTabs.forEach((oTab) => {
                oTabObject['label'] = oTab;
                oTabObject['key'] = oTab;
                aResult.push(JSON.parse(JSON.stringify(oTabObject)))
            });
        }
        return aResult;
    }
    public static coerceBooleanProperty(value): boolean {
        return value != null && `${value}` !== 'false';
    }
    public static getRandomId(name): string {
        let sId;
        const randomGenerator = (Math.random() * 100).toFixed();
        const isIdExist = document.getElementById(`${name}${randomGenerator}`);
        if (isIdExist) {
            sId = this.getRandomId(name);
        }
        else {
            sId = `${name}${randomGenerator}`;
        }
        return sId;
    }
    public static coerceNumberProperty(value: any): number;
    public static coerceNumberProperty<D>(value: any, fallback: D): number | D;
    public static coerceNumberProperty(value: any, fallbackValue = 0) {
        return this.isNumberValue(value) ? Number(value) : fallbackValue;
    }

    public static isNumberValue(value: any): boolean {
        return !isNaN(parseFloat(value as any)) && !isNaN(Number(value));
    }

    public static relativePosition(element: any, target: any): void {
        const isLabelPresent = target.parentElement.querySelector('label');
        let elementDimensions = element.offsetParent ? { width: element.offsetWidth, height: element.offsetHeight } : this.getHiddenElementDimensions(element);
        const targetHeight = target.offsetHeight;
        const targetOffset = target.getBoundingClientRect();
        const viewport = this.getViewport();
        let top: number, left: number;

        if ((targetOffset.top + targetHeight + elementDimensions.height) > viewport.height) {
            top = (-1 * (elementDimensions.height) + 32);
            if ((targetOffset.top + top + 50) < 0) {
                top = 0;
            }
        }
        else {
            top = targetHeight + 20;
        }

        if (elementDimensions.width > viewport.width) {
            // element wider then viewport and cannot fit on screen (align at left side of viewport)
            left = targetOffset.left * -1;
        }
        else if ((targetOffset.left + elementDimensions.width) > viewport.width) {
            // element wider then viewport but can be fit on screen (align at right side of viewport)
            left = (targetOffset.left + elementDimensions.width - viewport.width) * -1;
        }
        else {
            // element fits on screen (align with target)
            left = 0;
        }

        element.style.top = top + 'px';
        element.style.rigth = 0 + 'px';
    }

    public static absolutePosition(element: any, target: any): void {
        let elementDimensions = element.offsetParent ? { width: element.offsetWidth, height: element.offsetHeight } : this.getHiddenElementDimensions(element);
        let elementOuterHeight = elementDimensions.height;
        let elementOuterWidth = elementDimensions.width;
        let targetOuterHeight = target.offsetHeight;
        let targetOuterWidth = target.offsetWidth;
        let targetOffset = target.getBoundingClientRect();
        let windowScrollTop = this.getWindowScrollTop();
        let windowScrollLeft = this.getWindowScrollLeft();
        let viewport = this.getViewport();
        let top, left;

        if (targetOffset.top + targetOuterHeight + elementOuterHeight > viewport.height) {
            top = targetOffset.top + windowScrollTop - elementOuterHeight;
            if (top < 0) {
                top = 0 + windowScrollTop;
            }
        }
        else {
            top = targetOuterHeight + targetOffset.top + windowScrollTop;
        }

        if (targetOffset.left + targetOuterWidth + elementOuterWidth > viewport.width)
            left = Math.max(0, targetOffset.left + windowScrollLeft + targetOuterWidth - elementOuterWidth);
        else
            left = targetOffset.left + windowScrollLeft;

        element.style.top = top + 'px';
        element.style.left = left + 'px';
    }
    public static getHiddenElementDimensions(element: any): any {
        let dimensions: any = {};
        element.style.visibility = 'hidden';
        element.style.display = 'block';
        dimensions.width = element.offsetWidth;
        dimensions.height = element.offsetHeight;
        element.style.display = 'none';
        element.style.visibility = 'visible';

        return dimensions;
    }

    public static getWindowScrollTop(): number {
        let doc = document.documentElement;
        return (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
    }

    public static getWindowScrollLeft(): number {
        let doc = document.documentElement;
        return (window.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0);
    }
    public static getViewport(): any {
        let win = window,
            d = document,
            e = d.documentElement,
            g = d.getElementsByTagName('body')[0],
            w = win.innerWidth || e.clientWidth || g.clientWidth,
            h = win.innerHeight || e.clientHeight || g.clientHeight;

        return { width: w, height: h };
    }
    public static appendChild(element: any, target: any) {
        if (this.isElement(target))
            target.appendChild(element);
        else if (target.el && target.el.nativeElement)
            target.el.nativeElement.appendChild(element);
        else
            throw 'Cannot append ' + target + ' to ' + element;
    }
    public static isElement(obj: any) {
        return (typeof HTMLElement === "object" ? obj instanceof HTMLElement :
            obj && typeof obj === "object" && obj !== null && obj.nodeType === 1 && typeof obj.nodeName === "string"
        );
    }
}