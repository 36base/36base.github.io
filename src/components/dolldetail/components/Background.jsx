import React from 'react';
import { Hidden } from 'material-ui';
import { withStyles } from 'material-ui/styles';

const style = {
  background: {
    position: 'absolute',
    left: 0,
    top: -64,
    width: '20%',
    height: 'calc(100% + 64px)',
    zIndex: 100,
  },
};

function hex2rgb(hex) {
  const value = parseInt(hex.substring(1, 7), 16);
  return [value >> 16 & 0x0000FF, value >> 8 & 0x0000FF, value & 0x0000FF];
}

function rgb2hsl(rgb) {
  const r = rgb[0] / 255;
  const g = rgb[1] / 255;
  const b = rgb[2] / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = (max + min) / 2;
  let s = h;
  const l = h;

  if (max === min) {
    h = 0;
    s = 0;
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = ((g - b) / d) + (g < b ? 6 : 0);
        break;
      case g:
        h = ((b - r) / d) + 2;
        break;
      case b:
        h = ((r - g) / d) + 4;
        break;
      default:
        break;
    }
    h /= 6;
  }

  return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
}

function lightening(hex) {
  const rgb = hex2rgb(hex);
  const hsl = rgb2hsl(rgb);

  return `hsl(${hsl[0]}, ${hsl[1]}%, ${Math.min(100, Math.round((100 + hsl[2]) / 2))}%)`;
}

export default withStyles(style)((props) => {
  const { classes, color } = props;
  const main = `linear-gradient(to right top, ${color} 50%, transparent 50%)`;
  const second = `linear-gradient(135deg, ${lightening(color)} 20%, transparent 20%)`;

  return (
    <Hidden smDown>
      <div className={classes.background} style={{ background: [main, second].join(',') }} />
    </Hidden>
  );
});
