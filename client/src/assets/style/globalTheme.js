const deviceSize = {
  desktop: '1920px',
  labtop: '1024px',
  tablet: '768px',
  mobile: '450px'
};

const device = {
  desktop: `only screen and (max-width: ${deviceSize.desktop})`,
  labtop: `only screen and (max-width: ${deviceSize.labtop})`,
  tablet: `only screen and (max-width: ${deviceSize.tablet})`,
  mobile: `only screen and (max-width: ${deviceSize.mobile})`
};

const colors = {
  primary: '#c3aed6',
  success: '#2d884d',
  warning: '#fbc687',
  danger: '#d35d6e',
  white: '#ffffff',
  black: '#222831',
  lightGray: '#dedede',
  gray: '#bbbbbb',
  darkGray: '#393e46'
};

const theme = {
  device,
  colors
};

export default theme;