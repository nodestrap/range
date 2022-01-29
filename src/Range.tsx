// react:
import {
    default as React,
    useReducer,
    useRef,
    useCallback,
    useEffect,
}                           from 'react'         // base technology of our nodestrap components

// cssfn:
import type {
    Optional,
}                           from '@cssfn/types'       // cssfn's types
import {
    // compositions:
    mainComposition,
    
    
    
    // styles:
    style,
    vars,
    imports,
    
    
    
    // rules:
    rule,
    variants,
    
    
    
    //combinators:
    children,
}                           from '@cssfn/cssfn'       // cssfn core
import {
    // hooks:
    createUseSheet,
}                           from '@cssfn/react-cssfn' // cssfn for react
import {
    createCssVar,
}                           from '@cssfn/css-var'     // Declares & retrieves *css variables* (css custom properties).
import {
    createCssConfig,
    
    
    
    // utilities:
    usesGeneralProps,
    usesPrefixedProps,
    usesSuffixedProps,
    overwriteProps,
}                           from '@cssfn/css-config'  // Stores & retrieves configuration using *css custom properties* (css variables)

// nodestrap utilities:
import {
    borderRadiuses,
}                           from '@nodestrap/borders'     // configurable borders & border radiuses defs
import {
    // styles:
    fillTextLineHeightLayout,
    fillTextLineWidthLayout,
}                           from '@nodestrap/layouts'
import {
    // utilities:
    setRef,
    parseNumber,
}                           from '@nodestrap/utilities'
import {
    // hooks:
    usePropEnabled,
    usePropReadOnly,
}                           from '@nodestrap/accessibilities'

// others libs:
// @ts-ignore
import triggerChange        from 'react-trigger-change'

// nodestrap components:
import {
    // general types:
    Tag,
    Role,
    SemanticTag,
    SemanticRole,
    
    
    
    // react components:
    Element,
}                           from '@nodestrap/element'
import {
    // hooks:
    usesSizeVariant,
    
    OrientationName,
    OrientationRuleOptions,
    defaultInlineOrientationRuleOptions,
    normalizeOrientationRule,
    usesOrientationRule,
    OrientationVariant,
    useOrientationVariant,
    
    isNude,
    usesBackg,
    usesBorderRadius,
    expandBorderRadius,
    expandPadding,
}                           from '@nodestrap/basic'
import {
    // hooks:
    usesBorderAsContainer,
}                           from '@nodestrap/container'
import {
    // hooks:
    useFocusBlurState,
    useArriveLeaveState,
}                           from '@nodestrap/control'
import {
    // hooks:
    usePressReleaseState,
}                           from '@nodestrap/action-control'
import {
    // styles:
    usesEditableControlLayout,
    usesEditableControlVariants,
    usesEditableControlStates,
    
    
    
    // react components:
    EditableControl,
}                           from '@nodestrap/editable-control'
import {
    // react components:
    EditableActionControl,
    EditableActionControlProps,
}                           from '@nodestrap/editable-action-control'



// hooks:

// layouts:

export const defaultOrientationRuleOptions = defaultInlineOrientationRuleOptions;


// range vars:

export interface RangeVars {
    /**
     * Range's thumb ratio.
     */
    valueRatio : any
    
    /**
     * final background layers of the Range.
     */
    backg      : any
}
const [rangeVarRefs, rangeVarDecls] = createCssVar<RangeVars>({ minify: false }); // do not minify to make sure `style={{ --valueRatio: ... }}` is the same between in server (without `usesRangeVars` rendered) & client (with `usesRangeVars` rendered)

/**
 * Uses Range variables.
 * @returns A `[Factory<Rule>, ReadonlyRefs, ReadonlyDecls]` represents Range variables definitions.
 */
export const usesRangeVars = () => {
    // dependencies:
    const [, backgRefs] = usesBackg();
    
    
    
    return [
        () => style({
            ...vars({
                [rangeVarDecls.backg] : backgRefs.backg,
            }),
        }),
        rangeVarRefs,
        rangeVarDecls,
    ] as const;
};



// styles:
export const inputElm      = ':first-child';
export const trackElm      = '.track';
export const trackLowerElm = '.tracklower';
export const trackUpperElm = '.trackupper';
export const thumbElm      = '.thumb';

