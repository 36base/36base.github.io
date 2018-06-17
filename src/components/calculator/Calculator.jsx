import React from 'react';
import { TextField, Grid, Paper, Checkbox } from 'material-ui/';
import { FormControlLabel } from 'material-ui/Form';
import { withStyles } from 'material-ui/styles';

const style = {
  wrapper: {
    marginTop: '1em',
  },
};

class Calculator extends React.Component {
  constructor(props) {
    super(props);

    this.state = { oath: false, report: 'N/A' };

    this.oath = this.oath.bind(this);
    this.calc = this.calc.bind(this);
  }

  oath(e) {
    this.setState({ oath: e.target.checked }, () => this.calc());
  }

  calc() {
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
    const nowExp = Number(this.nowExp.value);
    const targetLv = Number(this.targetLv.value);
    const oath = (!this.state.oath) ? 1 : 2;
    let result = 0;
    if (
      ((dollAccExp[nowLv + 1] - dollAccExp[nowLv]) >= nowExp) &&
      (nowExp >= 0) && (targetLv > nowLv)
    ) {
      if (
        (targetLv <= 110 && nowLv >= 100) ||
        (targetLv <= 115 && nowLv >= 110) ||
        (targetLv <= 120 && nowLv >= 115)
      ) {
        result += Math.ceil((dollAccExp[targetLv] - dollAccExp[nowLv] - nowExp) / (3000 * oath));
      }
      if (targetLv <= 100 && nowLv < 100) {
        result += Math.ceil((dollAccExp[targetLv] - dollAccExp[nowLv] - nowExp) / 3000);
      }
      this.setState({ report: result });
    } else {
      this.setState({ report: 'N/A' });
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.wrapper} align="center">
        <Grid container align="center" justify="center">
          <Paper align="left" style={{ padding: '20px' }}>
            <h1>작전 보고서 계산기</h1>
            <TextField
              id="form-disc-calc-nowLv"
              label="현재 레벨"
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
              label="서약"
            />
            <br />
            <TextField
              id="form-disc-calc-nowExp"
              label="현재 경험치"
              type="number"
              margin="normal"
              inputRef={(el) => { this.nowExp = el; }}
              onChange={this.calc}
            />
            <br />
            <br />
            <TextField
              id="tf-disc-calc-targetLv"
              label="목표 레벨"
              type="number"
              margin="normal"
              inputRef={(el) => { this.targetLv = el; }}
              onChange={this.calc}
            />
            <h4>
              필요한 작전보고서 : <span id="disc-calc-result">{this.state.report}</span>개
            </h4>
            <br />
            <div>
              레벨 계산 구간은 1~100, 100~110, 110~115, 115~120으로 분리되어있으니 참고 바랍니다
            </div>
          </Paper>
        </Grid>
      </div>
    );
  }
}

export default withStyles(style)(Calculator);
