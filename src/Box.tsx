/* @jsx jsx */

import { Interpolation, jsx } from '@emotion/core';
import pickBy = require('lodash/pickBy');
import { CSSProperties, forwardRef, HTMLAttributes } from 'react';
import * as ss from 'styled-system';

import flattenDeep = require('lodash/flattenDeep');

import * as sl from './styles';
import { useTheme } from './theme';
import { validPropsPicker } from './utils/validPropsPicker';

const Box: React.FunctionComponent<IBox<HTMLOrSVGElement>> = forwardRef<HTMLOrSVGElement, IBox<HTMLOrSVGElement>>(
  function Box(props, ref) {
    /** Pull all props out of ...rest so that they don't show up on the rendered <div> as props (noisy) */
    const {
      as = 'div',
      children,
      style,
      border,
      borderTop,
      borderBottom,
      borderLeft,
      borderRight,
      borderRadius,
      boxShadow,
      boxSizing,
      cursor,
      display,
      fontSize,
      fontWeight,
      fontStyle,
      lineHeight,
      letterSpacing,
      m,
      mt,
      mb,
      ml,
      mr,
      mx,
      my,
      p,
      pt,
      pb,
      pl,
      pr,
      px,
      py,
      flex,
      alignSelf,
      textAlign,
      textOverflow,
      position,
      top,
      bottom,
      left,
      right,
      zIndex,
      height,
      minHeight,
      maxHeight,
      width,
      minWidth,
      maxWidth,
      opacity,
      overflow,
      overflowX,
      overflowY,
      textDecoration,
      textDecorationColor,
      textTransform,
      color,
      backgroundColor,
      borderColor,
      transform,
      whiteSpace,
      visibility,

      css,
      ...rest
    } = props;

    const theme = useTheme();

    /** Add all the supported styles, passing in the relevant props. */
    const styles: IBoxCSS = [
      sl.color({ color, backgroundColor }),
      ss.borders({ border, borderTop, borderBottom, borderLeft, borderRight }),
      ss.borderRadius({ borderRadius }),
      ss.borderColor({ borderColor }),
      ss.boxShadow({ boxShadow }),
      sl.boxSizing({ boxSizing }),
      // requires theme
      sl.space({ theme, m, mt, mb, ml, mr, mx, my, p, pt, pb, pl, pr, px, py }),
      ss.flex({ flex }),
      ss.alignSelf({ alignSelf }),

      ss.textAlign({ textAlign }),
      ss.lineHeight({ lineHeight }),
      ss.fontSize({ fontSize }),
      ss.fontWeight({ fontWeight }),
      ss.fontStyle({ fontStyle }),
      ss.letterSpacing({ letterSpacing }),

      ss.display({ display }),
      ss.height({ height }),
      ss.minHeight({ minHeight }),
      ss.maxHeight({ maxHeight }),
      ss.width({ width }),
      ss.minWidth({ minWidth }),
      ss.maxWidth({ maxWidth }),

      ss.position({ position }),
      ss.top({ top }),
      ss.bottom({ bottom }),
      ss.left({ left }),
      ss.right({ right }),
      ss.zIndex({ zIndex }),

      ss.opacity({ opacity }),

      sl.textOverflow({ textOverflow }),
      sl.transform({ transform }),
      sl.textTransform({ textTransform }),
      sl.textDecoration({ textDecoration, textDecorationColor }),
      sl.cursor({ cursor }),
      sl.visibility({ visibility }),
      sl.overflow({ overflow, overflowX, overflowY }),
      sl.whiteSpace({ whiteSpace }),
    ];

    /** Component provided defaults get pushed on first. */
    if (css) styles.unshift(...flattenDeep<IBoxCSS>([css]));

    /** User provided style get pushed on last. */
    if (style) styles.push(style as IBoxCSS);

    return jsx<Partial<IBox<HTMLOrSVGElement>>>(
      as,
      {
        ...(typeof as === 'string' ? pickBy(rest, validPropsPicker) : rest),
        ref,
        css: styles,
      },
      children
    );
  }
);

Box.displayName = 'Box';

export interface IBox<T extends HTMLOrSVGElement = HTMLDivElement>
  extends HTMLAttributes<T>,
    sl.IColorProps,
    sl.ITextDecorationProps,
    sl.ITextTransformProps,
    sl.ITextOverflowProps,
    sl.IWhiteSpaceProps,
    sl.IVisibilityProps,
    sl.IOverflowProps,
    sl.ICursorProps,
    ss.BorderProps,
    ss.BorderTopProps,
    ss.BorderBottomProps,
    ss.BorderLeftProps,
    ss.BorderRightProps,
    ss.BorderRadiusProps,
    ss.BoxShadowProps,
    sl.IBoxSizingProps,
    ss.DisplayProps,
    ss.FontSizeProps,
    ss.FontWeightProps,
    ss.FontStyleProps,
    ss.LineHeightProps,
    ss.LetterSpacingProps,
    ss.SpaceProps,
    ss.FlexProps,
    ss.AlignSelfProps,
    ss.TextAlignProps,
    ss.PositionProps,
    ss.TopProps,
    ss.BottomProps,
    ss.LeftProps,
    ss.RightProps,
    ss.ZIndexProps,
    ss.HeightProps,
    ss.MinHeightProps,
    ss.MaxHeightProps,
    ss.WidthProps,
    ss.MinWidthProps,
    ss.MaxWidthProps,
    ss.OpacityProps {
  as?: any;
  children?: any;
  style?: CSSProperties;
  css?: IBoxCSS;
  [key: string]: any;
}

export type IBoxCSS = Interpolation | Interpolation[];

export { Box };