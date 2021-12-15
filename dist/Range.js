// react:
import { default as React, useReducer, useRef, useCallback, useEffect, } from 'react'; // base technology of our nodestrap components
import { 
// compositions:
composition, mainComposition, imports, 
// layouts:
layout, vars, children, 
// rules:
variants, rule, } from '@cssfn/cssfn'; // cssfn core
import { 
// hooks:
createUseSheet, } from '@cssfn/react-cssfn'; // cssfn for react
import { createCssVar, } from '@cssfn/css-var'; // Declares & retrieves *css variables* (css custom properties).
import { createCssConfig, 
// utilities:
usesGeneralProps, usesPrefixedProps, usesSuffixedProps, overwriteProps, } from '@cssfn/css-config'; // Stores & retrieves configuration using *css custom properties* (css variables)
// nodestrap utilities:
import { borderRadiuses, } from '@nodestrap/borders'; // configurable borders & border radiuses defs
import { 
// styles:
fillTextLineHeightLayout, fillTextLineWidthLayout, } from '@nodestrap/layouts';
import { 
// utilities:
setRef, parseNumber, } from '@nodestrap/utilities';
import { 
// hooks:
usePropEnabled, usePropReadOnly, } from '@nodestrap/accessibilities';
// others libs:
// @ts-ignore
import triggerChange from 'react-trigger-change';
// nodestrap components:
import { 
// react components:
Element, } from '@nodestrap/element';
import { 
// hooks:
usesSizeVariant, defaultInlineOrientationRuleOptions, normalizeOrientationRule, usesOrientationRule, useOrientationVariant, isNude, usesNudeVariant, useNudeVariant, usesMildVariant, usesBackg, usesBorderRadius, expandBorderRadius, expandPadding, } from '@nodestrap/basic';
import { 
// hooks:
usesBorderAsContainer, } from '@nodestrap/content';
import { 
// hooks:
useFocusBlurState, useArriveLeaveState, } from '@nodestrap/control';
import { 
// hooks:
usePressReleaseState, } from '@nodestrap/action-control';
import { 
// styles:
usesEditableControlLayout, usesEditableControlVariants, usesEditableControlStates, 
// react components:
EditableControl, } from '@nodestrap/editable-control';
import { 
// react components:
EditableActionControl, } from '@nodestrap/editable-action-control';
// hooks:
// layouts:
export const defaultOrientationRuleOptions = defaultInlineOrientationRuleOptions;
const [rangeVarRefs, rangeVarDecls] = createCssVar();
/**
 * Uses Range variables.
 * @returns A `[Factory<StyleCollection>, ReadonlyRefs, ReadonlyDecls]` represents Range variables definitions.
 */
