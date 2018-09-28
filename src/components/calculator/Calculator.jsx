import React from 'react';
import { TextField, Grid, Paper, Checkbox } from '@material-ui/core/';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { withStyles } from '@material-ui/core/styles';
import { injectIntl, FormattedMessage } from 'react-intl';

const style = {
  wrapper: {
    marginTop: '1em',
  },
};

class Calculator extends React.Component {
  constructor(props) {
    super(props);

    this.state = { oath: false, report: 'N/A', reportFairy: 'N/A' };

    this.oath = this.oath.bind(this);
    this.calc = this.calc.bind(this);
    this.calcFairy = this.calcFairy.bind(this);
    this.calcDoll = this.calcDoll.bind(this);
  }

  oath(e) {
    this.setState({ oath: e.target.checked }, () => this.calc());
  }

  calc() {
    this.calcDoll();
    this.calcFairy();
  }
  calcDoll() {
    const dollAccExp = [];

    dollAccExp[0] = 0;
    dollAccExp[1] = 0;
    dollAccExp[2] = 100;
    dollAccExp[3] = 300;
    dollAccExp[4] = 600;
    dollAccExp[5] = 1000;
    dollAccExp[6] = 1500;
    dollAccExp[7] = 2100;
    dollAccExp[8] = 2800;
    dollAccExp[9] = 3600;
    dollAccExp[10] = 4500;
    dollAccExp[11] = 5500;
    dollAccExp[12] = 6600;
    dollAccExp[13] = 7800;
    dollAccExp[14] = 9100;
    dollAccExp[15] = 10500;
    dollAccExp[16] = 12000;
    dollAccExp[17] = 13600;
    dollAccExp[18] = 15300;
    dollAccExp[19] = 17100;
    dollAccExp[20] = 19000;
    dollAccExp[21] = 21000;
    dollAccExp[22] = 23100;
    dollAccExp[23] = 25300;
    dollAccExp[24] = 27600;
    dollAccExp[25] = 30000;
    dollAccExp[26] = 32500;
    dollAccExp[27] = 35100;
    dollAccExp[28] = 37900;
    dollAccExp[29] = 41000;
    dollAccExp[30] = 44400;
    dollAccExp[31] = 48600;
    dollAccExp[32] = 53200;
    dollAccExp[33] = 58200;
    dollAccExp[34] = 63600;
    dollAccExp[35] = 69400;
    dollAccExp[36] = 75700;
    dollAccExp[37] = 82400;
    dollAccExp[38] = 89600;
    dollAccExp[39] = 97300;
    dollAccExp[40] = 105500;
    dollAccExp[41] = 114300;
    dollAccExp[42] = 123600;
    dollAccExp[43] = 133500;
    dollAccExp[44] = 144000;
    dollAccExp[45] = 155100;
    dollAccExp[46] = 166900;
    dollAccExp[47] = 179400;
    dollAccExp[48] = 192500;
    dollAccExp[49] = 206400;
    dollAccExp[50] = 221000;
    dollAccExp[51] = 236400;
    dollAccExp[52] = 252500;
    dollAccExp[53] = 269400;
    dollAccExp[54] = 287100;
    dollAccExp[55] = 305700;
    dollAccExp[56] = 325200;
    dollAccExp[57] = 345600;
    dollAccExp[58] = 366900;
    dollAccExp[59] = 389200;
    dollAccExp[60] = 412500;
    dollAccExp[61] = 436800;
    dollAccExp[62] = 462100;
    dollAccExp[63] = 488400;
    dollAccExp[64] = 515800;
    dollAccExp[65] = 544300;
    dollAccExp[66] = 573900;
    dollAccExp[67] = 604700;
    dollAccExp[68] = 636700;
    dollAccExp[69] = 669900;
    dollAccExp[70] = 704300;
    dollAccExp[71] = 749400;
    dollAccExp[72] = 796200;
    dollAccExp[73] = 844800;
    dollAccExp[74] = 895200;
    dollAccExp[75] = 947400;
    dollAccExp[76] = 1001400;
    dollAccExp[77] = 1057300;
    dollAccExp[78] = 1115200;
    dollAccExp[79] = 1175000;
    dollAccExp[80] = 1236800;
    dollAccExp[81] = 1300700;
    dollAccExp[82] = 1366700;
    dollAccExp[83] = 1434800;
    dollAccExp[84] = 1505100;
    dollAccExp[85] = 1577700;
    dollAccExp[86] = 1652500;
    dollAccExp[87] = 1729600;
    dollAccExp[88] = 1809100;
    dollAccExp[89] = 1891000;
    dollAccExp[90] = 1975300;
    dollAccExp[91] = 2087900;
    dollAccExp[92] = 2204000;
    dollAccExp[93] = 2323500;
    dollAccExp[94] = 2446600;
    dollAccExp[95] = 2573300;
    dollAccExp[96] = 2703700;
    dollAccExp[97] = 2837800;
    dollAccExp[98] = 2975700;
    dollAccExp[99] = 3117500;
    dollAccExp[100] = 3263200;
    dollAccExp[101] = 3363200;
    dollAccExp[102] = 3483200;
    dollAccExp[103] = 3623200;
    dollAccExp[104] = 3783200;
    dollAccExp[105] = 3963200;
    dollAccExp[106] = 4163200;
    dollAccExp[107] = 4383200;
    dollAccExp[108] = 4623200;
    dollAccExp[109] = 4903200;
    dollAccExp[110] = 5263200;
    dollAccExp[111] = 5743200;
    dollAccExp[112] = 6383200;
    dollAccExp[113] = 7283200;
    dollAccExp[114] = 8483200;
    dollAccExp[115] = 10083200;
    dollAccExp[116] = 12283200;
    dollAccExp[117] = 15283200;
    dollAccExp[118] = 19283200;
    dollAccExp[119] = 24283200;
    dollAccExp[120] = 30283200;

    const nowLv = Number(this.nowLv.value);
    let nowExp = Number(this.nowExp.value);
    let targetLv = Number(this.targetLv.value);
    const oath = (!this.state.oath) ? 1 : 2;
    let result = 0;
    if (
      ((dollAccExp[nowLv + 1] - dollAccExp[nowLv]) >= nowExp) &&
      (nowExp >= 0) && (targetLv > nowLv)
    ) {
      if (targetLv > 115) {
        result += Math.ceil((dollAccExp[targetLv] - dollAccExp[Math.max(nowLv, 115)] - nowExp)
          / (3000 * oath));
        targetLv = 115;
        nowExp = 0;
      }

      if (targetLv > 110 && nowLv < 115) {
        result += Math.ceil((dollAccExp[targetLv] - dollAccExp[Math.max(nowLv, 110)] - nowExp)
          / (3000 * oath));
        targetLv = 110;
        nowExp = 0;
      }

      if (targetLv > 100 && nowLv < 110) {
        result += Math.ceil((dollAccExp[targetLv] - dollAccExp[Math.max(nowLv, 100)] - nowExp)
          / (3000 * oath));
        targetLv = 100;
        nowExp = 0;
      }

      if (targetLv <= 100 && nowLv < 100) {
        result += Math.ceil((dollAccExp[targetLv] - dollAccExp[nowLv] - nowExp) / 3000);
      }
      this.setState({ report: result });
    } else {
      this.setState({ report: 'N/A' });
    }
  }
  calcFairy() {
    const fairyAccExp = [];
    fairyAccExp[0] = 0;
    fairyAccExp[1] = 0;
    fairyAccExp[2] = 300;
    fairyAccExp[3] = 900;
    fairyAccExp[4] = 1800;
    fairyAccExp[5] = 3000;
    fairyAccExp[6] = 4500;
    fairyAccExp[7] = 6300;
    fairyAccExp[8] = 8400;
    fairyAccExp[9] = 10800;
    fairyAccExp[10] = 13500;
    fairyAccExp[11] = 16500;
    fairyAccExp[12] = 19800;
    fairyAccExp[13] = 23400;
    fairyAccExp[14] = 27300;
    fairyAccExp[15] = 31500;
    fairyAccExp[16] = 36000;
    fairyAccExp[17] = 40800;
    fairyAccExp[18] = 45900;
    fairyAccExp[19] = 51400;
    fairyAccExp[20] = 57400;
    fairyAccExp[21] = 63900;
    fairyAccExp[22] = 71000;
    fairyAccExp[23] = 79000;
    fairyAccExp[24] = 88000;
    fairyAccExp[25] = 98000;
    fairyAccExp[26] = 109000;
    fairyAccExp[27] = 121200;
    fairyAccExp[28] = 134600;
    fairyAccExp[29] = 149300;
    fairyAccExp[30] = 165300;
    fairyAccExp[31] = 182800;
    fairyAccExp[32] = 201700;
    fairyAccExp[33] = 222200;
    fairyAccExp[34] = 244400;
    fairyAccExp[35] = 268300;
    fairyAccExp[36] = 294000;
    fairyAccExp[37] = 321600;
    fairyAccExp[38] = 351100;
    fairyAccExp[39] = 382700;
    fairyAccExp[40] = 416400;
    fairyAccExp[41] = 452300;
    fairyAccExp[42] = 490500;
    fairyAccExp[43] = 531000;
    fairyAccExp[44] = 574000;
    fairyAccExp[45] = 619500;
    fairyAccExp[46] = 667700;
    fairyAccExp[47] = 718600;
    fairyAccExp[48] = 772300;
    fairyAccExp[49] = 828900;
    fairyAccExp[50] = 888500;
    fairyAccExp[51] = 951200;
    fairyAccExp[52] = 1017100;
    fairyAccExp[53] = 1086300;
    fairyAccExp[54] = 1158900;
    fairyAccExp[55] = 1234900;
    fairyAccExp[56] = 1314500;
    fairyAccExp[57] = 1397800;
    fairyAccExp[58] = 1484800;
    fairyAccExp[59] = 1575700;
    fairyAccExp[60] = 1670600;
    fairyAccExp[61] = 1769600;
    fairyAccExp[62] = 1872700;
    fairyAccExp[63] = 1980100;
    fairyAccExp[64] = 2091900;
    fairyAccExp[65] = 2208200;
    fairyAccExp[66] = 2329100;
    fairyAccExp[67] = 2454700;
    fairyAccExp[68] = 2585100;
    fairyAccExp[69] = 2720400;
    fairyAccExp[70] = 2860800;
    fairyAccExp[71] = 3006300;
    fairyAccExp[72] = 3157100;
    fairyAccExp[73] = 3313200;
    fairyAccExp[74] = 3474800;
    fairyAccExp[75] = 3642000;
    fairyAccExp[76] = 3814900;
    fairyAccExp[77] = 3993600;
    fairyAccExp[78] = 4178300;
    fairyAccExp[79] = 4369000;
    fairyAccExp[80] = 4565900;
    fairyAccExp[81] = 4768200;
    fairyAccExp[82] = 4977800;
    fairyAccExp[83] = 5193900;
    fairyAccExp[84] = 5416700;
    fairyAccExp[85] = 5646300;
    fairyAccExp[86] = 5882800;
    fairyAccExp[87] = 6126300;
    fairyAccExp[88] = 6376900;
    fairyAccExp[89] = 6634800;
    fairyAccExp[90] = 6900100;
    fairyAccExp[91] = 7172900;
    fairyAccExp[92] = 7453300;
    fairyAccExp[93] = 7741500;
    fairyAccExp[94] = 8037600;
    fairyAccExp[95] = 8341700;
    fairyAccExp[96] = 8654000;
    fairyAccExp[97] = 8974600;
    fairyAccExp[98] = 9303600;
    fairyAccExp[99] = 9641100;
    fairyAccExp[100] = 9998100;

    const nowLv = Number(this.nowLv.value);
    const nowExp = Number(this.nowExp.value);
    const targetLv = Number(this.targetLv.value);
    let result = 0;
    if (nowLv > 0
      && nowLv <= 100
      && targetLv > 0
      && targetLv <= 100
      && nowExp <= fairyAccExp[nowLv + 1] - fairyAccExp[nowLv]) {
      result = Math.ceil((fairyAccExp[targetLv] - (fairyAccExp[nowLv] + nowExp)) / 3000);
      this.setState({ reportFairy: result });
    } else {
      this.setState({ reportFairy: 'N/A' });
    }
  }
  render() {
    const { classes, intl } = this.props;
    return (
      <div className={classes.wrapper} align="center">
        <Grid container align="center" justify="center">
          <Paper align="left" style={{ padding: '20px' }}>
            <h1><FormattedMessage id="Combat Report Calculator" /></h1>
            <TextField
              id="form-disc-calc-nowLv"
              label={intl.formatMessage({ id: 'current level' })}
              type="number"
              margin="normal"
              inputRef={(el) => { this.nowLv = el; }}
              onChange={this.calc}
            />
            <FormControlLabel
              control={
                <Checkbox
                  onChange={this.oath}
                />
              }
              label={intl.formatMessage({ id: 'OATH' })}
            />
            <br />
            <TextField
              id="form-disc-calc-nowExp"
              label={intl.formatMessage({ id: 'Current EXP.' })}
              type="number"
              margin="normal"
              inputRef={(el) => { this.nowExp = el; }}
              onChange={this.calc}
            />
            <br />
            <br />
            <TextField
              id="tf-disc-calc-targetLv"
              label={intl.formatMessage({ id: 'Target Level' })}
              type="number"
              margin="normal"
              inputRef={(el) => { this.targetLv = el; }}
              onChange={this.calc}
            />
            <h4>
              ({intl.formatMessage({ id: 'doll' })}) {intl.formatMessage({ id: 'Require amount' })} : <span id="disc-calc-result">{this.state.report}</span>{intl.formatMessage({ id: 'amount' })}
            </h4>
            <h4>
              ({intl.formatMessage({ id: 'fairy' })}) {intl.formatMessage({ id: 'Require amount' })} : <span id="disc-calc-result">{this.state.reportFairy}</span>{intl.formatMessage({ id: 'amount' })}
            </h4>
            <br />
          </Paper>
        </Grid>
      </div>
    );
  }
}

export default injectIntl(withStyles(style)(Calculator));
