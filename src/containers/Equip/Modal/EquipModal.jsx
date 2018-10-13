import React, { Component } from 'react';
import { compose } from 'redux';
import { translate } from 'react-i18next';
import { Link } from 'react-router-dom';
import {
  Grid, Typography, Button,
  Dialog, DialogActions, DialogContent,
} from '@material-ui/core/';
import { withStyles } from '@material-ui/core/styles';

import HorizonLine from '../../../components/common/HorizonLine';
import InfoBox from '../../../components/common/InfoBox';

import StatusInfoBox from '../../../components/equip/EquipModal/StatusInfoBox';

import DollRepository from '../../../repositories/DollRepository';
import { getEquipIconUrl } from '../../../utils/url';

import styles from './styles';

function buildTime2Str(time) {
  const hour = Number.parseInt(time / 3600, 10);
  const min = Number.parseInt((time - (hour * 3600)) / 60, 10);
  const sec = Number.parseInt(time % 60, 10);

  return `${hour < 10 ? `0${hour}` : hour}:${min < 10 ? `0${min}` : min}:${sec < 10 ? `0${sec}` : sec}`;
}

class EquipModal extends Component {
  state = {
    level: 0,
  };

  componentWillReceiveProps(newProps) {
    const { info } = newProps;
    if (info) {
      this.setState({ level: info.maxLevel });
    }
  }

  handleLevelChange = (level) => {
    const { info } = this.props;

    info.level = level;
    this.setState({ level });
  }

  render() {
    const {
      t,
      classes,
      info,
      open,
      handleClose,
    } = this.props;

    if (!open || !info) return (<div />);

    const {
      codename,
      name,
      color,
      category,
      type,
      stats,
      maxLevel,
      buildTime,
      introduction,
      fitGuns,
    } = info;

    const { level } = this.state;

    return (
      <Dialog
        open={open}
        onClose={handleClose}
        scroll="paper"
      >
        <DialogContent>
          <Grid container align="center" justify="center">
            <Grid item xs={12} md={12}>
              <img alt={name} src={getEquipIconUrl(codename)} />
              <h2 style={{ textAlign: 'center', color }}>{t(name)}</h2>
              <h3>{`${t(`PageMessage.Equip.Category.${category}`)} / ${t(`PageMessage.Equip.Type.${type}`)}`}</h3>
            </Grid>
            <Grid item xs={12} md={12} align="left">
              <Grid className={classes.boxWrapper} item xs={12}>
                <InfoBox name={t('PageMessage.Introduce')}>
                  <Grid key="row" className={classes.introduction} container spacing={8}>
                    <Grid item><Typography>{t(introduction)}</Typography></Grid>
                  </Grid>
                  <HorizonLine key="hr" />
                </InfoBox>
              </Grid>
              <Grid className={classes.boxWrapper} item xs={12}>
                <StatusInfoBox
                  handler={this.handleLevelChange}
                  stats={stats}
                  level={level}
                  maxLevel={maxLevel}
                />
              </Grid>
              { fitGuns ? (
                <Grid className={classes.boxWrapper} item xs={12}>
                  <InfoBox name={t('PageMessage.Equip.Fit Guns')}>
                    <Grid key="row" className={classes.introduction} container spacing={8}>
                      <Grid item>
                        <Typography>
                          {fitGuns.map((dollId) => {
                            const { name: dollName } = DollRepository.getNewById(dollId);

                            return (
                              <Link style={{ textDecoration: 'none' }} to={`/doll/${dollId}`}>
                                <Button
                                  key={dollId}
                                  className={classes.button}
                                  variant="raised"
                                  color="default"
                                >
                                  {`${t(dollName)} ${dollId > 20000 ? t('PageMessage.Doll.Mod') : ''} `}
                                </Button>
                              </Link>
                            );
                          })}
                        </Typography>
                      </Grid>
                    </Grid>
                    <HorizonLine key="hr" />
                  </InfoBox>
                </Grid>) : (<div />)
                }
              <Grid className={classes.boxWrapper} item xs={12} align="center">
                <Typography variant="display1">
                  {buildTime === 0
                    ? t('Info.Non-Craftable')
                    : `${t('Info.Production Time')} - ${buildTime2Str(buildTime)}`
                  }
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            {t('PageMessage.Close')}
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default compose(
  translate(),
  withStyles(styles),
)(EquipModal);
