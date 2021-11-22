import { default as React } from 'react';
import type { Optional } from '@cssfn/types';
import { Tag, Role, SemanticTag, SemanticRole } from '@nodestrap/element';
import { OrientationName, OrientationRuleOptions, OrientationVariant, NudeVariant } from '@nodestrap/basic';
import { EditableActionControlProps } from '@nodestrap/editable-action-control';
export declare const defaultOrientationRuleOptions: OrientationRuleOptions;
export interface RangeVars {
    /**
     * Range's thumb ratio.
     */
    valueRatio: any;
    /**
     * final background layers of the Range.
     */
    backg: any;
}
/**
 * Uses Range variables.
 * @returns A `[Factory<StyleCollection>, ReadonlyRefs, ReadonlyDecls]` represents Range variables definitions.
 */
export declare const usesRangeVars: () => readonly [() => import("@cssfn/cssfn").StyleCollection, import("@cssfn/css-var").ReadonlyRefs<RangeVars>, import("@cssfn/css-var").ReadonlyDecls<RangeVars>];
export declare const inputElm = ":first-child";
export declare const trackElm = ".track";
export declare const trackLowerElm = ".tracklower";
export declare const trackUpperElm = ".trackupper";
export declare const thumbElm = ".thumb";
export declare const usesRangeLayout: (options?: OrientationRuleOptions | undefined) => import("@cssfn/cssfn").StyleCollection;
export declare const usesRangeVariants: () => import("@cssfn/cssfn").StyleCollection;
export declare const usesRangeStates: () => import("@cssfn/cssfn").StyleCollection;
export declare const useRangeSheet: import("@cssfn/types").Factory<import("jss").Classes<"main">>;
export declare const cssProps: import("@cssfn/css-config").Refs<{
    cursor: string;
    cursorBlock: string;
    minInlineSize: string;
    minBlockSize: string;
    minInlineSizeBlock: string;
    minBlockSizeBlock: string;
    trackInlineSize: string;
    trackBlockSize: string;
    trackBorderRadius: import("@cssfn/css-types").Cust.Ref;
    trackPaddingInline: number;
    trackPaddingBlock: number;
    trackInlineSizeBlock: string;
    trackBlockSizeBlock: string;
    trackupperFilter: string[][];
    tracklowerFilter: string[][];
    thumbInlineSize: string;
    thumbBlockSize: string;
    thumbBorderRadius: import("@cssfn/css-types").Cust.Ref;
    thumbPaddingInline: number;
    thumbPaddingBlock: number;
}>, cssDecls: import("@cssfn/css-config").Decls<{
    cursor: string;
    cursorBlock: string;
    minInlineSize: string;
    minBlockSize: string;
    minInlineSizeBlock: string;
    minBlockSizeBlock: string;
    trackInlineSize: string;
    trackBlockSize: string;
    trackBorderRadius: import("@cssfn/css-types").Cust.Ref;
    trackPaddingInline: number;
    trackPaddingBlock: number;
    trackInlineSizeBlock: string;
    trackBlockSizeBlock: string;
    trackupperFilter: string[][];
    tracklowerFilter: string[][];
    thumbInlineSize: string;
    thumbBlockSize: string;
    thumbBorderRadius: import("@cssfn/css-types").Cust.Ref;
    thumbPaddingInline: number;
    thumbPaddingBlock: number;
}>, cssVals: import("@cssfn/css-config").Vals<{
    cursor: string;
    cursorBlock: string;
    minInlineSize: string;
    minBlockSize: string;
    minInlineSizeBlock: string;
    minBlockSizeBlock: string;
    trackInlineSize: string;
    trackBlockSize: string;
    trackBorderRadius: import("@cssfn/css-types").Cust.Ref;
    trackPaddingInline: number;
    trackPaddingBlock: number;
    trackInlineSizeBlock: string;
    trackBlockSizeBlock: string;
    trackupperFilter: string[][];
    tracklowerFilter: string[][];
    thumbInlineSize: string;
    thumbBlockSize: string;
    thumbBorderRadius: import("@cssfn/css-types").Cust.Ref;
    thumbPaddingInline: number;
    thumbPaddingBlock: number;
}>, cssConfig: import("@cssfn/css-config").CssConfigSettings;
export interface RangeProps extends EditableActionControlProps<HTMLInputElement>, Pick<React.InputHTMLAttributes<HTMLInputElement>, 'disabled'>, OrientationVariant, NudeVariant {
    trackStyle?: React.CSSProperties;
    trackRef?: React.Ref<HTMLElement>;
    trackLowerStyle?: React.CSSProperties;
    trackLowerRef?: React.Ref<HTMLElement>;
    trackUpperStyle?: React.CSSProperties;
    trackUpperRef?: React.Ref<HTMLElement>;
    thumbStyle?: React.CSSProperties;
    thumbRef?: React.Ref<HTMLElement>;
    trackTag?: Tag;
    trackLowerTag?: Tag;
    trackUpperTag?: Tag;
    thumbTag?: Tag;
    trackRole?: Role;
    trackLowerRole?: Role;
    trackUpperRole?: Role;
    thumbRole?: Role;
    trackSemanticTag?: SemanticTag;
    trackLowerSemanticTag?: SemanticTag;
    trackUpperSemanticTag?: SemanticTag;
    thumbSemanticTag?: SemanticTag;
    trackSemanticRole?: SemanticRole;
    trackLowerSemanticRole?: SemanticRole;
    trackUpperSemanticRole?: SemanticRole;
    thumbSemanticRole?: SemanticRole;
    trackMainClass?: Optional<string>;
    trackClasses?: Optional<string>[];
    trackVariantClasses?: Optional<string>[];
    trackStateClasses?: Optional<string>[];
    trackLowerMainClass?: Optional<string>;
    trackLowerClasses?: Optional<string>[];
    trackLowerVariantClasses?: Optional<string>[];
    trackLowerStateClasses?: Optional<string>[];
    trackUpperMainClass?: Optional<string>;
    trackUpperClasses?: Optional<string>[];
    trackUpperVariantClasses?: Optional<string>[];
    trackUpperStateClasses?: Optional<string>[];
    thumbMainClass?: Optional<string>;
    thumbClasses?: Optional<string>[];
    thumbVariantClasses?: Optional<string>[];
    thumbStateClasses?: Optional<string>[];
    min?: string | number;
    max?: string | number;
    step?: string | number;
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
}
export declare function Range(props: RangeProps): JSX.Element;
export { Range as default };
export type { OrientationName, OrientationVariant };