export const usesRangeVars = () => {
    // dependencies:
    const [, backgRefs] = usesBackg();
    return [
        () => composition([
            vars({
                [rangeVarDecls.backg]: backgRefs.backg,
            }),
        ]),
        rangeVarRefs,
        rangeVarDecls,
    ];
};
// styles:
export const inputElm = ':first-child';
export const trackElm = '.track';
export const trackLowerElm = '.tracklower';
export const trackUpperElm = '.trackupper';
export const thumbElm = '.thumb';
export const usesRangeLayout = (options) => {
    // options:
    options = normalizeOrientationRule(options, defaultOrientationRuleOptions);
    const [orientationBlockSelector, orientationInlineSelector] = usesOrientationRule(options);
    const parentOrientationBlockSelector = `${orientationBlockSelector}&`;
    const parentOrientationInlineSelector = `${orientationInlineSelector}&`;
    // dependencies:
    // borders:
    const [, , borderRadiusDecls] = usesBorderRadius();
    // range vars:
    const [rangeVars, rangeVarRefs] = usesRangeVars();
    return composition([
        imports([
            // layouts:
            usesEditableControlLayout(),
            // range vars:
            rangeVars(),
        ]),
        layout({
            // layouts:
            // display        : 'flex',   // customizable orientation // already defined in variant `.block`/`.inline`
            // flexDirection  : 'row',    // customizable orientation // already defined in variant `.block`/`.inline`
            justifyContent: 'start',
            alignItems: 'center',
            flexWrap: 'nowrap',
            // positions:
            verticalAlign: 'baseline',
            // // animations:
            // boxShadow      : 'initial !important', // no focus animation
            // children:
            ...children(inputElm, [
                layout({
                    // layouts:
                    display: 'none', // hide the input
                }),
            ]),
            ...children(trackElm, [
                imports([
                    usesBorderAsContainer({
                        orientationBlockSelector: parentOrientationBlockSelector,
                        orientationInlineSelector: parentOrientationInlineSelector,
                    }),
                ]),
                layout({
                    // layouts:
                    display: 'flex',
                    // flexDirection  : 'row',     // customizable orientation // already defined in variant `.block`/`.inline`
                    justifyContent: 'start',
                    alignItems: 'center',
                    flexWrap: 'nowrap',
                    // sizes:
                    boxSizing: 'border-box',
                    flex: [[1, 1, '100%']],
                    // animations:
                    boxShadow: 'initial !important',
                    // children:
                    ...children([trackLowerElm, trackUpperElm], [
                        layout({
                            // layouts:
                            display: 'inline-block',
                            // backgrounds:
                            backg: rangeVarRefs.backg,
                            // borders:
                            ...expandBorderRadius(),
                            // remove rounded corners on top:
                            [borderRadiusDecls.borderStartStartRadius]: '0px',
                            [borderRadiusDecls.borderStartEndRadius]: '0px',
                            // remove rounded corners on bottom:
                            [borderRadiusDecls.borderEndStartRadius]: '0px',
                            [borderRadiusDecls.borderEndEndRadius]: '0px',
                            // sizes:
                            alignSelf: 'stretch', // follows parent's height
                        }),
                    ]),
                    ...children(trackLowerElm, [
                        layout({
                            // sizes:
                            flex: [[rangeVarRefs.valueRatio, rangeVarRefs.valueRatio, 0]],
                            // customize:
                            ...usesGeneralProps(usesPrefixedProps(cssProps, 'tracklower')), // apply general cssProps starting with tracklower***
                        }),
                    ]),
                    ...children(trackUpperElm, [
                        layout({
                            // sizes:
                            flex: [[`calc(1 - ${rangeVarRefs.valueRatio})`, `calc(1 - ${rangeVarRefs.valueRatio})`, 0]],
                            // customize:
                            ...usesGeneralProps(usesPrefixedProps(cssProps, 'trackupper')), // apply general cssProps starting with trackupper***
                        }),
                    ]),
                    ...children(['&', thumbElm], [
                        layout({
                            cursor: 'inherit',
                        }),
                    ]),
                    ...children(thumbElm, [
                        layout({
                            // layouts:
                            display: 'inline-block',
                            // sizes:
                            boxSizing: 'border-box',
                            // customize:
                            ...usesGeneralProps(usesPrefixedProps(cssProps, 'thumb')),
                            // borders:
                            ...expandBorderRadius({ borderRadius: cssProps.thumbBorderRadius }),
                            // spacings:
                            ...expandPadding({ paddingInline: cssProps.thumbPaddingInline, paddingBlock: cssProps.thumbPaddingBlock }), // expand padding css vars
                        }),
                    ]),
                    // customize:
                    ...usesGeneralProps(usesPrefixedProps(cssProps, 'track')),
                    // borders:
                    ...expandBorderRadius({ borderRadius: cssProps.trackBorderRadius }),
                    // spacings:
                    ...expandPadding({ paddingInline: cssProps.trackPaddingInline, paddingBlock: cssProps.trackPaddingBlock }), // expand padding css vars
                }),
            ]),
            // customize:
            ...usesGeneralProps(cssProps), // apply general cssProps
        }),
        variants([
            /* the orientation variants are part of the layout, because without these variants the layout is broken */
            rule(orientationBlockSelector, [
                layout({
                    // layouts:
                    display: 'inline-flex',
                    flexDirection: 'column',
                    // children:
                    ...children('::before', [
                        imports([
                            fillTextLineWidthLayout(),
                        ]),
                    ]),
                    ...children(trackElm, [
                        layout({
                            // layouts:
                            flexDirection: 'column', // items are stacked vertically
                        }),
                    ]),
                    // overwrites propName = propName{Block}:
                    ...overwriteProps(cssDecls, usesSuffixedProps(cssProps, 'block')),
                }),
            ]),
            rule(orientationInlineSelector, [
                layout({
                    // layouts:
                    display: 'flex',
                    flexDirection: 'row',
                    // children:
                    ...children('::before', [
                        imports([
                            fillTextLineHeightLayout(),
                        ]),
                    ]),
                    ...children(trackElm, [
                        layout({
                            // layouts:
                            flexDirection: 'row', // items are stacked horizontally
                        }),
                    ]),
                    // overwrites propName = propName{Inline}:
                    ...overwriteProps(cssDecls, usesSuffixedProps(cssProps, 'inline')),
                }),
            ]),
        ]),
    ]);
};
export const usesRangeVariants = () => {
    // dependencies:
    // layouts:
    const [sizes] = usesSizeVariant((sizeName) => composition([
        layout({
            // overwrites propName = propName{SizeName}:
            ...overwriteProps(cssDecls, usesSuffixedProps(cssProps, sizeName)),
        }),
    ]));
    // colors:
    const [, mildRefs] = usesMildVariant();
    // borders:
    const [, , borderRadiusDecls] = usesBorderRadius();
    return composition([
        imports([
            // variants:
            usesEditableControlVariants(),
            // layouts:
            sizes(),
            usesNudeVariant(),
        ]),
        variants([
            isNude([
                layout({
                    // foregrounds:
                    foreg: [[mildRefs.foregFn], '!important'],
                    // borders:
                    // remove rounded corners on top:
                    [borderRadiusDecls.borderStartStartRadius]: '0px',
                    [borderRadiusDecls.borderStartEndRadius]: '0px',
                    // remove rounded corners on bottom:
                    [borderRadiusDecls.borderEndStartRadius]: '0px',
                    [borderRadiusDecls.borderEndEndRadius]: '0px',
                    // animations:
                    boxShadow: 'initial !important', // no focus animation
                }),
            ]),
        ]),
    ]);
};
export const usesRangeStates = () => {
    return composition([
        imports([
            // states:
            usesEditableControlStates(),
        ]),
    ]);
};
export const useRangeSheet = createUseSheet(() => [
    mainComposition([
        imports([
            // layouts:
            usesRangeLayout(),
            // variants:
            usesRangeVariants(),
            // states:
            usesRangeStates(),
        ]),
    ]),
], /*sheetId :*/ 'jue5zxlqsc'); // an unique salt for SSR support, ensures the server-side & client-side have the same generated class names
// configs:
export const [cssProps, cssDecls, cssVals, cssConfig] = createCssConfig(() => {
    return {
        // accessibilities:
        cursor: 'col-resize',
        cursorBlock: 'row-resize',
        // sizes:
        minInlineSize: 'unset',
        minBlockSize: 'unset',
        minInlineSizeBlock: 'unset',
        minBlockSizeBlock: '8rem',
        trackInlineSize: 'auto',
        trackBlockSize: '0.4em',
        trackBorderRadius: borderRadiuses.pill,
        trackPaddingInline: 0,
        trackPaddingBlock: 0,
        trackInlineSizeBlock: '0.4em',
        trackBlockSizeBlock: 'auto',
        trackupperFilter: [['contrast(1.5)', 'invert(0.5)', 'saturate(0)']],
        tracklowerFilter: [['contrast(1.5)', 'saturate(0.75)']],
        thumbInlineSize: '1em',
        thumbBlockSize: '1em',
        thumbBorderRadius: borderRadiuses.pill,
        thumbPaddingInline: 0,
        thumbPaddingBlock: 0,
    };
}, { prefix: 'rnge' });
export function Range(props) {
    // styles:
    const sheet = useRangeSheet();
    // rest props:
    const { 
    // essentials:
    elmRef, trackStyle, trackRef, trackLowerStyle, trackLowerRef, trackUpperStyle, trackUpperRef, thumbStyle, thumbRef, 
    // semantics:
    trackTag, trackLowerTag, trackUpperTag, thumbTag, trackRole, trackLowerRole, trackUpperRole, thumbRole, trackSemanticTag, trackLowerSemanticTag, trackUpperSemanticTag, thumbSemanticTag, trackSemanticRole, trackLowerSemanticRole, trackUpperSemanticRole, thumbSemanticRole, 
    // classes:
    trackMainClass, trackClasses, trackVariantClasses, trackStateClasses, trackLowerMainClass, trackLowerClasses, trackLowerVariantClasses, trackLowerStateClasses, trackUpperMainClass, trackUpperClasses, trackUpperVariantClasses, trackUpperStateClasses, thumbMainClass, thumbClasses, thumbVariantClasses, thumbStateClasses, 
    // accessibilities:
    autoFocus, 
    // values:
    name, form, defaultValue, value, onChange, // forwards to `input[type]`
    // validations:
    required, min, max, step, ...restProps } = props;
    // fn props:
    const propEnabled = usePropEnabled(props);
    const propReadOnly = usePropReadOnly(props);
    const nude = props.nude ?? true;
    const theme = props.theme ?? 'primary';
    // const themeAlternate = ((theme !== 'secondary') ? 'secondary' : 'primary');
    // const themeAlternate = 'secondary';
    const mild = props.mild ?? false;
    const mildAlternate = nude ? mild : !mild;
    // variants:
    const orientationVariant = useOrientationVariant(props);
    const orientationVertical = (orientationVariant.class === 'block');
    const nudeVariant = useNudeVariant({ nude });
    // states:
    const focusBlurState = useFocusBlurState(props);
    const arriveLeaveState = useArriveLeaveState(props, focusBlurState);
    const pressReleaseState = usePressReleaseState(props);
    // fn props:
    const valueCtrl = parseNumber(value);
    const minFn = parseNumber(min) ?? 0;
    const maxFn = parseNumber(max) ?? 100;
    const stepFn = (step === 'any') ? 0 : Math.abs(parseNumber(step) ?? 1);
    const negativeFn = (maxFn < minFn);
    const defaultValueFn = (minFn + ((maxFn - minFn) / 2));
    // dom effects:
    const inputRef = useRef(null);
    const trackRef2 = useRef(null);
    const thumbRef2 = useRef(null);
    // utilities:
    const trimValue = useCallback((value) => {
        // make sure the requested value is between the min value & max value:
        value = Math.min(Math.max(value, (negativeFn ? maxFn : minFn)), (negativeFn ? minFn : maxFn));
        // if step was specified => stepping the value starting from min value:
        if (stepFn > 0) {
            let steps = Math.round((value - minFn) / stepFn); // get the_nearest_stepped_value
            // make sure the_nearest_stepped_value is not exceeded the max value:
            let maxSteps = (maxFn - minFn) / stepFn;
            maxSteps = negativeFn ? Math.ceil(maxSteps) : Math.floor(maxSteps); // remove the decimal fraction
            // re-align the steps:
            steps = negativeFn ? Math.max(steps, maxSteps) : Math.min(steps, maxSteps);
            // calculate the new value:
            value = minFn + (steps * stepFn);
        } // if
        return value;
    }, [minFn, maxFn, stepFn, negativeFn]); // (re)create the function on every time the constraints changes
    const [valueDn, setValueDn] = useReducer(useCallback((value, action) => {
        switch (action.type) {
            case 'setValue': {
                return trimValue(action.payload);
            }
            case 'setValueRatio': {
                let valueRatio = action.payload;
                // make sure the valueRatio is between 0 & 1:
                valueRatio = Math.min(Math.max(valueRatio, 0), 1);
                return trimValue(minFn + ((maxFn - minFn) * valueRatio));
            }
            case 'decrease': {
                return trimValue(value - ((stepFn || 1) * (negativeFn ? -1 : 1) * (action.payload)));
            }
            case 'increase': {
                return trimValue(value + ((stepFn || 1) * (negativeFn ? -1 : 1) * (action.payload)));
            }
            default:
                return value; // no change
        } // switch
    }, [minFn, maxFn, stepFn, negativeFn, trimValue]) /* (re)create the reducer function on every time the constraints changes */, /*initialState: */ valueCtrl ?? parseNumber(defaultValue) ?? trimValue(defaultValueFn));
    const prevValueDn = useRef(valueDn);
    // fn props:
    const valueRaw = valueCtrl /*controllable*/ ?? valueDn /*uncontrollable*/;
    const valueFn = trimValue(valueRaw);
    const valueRatio = (valueFn - minFn) / (maxFn - minFn);
    // dom effects:
    const hasLoaded = useRef(false);
    useEffect(() => {
        if (hasLoaded.current)
            return; // the effect should only run once
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
    const handleMouseSlider = (e) => {
        if (!e.defaultPrevented) {
            if (!propEnabled)
                return; // control is disabled => no response required
            if (propReadOnly)
                return; // control is readOnly => no response required
            if (e.buttons !== 1)
                return; // only handle left_click only
            const track = trackRef2.current ?? e.currentTarget;
            const rect = track.getBoundingClientRect();
            const style = getComputedStyle(track);
            const borderStart = (Number.parseInt(orientationVertical ? style.borderTopWidth : style.borderLeftWidth) || 0);
            const paddingStart = (Number.parseInt(orientationVertical ? style.paddingTop : style.paddingLeft) || 0);
            const paddingEnd = (Number.parseInt(orientationVertical ? style.paddingBottom : style.paddingRight) || 0);
            const thumbSize = (orientationVertical ? thumbRef2.current?.offsetHeight : thumbRef2.current?.offsetWidth) ?? 0;
            const trackSize = ((orientationVertical ? track.clientHeight : track.clientWidth) - paddingStart - paddingEnd - thumbSize);
            const cursorStart = (orientationVertical ? e.clientY : e.clientX) - (orientationVertical ? rect.top : rect.left) - borderStart - paddingStart - (thumbSize / 2);
            // if ((cursorStart < 0) || (cursorStart > trackSize)) return; // setValueRatio will take care of this
            let valueRatio = cursorStart / trackSize;
            if (orientationVertical || (style.direction === 'rtl'))
                valueRatio = (1 - valueRatio);
            setValueDn({ type: 'setValueRatio', payload: valueRatio });
            pressReleaseState.handlePress();
            e.currentTarget.focus();
            e.preventDefault();
        } // if
    };
    const handleKeyboardSlider = (e) => {
        if (!e.defaultPrevented) {
            if (!propEnabled)
                return; // control is disabled => no response required
            if (propReadOnly)
                return; // control is readOnly => no response required
            if ((() => {
                const isKeyOf = (keys) => {
                    return (keys.includes(e.key.toLowerCase()) || keys.includes(e.code.toLowerCase()));
                };
                const isRtl = (getComputedStyle(e.currentTarget).direction === 'rtl');
                if (!orientationVertical && !isRtl && isKeyOf(['arrowleft', 'pagedown']))
                    setValueDn({ type: 'decrease', payload: 1 });
                else if (!orientationVertical && !isRtl && isKeyOf(['arrowright', 'pageup']))
                    setValueDn({ type: 'increase', payload: 1 });
                else if (!orientationVertical && isRtl && isKeyOf(['arrowright', 'pagedown']))
                    setValueDn({ type: 'decrease', payload: 1 });
                else if (!orientationVertical && isRtl && isKeyOf(['arrowleft', 'pageup']))
                    setValueDn({ type: 'increase', payload: 1 });
                else if (orientationVertical && isKeyOf(['arrowdown', 'pagedown']))
                    setValueDn({ type: 'decrease', payload: 1 });
                else if (orientationVertical && isKeyOf(['arrowup', 'pageup']))
                    setValueDn({ type: 'increase', payload: 1 });
                else if (isKeyOf(['home']))
                    setValueDn({ type: 'setValue', payload: minFn });
                else if (isKeyOf(['end']))
                    setValueDn({ type: 'setValue', payload: maxFn });
                else
                    return false; // not handled
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
    const trackLower = (React.createElement(Element
    // essentials:
    , { 
        // essentials:
        elmRef: (elm) => {
            setRef(trackLowerRef, elm);
        }, 
        // semantics:
        tag: trackLowerTag, role: trackLowerRole, semanticTag: trackLowerSemanticTag, semanticRole: trackLowerSemanticRole, 
        // classes:
        mainClass: trackLowerMainClass, classes: [...(trackLowerClasses ?? []),
            'tracklower',
        ], variantClasses: trackLowerVariantClasses, stateClasses: trackLowerStateClasses, 
        // styles:
        style: trackLowerStyle }));
    const trackUpper = (React.createElement(Element
    // essentials:
    , { 
        // essentials:
        elmRef: (elm) => {
            setRef(trackUpperRef, elm);
        }, 
        // semantics:
        tag: trackUpperTag, role: trackUpperRole, semanticTag: trackUpperSemanticTag, semanticRole: trackUpperSemanticRole, 
        // classes:
        mainClass: trackUpperMainClass, classes: [...(trackUpperClasses ?? []),
            'trackupper',
        ], variantClasses: trackUpperVariantClasses, stateClasses: trackUpperStateClasses, 
        // styles:
        style: trackUpperStyle }));
    // jsx:
    return (React.createElement(EditableControl, { ...restProps, 
        // semantics:
        semanticTag: props.semanticTag ?? [null], semanticRole: props.semanticRole ?? 'slider', "aria-orientation": props['aria-orientation'] ?? (orientationVertical ? 'vertical' : 'horizontal'), "aria-valuenow": props['aria-valuenow'] ?? valueFn, "aria-valuemin": props['aria-valuemin'] ?? (negativeFn ? maxFn : minFn), "aria-valuemax": props['aria-valuemax'] ?? (negativeFn ? minFn : maxFn), 
        // variants:
        theme: theme, mild: mild, 
        // classes:
        mainClass: props.mainClass ?? sheet.main, variantClasses: [...(props.variantClasses ?? []),
            orientationVariant.class,
            nudeVariant.class,
        ], stateClasses: [...(props.stateClasses ?? []),
            focusBlurState.class,
            arriveLeaveState.class,
        ], 
        // styles:
        style: { ...(props.style ?? {}),
            // values:
            [rangeVarDecls.valueRatio]: valueRatio,
        }, 
        // events:
        onFocus: (e) => { props.onFocus?.(e); focusBlurState.handleFocus(); }, onBlur: (e) => { props.onBlur?.(e); focusBlurState.handleBlur(); }, onMouseEnter: (e) => { props.onMouseEnter?.(e); arriveLeaveState.handleMouseEnter(); }, onMouseLeave: (e) => { props.onMouseLeave?.(e); arriveLeaveState.handleMouseLeave(); }, onMouseDown: (e) => {
            props.onMouseDown?.(e);
            handleMouseSlider(e);
        }, onMouseMove: (e) => {
            props.onMouseMove?.(e);
            handleMouseSlider(e);
        }, onKeyDown: (e) => {
            props.onKeyDown?.(e);
            handleKeyboardSlider(e);
        }, onAnimationEnd: (e) => {
            props.onAnimationEnd?.(e);
            // states:
            focusBlurState.handleAnimationEnd(e);
            arriveLeaveState.handleAnimationEnd(e);
        } },
        React.createElement("input", { 
            // essentials:
            ref: (elm) => {
                setRef(elmRef, elm);
                setRef(inputRef, elm);
            }, ...{
                autoFocus,
                tabIndex: -1, // non focusable
            }, disabled: !propEnabled, readOnly: propReadOnly, ...{
                name,
                form,
                // defaultValue,
                value: valueFn,
            }, ...{
                required,
                min: negativeFn ? trimValue(maxFn) : minFn,
                max: negativeFn ? minFn : maxFn,
                step: stepFn,
            }, ...{
                type: 'range',
            }, 
            // events:
            onChange: (e) => {
                onChange?.(e);
                // then do nothing here, just for satisfying React for controllable readonly input
                // passing `onChange={undefined}` causing React unhappy
            } }),
        React.createElement(EditableControl, { 
            // essentials:
            elmRef: (elm) => {
                setRef(trackRef, elm);
                setRef(trackRef2, elm);
            }, 
            // semantics:
            tag: trackTag, role: trackRole, semanticTag: trackSemanticTag, semanticRole: trackSemanticRole, 
            // accessibilities:
            tabIndex: -1, arrive: arriveLeaveState.arrive, 
            // variants:
            theme: theme, mild: mild, 
            // classes:
            mainClass: trackMainClass, classes: [...(trackClasses ?? []),
                'track',
            ], variantClasses: trackVariantClasses, stateClasses: trackStateClasses, 
            // styles:
            style: trackStyle },
            orientationVertical ? trackUpper : trackLower,
            React.createElement(EditableActionControl, { 
                // essentials:
                elmRef: (elm) => {
                    setRef(thumbRef, elm);
                    setRef(thumbRef2, elm);
                }, 
                // semantics:
                tag: thumbTag, role: thumbRole, semanticTag: thumbSemanticTag, semanticRole: thumbSemanticRole, 
                // accessibilities:
                tabIndex: -1, focus: focusBlurState.focus, arrive: arriveLeaveState.arrive, 
                // variants:
                theme: theme, mild: mildAlternate, 
                // classes:
                mainClass: thumbMainClass, classes: [...(thumbClasses ?? []),
                    'thumb',
                ], variantClasses: thumbVariantClasses, stateClasses: [...(thumbStateClasses ?? []),
                    pressReleaseState.class,
                ], 
                // styles:
                style: thumbStyle, 
                // events:
                onAnimationEnd: pressReleaseState.handleAnimationEnd }),
            orientationVertical ? trackLower : trackUpper)));
}
export { Range as default };