export const usesRangeLayout = (options?: OrientationRuleOptions) => {
    // options:
    options = normalizeOrientationRule(options, defaultOrientationRuleOptions);
    const [orientationBlockSelector, orientationInlineSelector] = usesOrientationRule(options);
    const parentOrientationBlockSelector  = `${orientationBlockSelector}&`;
    const parentOrientationInlineSelector = `${orientationInlineSelector}&`;
    
    
    
    // dependencies:
    
    // borders:
    const [, , borderRadiusDecls   ] = usesBorderRadius();
    
    // range vars:
    const [rangeVars , rangeVarRefs] = usesRangeVars();
    
    
    
    return style({
        ...imports([
            // layouts:
            usesEditableControlLayout(),
            
            // range vars:
            rangeVars(),
        ]),
        ...style({
            // layouts:
            ...rule(orientationBlockSelector,  { // block
                display       : 'inline-flex', // use inline flexbox, so it takes the width & height as needed
                flexDirection : 'column',      // items are stacked vertically
            }),
            ...rule(orientationInlineSelector, { // inline
                display       : 'flex',        // use block flexbox, so it takes the entire parent's width
                flexDirection : 'row',         // items are stacked horizontally
            }),
            justifyContent    : 'start',  // if range is not growable, the excess space (if any) placed at the end, and if no sufficient space available => the range's first part should be visible first
            alignItems        : 'center', // default center items vertically
            flexWrap          : 'nowrap', // prevents the range to wrap to the next row
            
            
            
            // positions:
            verticalAlign     : 'baseline', // range's text should be aligned with sibling text, so the range behave like <span> wrapper
            
            
            
            // // animations:
            // boxShadow      : 'initial !important', // no focus animation
            
            
            
            // children:
            ...rule(orientationBlockSelector,  { // block
                ...children('::before', {
                    ...imports([
                        fillTextLineWidthLayout(),
                    ]),
                }),
            }),
            ...rule(orientationInlineSelector, { // inline
                ...children('::before', {
                    ...imports([
                        fillTextLineHeightLayout(),
                    ]),
                }),
            }),
            ...children(inputElm, {
                // layouts:
                display: 'none', // hide the input
            }),
            ...children(trackElm, {
                ...imports([
                    usesBorderAsContainer({ // make a nicely rounded corners
                        orientationBlockSelector  : parentOrientationBlockSelector,
                        orientationInlineSelector : parentOrientationInlineSelector,
                    }),
                ]),
                ...style({
                    // layouts:
                    display        : 'flex',    // use block flexbox, so it takes the entire Range's width
                    flexDirection  : 'inherit', // customizable orientation // inherit to parent flexbox
                    justifyContent : 'start',   // if thumb is not growable, the excess space (if any) placed at the end, and if no sufficient space available => the thumb's first part should be visible first
                    alignItems     : 'center',  // center thumb vertically
                    flexWrap       : 'nowrap',  // no wrapping
                    
                    
                    
                    // sizes:
                    boxSizing      : 'border-box',     // the final size is including borders & paddings
                    flex           : [[1, 1, '100%']], // growable, shrinkable, initial 100% parent's width
                    
                    
                    
                    // animations:
                    boxShadow      : 'initial !important', // no focus animation
                    
                    
                    
                    // children:
                    ...children([trackLowerElm, trackUpperElm], {
                        // layouts:
                        display   : 'inline-block', // use inline-block, so it takes the width & height as we set
                        
                        
                        
                        // backgrounds:
                        backg : rangeVarRefs.backg,
                        
                        
                        
                        // borders:
                        ...expandBorderRadius(), // expand borderRadius css vars
                        // remove rounded corners on top:
                        [borderRadiusDecls.borderStartStartRadius] : '0px',
                        [borderRadiusDecls.borderStartEndRadius  ] : '0px',
                        // remove rounded corners on bottom:
                        [borderRadiusDecls.borderEndStartRadius  ] : '0px',
                        [borderRadiusDecls.borderEndEndRadius    ] : '0px',
                        
                        
                        
                        // sizes:
                        alignSelf : 'stretch',      // follows parent's height
                    }),
                    ...children(trackLowerElm, {
                        // sizes:
                        flex : [[rangeVarRefs.valueRatio, rangeVarRefs.valueRatio, 0]], // growable, shrinkable, initial from 0 width; using `valueRatio` for the grow/shrink ratio
                        
                        
                        
                        // customize:
                        ...usesGeneralProps(usesPrefixedProps(cssProps, 'tracklower')), // apply general cssProps starting with tracklower***
                    }),
                    ...children(trackUpperElm, {
                        // sizes:
                        flex : [[`calc(1 - ${rangeVarRefs.valueRatio})`, `calc(1 - ${rangeVarRefs.valueRatio})`, 0]], // growable, shrinkable, initial from 0 width; using `1 - valueRatio` for the grow/shrink ratio
                        
                        
                        
                        // customize:
                        ...usesGeneralProps(usesPrefixedProps(cssProps, 'trackupper')), // apply general cssProps starting with trackupper***
                    }),
                    
                    ...children(['&', thumbElm], {
                        cursor: 'inherit',
                    }),
                    ...children(thumbElm, {
                        // layouts:
                        display   : 'inline-block', // use inline-block, so it takes the width & height as we set
                        
                        
                        
                        // sizes:
                        boxSizing : 'border-box', // the final size is including borders & paddings
                        
                        
                        
                        // customize:
                        ...usesGeneralProps(usesPrefixedProps(cssProps, 'thumb')), // apply general cssProps starting with thumb***
                        
                        
                        
                        // borders:
                        ...expandBorderRadius({ borderRadius: cssProps.thumbBorderRadius }), // expand borderRadius css vars
                        
                        
                        
                        // spacings:
                        ...expandPadding({ paddingInline: cssProps.thumbPaddingInline, paddingBlock: cssProps.thumbPaddingBlock }), // expand padding css vars
                    }),
                    
                    
                    
                    // customize:
                    ...usesGeneralProps(usesPrefixedProps(cssProps, 'track')), // apply general cssProps starting with track***
                    
                    
                    
                    // borders:
                    ...expandBorderRadius({ borderRadius: cssProps.trackBorderRadius }), // expand borderRadius css vars
                    
                    
                    
                    // spacings:
                    ...expandPadding({ paddingInline: cssProps.trackPaddingInline, paddingBlock: cssProps.trackPaddingBlock }), // expand padding css vars
                }),
            }),
            
            
            
            // customize:
            ...usesGeneralProps(cssProps), // apply general cssProps
            ...rule(orientationBlockSelector,  { // block
                // overwrites propName = propName{Block}:
                ...overwriteProps(cssDecls, usesSuffixedProps(cssProps, 'block')),
            }),
            ...rule(orientationInlineSelector, { // inline
                // overwrites propName = propName{Inline}:
                ...overwriteProps(cssDecls, usesSuffixedProps(cssProps, 'inline')),
            }),
        }),
    });
};
export const usesRangeVariants = () => {
    // dependencies:
    
    // layouts:
    const [sizes] = usesSizeVariant((sizeName) => style({
        // overwrites propName = propName{SizeName}:
        ...overwriteProps(cssDecls, usesSuffixedProps(cssProps, sizeName)),
    }));
    
    
    
    return style({
        ...imports([
            // variants:
            usesEditableControlVariants(),
            
            // layouts:
            sizes(),
        ]),
        ...variants([
            isNude({
                // animations:
                boxShadow : 'initial !important', // no focus animation on slider, but has one in thumb
            }),
        ]),
    });
};
export const usesRangeStates = () => {
    return style({
        ...imports([
            // states:
            usesEditableControlStates(),
        ]),
    });
};

