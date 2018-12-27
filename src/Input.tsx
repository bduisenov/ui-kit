/* @jsx jsx */

import { jsx } from '@emotion/core';
import noop = require('lodash/noop');
import { FunctionComponent, SyntheticEvent, useState } from 'react';
import AutosizeInput from 'react-input-autosize';

import { Box, IBox } from './Box';
import { useTheme } from './theme';

export type InputValue = boolean | number | string | undefined;

const AutosizeWrapper: FunctionComponent<Partial<{ className: string }>> = ({ className, ...props }) => (
  <AutosizeInput inputClassName={className} {...props} />
);

export const Input: FunctionComponent<IInput> = props => {
  const { as = 'input', autosize, onChange = noop, type, ...rest } = props;

  const css = inputStyles(props);

  const [value, setValue] = useState<InputValue>(props.value);
  // todo: do we want controlled mode here?
  const internalValue = props.hasOwnProperty('value') ? props.value : value;

  const handleChange = (event: SyntheticEvent<HTMLInputElement>) => {
    // fixme: might not work with boolean inputs such as radio/checkbox
    setValue(event.currentTarget.value);
    onChange(event);
  };

  if (autosize) {
    return (
      <Box
        as={AutosizeWrapper}
        placeholderIsMinWidth
        {...rest}
        value={internalValue}
        onChange={handleChange}
        type={type}
        css={css}
      />
    );
  }

  return <Box {...rest} as={as} value={internalValue} onChange={handleChange} type={type} css={css} />;
};

export interface IInput extends IInputProps, IBox<HTMLInputElement> {}

export interface IInputProps {
  autosize?: boolean;
}

const inputStyles = ({ disabled }: IInput) => {
  const theme = useTheme();

  return [
    {
      padding: '2px 4px',
      border: `1px solid ${theme.input.border}`,
      borderRadius: '2px',
      color: theme.input.fg,
      backgroundColor: theme.input.bg,

      ':focus': {
        outline: 'none',
        opacity: 1,
      },
    },
    disabled && {
      cursor: 'not-allowed',
      opacity: 0.6,
    },
  ];
};
