import styled, { css, DefaultTheme } from 'styled-components'
import { darken } from 'polished'

import { ButtonProps } from '.'

export type ButtonStyledProps = Required<
  Pick<ButtonProps, 'size' | 'color' | 'bgColor' | 'fullWidth' | 'minimal' | 'iconPosition'>
> & { hasIcon: boolean }

const buttonModifiers = {
  small: (theme: DefaultTheme) => css`
    height: 3rem;
    font-size: ${theme.font.sizes.xsmall};
    padding: ${theme.spacings.xxsmall};
  `,
  medium: (theme: DefaultTheme) => css`
    height: 4rem;
    font-size: ${theme.font.sizes.small};
    padding: ${theme.spacings.xxsmall} ${theme.spacings.medium};
  `,
  large: (theme: DefaultTheme) => css`
    height: 5rem;
    font-size: ${theme.font.sizes.medium};
    padding: ${theme.spacings.xxsmall} ${theme.spacings.xlarge};
  `,
  color: (theme: DefaultTheme, color: 'black' | 'white') => css`
    color: ${theme.colors[color]};
  `,
  bgColor: (theme: DefaultTheme, bgColor: 'primary' | 'secondary') => css`
    background-color: ${theme.colors[bgColor]};
  `,
  fullWidth: () => css`
    width: 100%;
  `,
  minimal: (theme: DefaultTheme, bgColor: 'primary' | 'secondary', color: 'black' | 'white') => css`
    color: ${theme.colors[bgColor]};
    background: none;
    border: 1px solid ${theme.colors[bgColor]};

    &:hover {
      background: ${theme.colors[bgColor]};
      color: ${theme.colors[color]};
    }
  `,
  icon: (theme: DefaultTheme, iconPosition: 'left' | 'right') => css`
    ${iconPosition === 'right' &&
    css`
      flex-direction: row-reverse;
    `}

    svg {
      width: 1.6rem;
      height: 1.6rem;
      margin-bottom: 0.2rem;
      ${iconPosition === 'left'
        ? css`
            margin-right: calc(${theme.spacings.xxsmall} / 2);
          `
        : css`
            margin-left: calc(${theme.spacings.xxsmall} / 2);
          `}
    }
  `
}

export const Button = styled.button<ButtonStyledProps>`
  ${({ theme, size, color, bgColor, fullWidth, minimal, hasIcon, iconPosition }) => css`
    border: none;
    border-radius: ${theme.border.radius};
    cursor: pointer;
    outline: none;
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    transition: 0.2s ease-out;

    &:hover {
      background-color: ${darken(0.2, theme.colors[bgColor])};
    }

    ${!!size && buttonModifiers[size](theme)}
    ${!!color && buttonModifiers.color(theme, color)}
    ${!!bgColor && buttonModifiers.bgColor(theme, bgColor)}
    ${!!fullWidth && buttonModifiers.fullWidth()}
    ${!!minimal && buttonModifiers.minimal(theme, bgColor, color)}
    ${!!hasIcon && buttonModifiers.icon(theme, iconPosition)}
  `}
`