export const useRangeSheet = createUseSheet(() => [
    mainComposition(
        imports([
            // layouts:
            usesRangeLayout(),
            
            // variants:
            usesRangeVariants(),
            
            // states:
            usesRangeStates(),
        ]),
    ),
], /*sheetId :*/'jue5zxlqsc'); // an unique salt for SSR support, ensures the server-side & client-side have the same generated class names



// configs:
export const [cssProps, cssDecls, cssVals, cssConfig] = createCssConfig(() => {
    return {
        // accessibilities:
        cursor               : 'col-resize',
        cursorBlock          : 'row-resize',
        
        
        
        // sizes:
        minInlineSize        : 'unset',
        minBlockSize         : 'unset',
        
        minInlineSizeBlock   : 'unset',
        minBlockSizeBlock    : '8rem',
        
        
        
        trackInlineSize      : 'auto',
        trackBlockSize       : '0.4em',
        trackBorderRadius    : borderRadiuses.pill,
        trackPaddingInline   : 0,
        trackPaddingBlock    : 0,
        
        trackInlineSizeBlock : '0.4em',
        trackBlockSizeBlock  : 'auto',
        
        trackupperFilter     : [['contrast(1.5)', 'invert(0.5)', 'saturate(0)'   ]],
        tracklowerFilter     : [['contrast(1.5)',                'saturate(0.75)']],
        
        
        
        thumbInlineSize      : '1em',
        thumbBlockSize       : '1em',
        thumbBorderRadius    : borderRadiuses.pill,
        thumbPaddingInline   : 0,
        thumbPaddingBlock    : 0,
    };
}, { prefix: 'rnge' });



