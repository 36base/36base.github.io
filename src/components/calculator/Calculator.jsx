import React from 'react';
import TextField from 'material-ui/TextField';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Checkbox from 'material-ui/Checkbox';
import { FormControlLabel } from 'material-ui/Form';
import { withStyles } from 'material-ui/styles';

const style = { };

class Calculator extends React.Component {
  constructor(props) {
    super(props);

    this.state = { report: 'N/A' };

    this.calc = this.calc.bind(this);
  }

  calc() {
    const dollAccExp = [0, 0, 100, 300, 600, 1000, 1500, 2100, 2800, 3600, 4500, 5500, 6600, 7800, 9100, 10500, 12000, 13600];

    const nowLv = Number(this.nowLv.value);
    const nowExp = Number(this.nowExp.value);
    const targetLv = Number(this.targetLv.value);
    const oath = !(this.oath.value) ? 1 : 2;
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
        <Grid container spacing={24} align="center" justify="center">
          <Grid item md={6}>
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
                    inputRef={(el) => { this.oath = el; }}
                    onChange={this.calc}
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
        </Grid>
      </div>
    );
  }
}

export default withStyles(style)(Calculator);
