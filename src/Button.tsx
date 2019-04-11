import * as React from 'react';

import { IBoxCSS } from './Box';
import { Flex, IFlex } from './Flex';
import { ITheme, useTheme } from './theme';

// TODO better active styling

export interface IButton extends IFlex {
  disabled?: boolean;
}

const Button: React.FunctionComponent<IButton> = React.forwardRef<HTMLButtonElement, IButton>(function Button(
  props,
  ref
) {
  const { as = 'button', css, ...rest } = props;

  const { button } = useTheme();

  return (
    <Flex
      px={11}
      py={7}
      borderRadius={2}
      {...rest}
      as={as}
      ref={ref}
      alignItems="center"
      css={[buttonStyles(button, props), css]}
    />
  );
});

Button.displayName = 'Button';

export const buttonStyles = (theme: ITheme['button'], { disabled }: IButton = {}): IBoxCSS => {
  return [
    {
      color: theme.fg,
      backgroundColor: theme.bg,
      borderColor: theme.border,

      appearance: 'none',
      cursor: 'pointer',

      ':focus': {
        outline: 'none',
      },

      ':hover': {
        backgroundColor: theme.hoverBg,
        color: theme.hoverFg,
      },

      ':active': {
        borderStyle: 'solid',
      },
    },

    disabled && {
      opacity: 0.6,
      cursor: 'not-allowed',

      ':hover': {
        backgroundColor: theme.bg,
      },
    },
  ];
};

export { Button };