// react components:

export interface RangeProps
    extends
        EditableActionControlProps<HTMLInputElement>,
        Pick<React.InputHTMLAttributes<HTMLInputElement>, 'disabled'>,
        
        // layouts:
        OrientationVariant
{
    // essentials:
    trackStyle?               : React.CSSProperties
    trackRef?                 : React.Ref<HTMLElement> // setter ref
    
    trackLowerStyle?          : React.CSSProperties
    trackLowerRef?            : React.Ref<HTMLElement> // setter ref
    
    trackUpperStyle?          : React.CSSProperties
    trackUpperRef?            : React.Ref<HTMLElement> // setter ref
    
    thumbStyle?               : React.CSSProperties
    thumbRef?                 : React.Ref<HTMLElement> // setter ref
    
    
    // semantics:
    trackTag?                 : Tag
    trackLowerTag?            : Tag
    trackUpperTag?            : Tag
    thumbTag?                 : Tag
    
    trackRole?                : Role
    trackLowerRole?           : Role
    trackUpperRole?           : Role
    thumbRole?                : Role
    
    trackSemanticTag?         : SemanticTag
    trackLowerSemanticTag?    : SemanticTag
    trackUpperSemanticTag?    : SemanticTag
    thumbSemanticTag?         : SemanticTag
    
    trackSemanticRole?        : SemanticRole
    trackLowerSemanticRole?   : SemanticRole
    trackUpperSemanticRole?   : SemanticRole
    thumbSemanticRole?        : SemanticRole
    
    
    // classes:
    trackMainClass?           : Optional<string>
    trackClasses?             : Optional<string>[]
    trackVariantClasses?      : Optional<string>[]
    trackStateClasses?        : Optional<string>[]
    
    trackLowerMainClass?      : Optional<string>
    trackLowerClasses?        : Optional<string>[]
    trackLowerVariantClasses? : Optional<string>[]
    trackLowerStateClasses?   : Optional<string>[]
    
    trackUpperMainClass?      : Optional<string>
    trackUpperClasses?        : Optional<string>[]
    trackUpperVariantClasses? : Optional<string>[]
    trackUpperStateClasses?   : Optional<string>[]
    
    thumbMainClass?           : Optional<string>
    thumbClasses?             : Optional<string>[]
    thumbVariantClasses?      : Optional<string>[]
    thumbStateClasses?        : Optional<string>[]
    
    
    // validations:
    min?      : string | number
    max?      : string | number
    step?     : string | number
}
export function Range(props: RangeProps) {
    // styles:
    const sheet = useRangeSheet();
    
    
    
    // rest props:
    const {
        // essentials:
        elmRef,
        
        trackStyle,
        trackRef,
        
        trackLowerStyle,
        trackLowerRef,
        
        trackUpperStyle,
        trackUpperRef,
        
        thumbStyle,
        thumbRef,
        
        
        // semantics:
        trackTag,
        trackLowerTag,
        trackUpperTag,
        thumbTag,
        
        trackRole,
        trackLowerRole,
        trackUpperRole,
        thumbRole,
        
        trackSemanticTag,
        trackLowerSemanticTag,
        trackUpperSemanticTag,
        thumbSemanticTag,
        
        trackSemanticRole,
        trackLowerSemanticRole,
        trackUpperSemanticRole,
        thumbSemanticRole,
        
        
        // classes:
        trackMainClass,
        trackClasses,
        trackVariantClasses,
        trackStateClasses,
        
        trackLowerMainClass,
        trackLowerClasses,
        trackLowerVariantClasses,
        trackLowerStateClasses,
        
        trackUpperMainClass,
        trackUpperClasses,
        trackUpperVariantClasses,
        trackUpperStateClasses,
        
        thumbMainClass,
        thumbClasses,
        thumbVariantClasses,
        thumbStateClasses,
        
        
        // accessibilities:
        autoFocus,
        
        
        // values:
        name,
        form,
        defaultValue,
        value,
        onChange, // forwards to `input[type]`
        
        
        // validations:
        required,
        min,
        max,
        step,
    ...restProps}  = props;
    
    
    
    // fn props:
    const propEnabled    = usePropEnabled(props);
    const propReadOnly   = usePropReadOnly(props);
    const nude           = props.nude ?? true;
    const theme          = props.theme ?? 'primary';
 // const themeAlternate = ((theme !== 'secondary') ? 'secondary' : 'primary');
 // const themeAlternate = 'secondary';
    const mild           = props.mild ?? false;
    const mildAlternate  = nude ? mild : !mild;
    
    
    
    // variants:
    const orientationVariant  = useOrientationVariant(props);
    const orientationVertical = (orientationVariant.class === 'block');
    
    
    
    // states:
    const focusBlurState      = useFocusBlurState(props);
    const arriveLeaveState    = useArriveLeaveState(props, focusBlurState);
    const pressReleaseState   = usePressReleaseState(props);
    
    
    
    // fn props:
    const valueCtrl      : number|null = parseNumber(value);
    const minFn          : number      = parseNumber(min)  ?? 0;
    const maxFn          : number      = parseNumber(max)  ?? 100;
    const stepFn         : number      = (step === 'any') ? 0 : Math.abs(parseNumber(step) ?? 1);
    const negativeFn     : boolean     = (maxFn < minFn);
    const defaultValueFn : number      = (minFn + ((maxFn - minFn) / 2));
    
    
    
    // dom effects:
    const inputRef  = useRef<HTMLInputElement|null>(null);
    const trackRef2 = useRef<HTMLInputElement|null>(null);
    const thumbRef2 = useRef<HTMLInputElement|null>(null);
    
    
    
    // utilities:
    const trimValue = useCallback((value: number): number => {
        // make sure the requested value is between the min value & max value:
        value     = Math.min(Math.max(
            value
        , (negativeFn ? maxFn : minFn)), (negativeFn ? minFn : maxFn));
        
        // if step was specified => stepping the value starting from min value:
        if (stepFn > 0) {
            let steps    = Math.round((value - minFn) / stepFn); // get the_nearest_stepped_value
            
            // make sure the_nearest_stepped_value is not exceeded the max value:
            let maxSteps = (maxFn - minFn) / stepFn;
            maxSteps     = negativeFn ? Math.ceil(maxSteps) : Math.floor(maxSteps); // remove the decimal fraction
            
            // re-align the steps:
            steps        = negativeFn ? Math.max(steps, maxSteps) : Math.min(steps, maxSteps);
            
            // calculate the new value:
            value        = minFn + (steps * stepFn);
        } // if
        
        return value;
    }, [minFn, maxFn, stepFn, negativeFn]); // (re)create the function on every time the constraints changes
    
    
    
    // states:
    interface ValueReducerAction {
        type    : 'setValue'|'setValueRatio'|'decrease'|'increase'
        payload : number
    }
    const [valueDn, setValueDn]    = useReducer(useCallback((value: number, action: ValueReducerAction): number => {
        switch (action.type) {
            case 'setValue': {
                return trimValue(action.payload);
            }
            case 'setValueRatio': {
                let valueRatio = action.payload;
                
                // make sure the valueRatio is between 0 & 1:
                valueRatio     = Math.min(Math.max(
                    valueRatio
                , 0), 1);
                
                return trimValue(minFn + ((maxFn - minFn) * valueRatio));
            }
            
            case 'decrease' : {
                return trimValue(value - ((stepFn || 1) * (negativeFn ? -1 : 1) * (action.payload)));
            }
            case 'increase' : {
                return trimValue(value + ((stepFn || 1) * (negativeFn ? -1 : 1) * (action.payload)));
            }
            
            default:
                return value; // no change
        } // switch
    }, [minFn, maxFn, stepFn, negativeFn, trimValue]) /* (re)create the reducer function on every time the constraints changes */, /*initialState: */valueCtrl ?? parseNumber(defaultValue) ?? trimValue(defaultValueFn));
    const prevValueDn = useRef<number>(valueDn);
    
    
    
    // fn props:
    const valueRaw       : number = valueCtrl /*controllable*/ ?? valueDn /*uncontrollable*/;
    const valueFn        : number = trimValue(valueRaw);
    const valueRatio     : number = (valueFn - minFn) / (maxFn - minFn);
    
    
    
    // dom effects:
    const hasLoaded      = useRef<boolean>(false);
    useEffect(() => {
        if (hasLoaded.current) return; // the effect should only run once
        hasLoaded.current = true;
        
        
        
        if (valueRaw !== valueFn) {
            setValueDn({ type: 'setValue', payload: valueFn });
        } // if
    }, [valueRaw, valueFn]); // the effect should only run once
    
    useEffect(() => {
        if (prevValueDn.current !== valueDn) {
            prevValueDn.current = valueDn;
            
            
            
            const inputElm = inputRef.current;
            if (inputElm) {
                inputElm.valueAsNumber = valueDn;
                triggerChange(inputElm);
            } // if
        } // if
    }, [valueDn]);
    
    
    
    // handlers:
    const handleTouchSlider    = (e: React.TouchEvent<HTMLInputElement>) => {
        if (e.touches.length === 1) { // only one finger touch
            handleMouseSlider({
                defaultPrevented : e.defaultPrevented,
                preventDefault   : e.preventDefault,
                
                currentTarget    : e.currentTarget,
                
                buttons          : 1, // simulate left_click
                clientX          : e.touches[0].clientX,
                clientY          : e.touches[0].clientY,
            } as React.MouseEvent<HTMLInputElement, MouseEvent>);
        } // if
    };
    const handleMouseSlider    = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
        if (!e.defaultPrevented) {
            if (!propEnabled)    return; // control is disabled => no response required
            if (propReadOnly)    return; // control is readOnly => no response required
            if (e.buttons !== 1) return; // only handle left_click only
            
            
            
            const track        = trackRef2.current ?? e.currentTarget;
            const rect         = track.getBoundingClientRect();
            
            const style        = getComputedStyle(track);
            const borderStart  = (Number.parseInt(orientationVertical ? style.borderTopWidth : style.borderLeftWidth) || 0);
            const paddingStart = (Number.parseInt(orientationVertical ? style.paddingTop     : style.paddingLeft    ) || 0);
            const paddingEnd   = (Number.parseInt(orientationVertical ? style.paddingBottom  : style.paddingRight   ) || 0);
            const thumbSize    = (orientationVertical ? thumbRef2.current?.offsetHeight : thumbRef2.current?.offsetWidth) ?? 0;
            const trackSize    = ((orientationVertical ? track.clientHeight : track.clientWidth) - paddingStart - paddingEnd - thumbSize);
            
            const cursorStart  = (orientationVertical ? e.clientY : e.clientX) - (orientationVertical ? rect.top : rect.left) - borderStart - paddingStart - (thumbSize / 2);
            // if ((cursorStart < 0) || (cursorStart > trackSize)) return; // setValueRatio will take care of this
            
            let valueRatio     = cursorStart / trackSize;
            if (orientationVertical || (style.direction === 'rtl')) valueRatio = (1 - valueRatio);
            
            setValueDn({ type: 'setValueRatio', payload: valueRatio });
            
            
            
            pressReleaseState.handlePress();
            e.currentTarget.focus();
            e.preventDefault();
        } // if
    };
    const handleKeyboardSlider = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (!e.defaultPrevented) {
            if (!propEnabled)    return; // control is disabled => no response required
            if (propReadOnly)    return; // control is readOnly => no response required
            
            
            
            if (((): boolean => {
                const isKeyOf = (keys: string[]): boolean => {
                    return (keys.includes(e.key.toLowerCase()) || keys.includes(e.code.toLowerCase()));
                };
                const isRtl = (getComputedStyle(e.currentTarget).direction === 'rtl');
                
                
                
                     if (!orientationVertical && !isRtl && isKeyOf(['arrowleft' , 'pagedown'])) setValueDn({ type: 'decrease', payload: 1     });
                else if (!orientationVertical && !isRtl && isKeyOf(['arrowright', 'pageup'  ])) setValueDn({ type: 'increase', payload: 1     });
                
                else if (!orientationVertical &&  isRtl && isKeyOf(['arrowright', 'pagedown'])) setValueDn({ type: 'decrease', payload: 1     });
                else if (!orientationVertical &&  isRtl && isKeyOf(['arrowleft' , 'pageup'  ])) setValueDn({ type: 'increase', payload: 1     });
                
                else if ( orientationVertical &&           isKeyOf(['arrowdown' , 'pagedown'])) setValueDn({ type: 'decrease', payload: 1     });
                else if ( orientationVertical &&           isKeyOf(['arrowup'   , 'pageup'  ])) setValueDn({ type: 'increase', payload: 1     });
                
                else if (                                  isKeyOf(['home'                  ])) setValueDn({ type: 'setValue', payload: minFn });
                else if (                                  isKeyOf(['end'                   ])) setValueDn({ type: 'setValue', payload: maxFn });
                else return false; // not handled
                
                
                
                return true; // handled
            })()) {
                pressReleaseState.handlePress();
                e.preventDefault();
            } // if
        } // if
    };
    
    
    
    // range vars:
    const [, , rangeVarDecls] = usesRangeVars();
    
    
    
    // jsx fn props:
    const trackLower = (
        <Element
            // essentials:
            elmRef={(elm) => {
                setRef(trackLowerRef , elm);
            }}
            
            
            // semantics:
            tag ={trackLowerTag }
            role={trackLowerRole}
            semanticTag ={trackLowerSemanticTag }
            semanticRole={trackLowerSemanticRole}
            
            
            // classes:
            mainClass={trackLowerMainClass}
            classes={[...(trackLowerClasses ?? []),
                'tracklower',
            ]}
            variantClasses={trackLowerVariantClasses}
            stateClasses={trackLowerStateClasses}
            
            
            // styles:
            style={trackLowerStyle}
        >
        </Element>
    );
    const trackUpper = (
        <Element
            // essentials:
            elmRef={(elm) => {
                setRef(trackUpperRef , elm);
            }}
            
            
            // semantics:
            tag ={trackUpperTag }
            role={trackUpperRole}
            semanticTag ={trackUpperSemanticTag }
            semanticRole={trackUpperSemanticRole}
            
            
            // classes:
            mainClass={trackUpperMainClass}
            classes={[...(trackUpperClasses ?? []),
                'trackupper',
            ]}
            variantClasses={trackUpperVariantClasses}
            stateClasses={trackUpperStateClasses}
            
            
            // styles:
            style={trackUpperStyle}
        >
        </Element>
    );
    
    
    
    // jsx:
    return (
        <EditableControl<HTMLInputElement>
            // other props:
            {...restProps}
            
            
            // semantics:
            semanticTag ={props.semanticTag  ?? [null]  }
            semanticRole={props.semanticRole ?? 'slider'}
            
            aria-orientation={props['aria-orientation'] ?? (orientationVertical ? 'vertical' : 'horizontal')}
            aria-valuenow   ={props['aria-valuenow'   ] ?? valueFn}
            aria-valuemin   ={props['aria-valuemin'   ] ?? (negativeFn ? maxFn : minFn)}
            aria-valuemax   ={props['aria-valuemax'   ] ?? (negativeFn ? minFn : maxFn)}
            
            
            // variants:
            nude={nude}
            theme={theme}
            mild={mild}
            
            
            // classes:
            mainClass={props.mainClass ?? sheet.main}
            variantClasses={[...(props.variantClasses ?? []),
                orientationVariant.class,
            ]}
            stateClasses={[...(props.stateClasses ?? []),
                focusBlurState.class,
                arriveLeaveState.class,
            ]}
            
            
            // styles:
            style={{...(props.style ?? {}),
                // values:
                [rangeVarDecls.valueRatio]: valueRatio,
            }}
            
            
            // events:
            onFocus=        {(e) => { props.onFocus?.(e);      focusBlurState.handleFocus();        }}
            onBlur=         {(e) => { props.onBlur?.(e);       focusBlurState.handleBlur();         }}
            onMouseEnter=   {(e) => { props.onMouseEnter?.(e); arriveLeaveState.handleMouseEnter(); }}
            onMouseLeave=   {(e) => { props.onMouseLeave?.(e); arriveLeaveState.handleMouseLeave(); }}
            
            onMouseDown=    {(e) => {
                props.onMouseDown?.(e);
                
                
                
                handleMouseSlider(e);
            }}
            onMouseMove=    {(e) => {
                props.onMouseMove?.(e);
                
                
                
                handleMouseSlider(e);
            }}
            onTouchStart=   {(e) => {
                props.onTouchStart?.(e);
                
                
                
                handleTouchSlider(e);
            }}
            onTouchMove=    {(e) => {
                props.onTouchMove?.(e);
                
                
                
                handleTouchSlider(e);
            }}
            onKeyDown=      {(e) => {
                props.onKeyDown?.(e);
                
                
                
                handleKeyboardSlider(e);
            }}
            
            onAnimationEnd= {(e) => {
                props.onAnimationEnd?.(e);
                
                
                
                // states:
                focusBlurState.handleAnimationEnd(e);
                arriveLeaveState.handleAnimationEnd(e);
            }}
        >
            <input
                // essentials:
                ref={(elm) => {
                    setRef(elmRef, elm);
                    setRef(inputRef, elm);
                }}
                
                
                // accessibilities:
                {...{
                    autoFocus,
                    tabIndex : -1, // non focusable
                }}
                
                disabled={!propEnabled} // do not submit the value if disabled
                readOnly={propReadOnly} // locks the value if readOnly
                
                
                // values:
                {...{
                    name,
                    form,
                    // defaultValue,
                    value : valueFn,
                }}
                
                
                // validations:
                {...{
                    required,
                    min  : negativeFn ? trimValue(maxFn) : minFn,
                    max  : negativeFn ? minFn            : maxFn,
                    step : stepFn,
                }}
                
                
                // formats:
                {...{
                    type : 'range',
                }}
                
                
                // events:
                onChange={(e) => {
                    onChange?.(e);
                    
                    
                    
                    // then do nothing here, just for satisfying React for controllable readonly input
                    // passing `onChange={undefined}` causing React unhappy
                }}
            />
            <EditableControl<HTMLInputElement>
                // essentials:
                elmRef={(elm) => {
                    setRef(trackRef , elm);
                    setRef(trackRef2, elm);
                }}
                
                
                // semantics:
                tag ={trackTag }
                role={trackRole}
                semanticTag ={trackSemanticTag }
                semanticRole={trackSemanticRole}
                
                
                // accessibilities:
                tabIndex={-1} // negative [tabIndex] => act as *wrapper* element, if input is `:focus` (pseudo) => the wrapper is also `.focus` (synthetic)
                arrive={arriveLeaveState.arrive}
                
                
                // variants:
                theme={theme}
                mild={mild}
                
                
                // classes:
                mainClass={trackMainClass}
                classes={[...(trackClasses ?? []),
                    'track',
                ]}
                variantClasses={trackVariantClasses}
                stateClasses={trackStateClasses}
                
                
                // styles:
                style={trackStyle}
            >
                { orientationVertical ? trackUpper : trackLower }
                <EditableActionControl<HTMLInputElement>
                    // essentials:
                    elmRef={(elm) => {
                        setRef(thumbRef , elm);
                        setRef(thumbRef2, elm);
                    }}
                    
                    
                    // semantics:
                    tag ={thumbTag }
                    role={thumbRole}
                    semanticTag ={thumbSemanticTag }
                    semanticRole={thumbSemanticRole}
                    
                    
                    // accessibilities:
                    tabIndex={-1} // negative [tabIndex] => act as *wrapper* element, if input is `:focus` (pseudo) => the wrapper is also `.focus` (synthetic)
                    focus={focusBlurState.focus}
                    arrive={arriveLeaveState.arrive}
                    
                    
                    
                    // variants:
                    theme={theme}
                    mild={mildAlternate}
                    
                    
                    // classes:
                    mainClass={thumbMainClass}
                    classes={[...(thumbClasses ?? []),
                        'thumb',
                    ]}
                    variantClasses={thumbVariantClasses}
                    stateClasses={[...(thumbStateClasses ?? []),
                        pressReleaseState.class,
                    ]}
                    
                    
                    // styles:
                    style={thumbStyle}
                    
                    
                    // events:
                    onAnimationEnd={pressReleaseState.handleAnimationEnd}
                >
                </EditableActionControl>
                { orientationVertical ? trackLower : trackUpper }
            </EditableControl>
        </EditableControl>
    );
}
export { Range as default }

export type { OrientationName, OrientationVariant }
