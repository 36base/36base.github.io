import React, { Component } from 'react';

import DictTable from '../../components/dicttable/DictTable';

import { getEquipIconUrl } from '../../utils/url';

const headRows = [];
function addTableRow(id, label, numeric, sortable, render) {
  headRows.push({
    id, label, numeric, sortable, render,
  });
}
addTableRow('sprite', '', false, false, (t, sprite) => (
  <img
    style={{ height: '50px', width: '50px' }}
    alt="test"
    src={sprite}
  />
));
addTableRow('name', 'Name', false, true, (t, value) => t(value));
addTableRow('company', 'Company', true, true, (t, value) => value);
addTableRow('category', 'Category', true, true, (t, value) => value);
addTableRow('rank', 'Rank', true, true, (t, value) => value);
addTableRow('buildTime', 'Production Time', true, true, (t, value) => new Date(value * 1000).toISOString().substr(14, 5));
addTableRow('pow', 'Damage', false, false, (t, value) => ((value !== null) ? value.max : ''));
addTableRow('hit', 'Accuracy', false, false, (t, value) => ((value !== null) ? value.max : ''));
addTableRow('rate', 'Rate of Fire', false, false, (t, value) => ((value !== null) ? value.max : ''));
addTableRow('dodge', 'Evasion', false, false, (t, value) => ((value !== null) ? value.max : ''));
addTableRow('criticalPercent', 'Crit Rate', false, false, (t, value) => ((value !== null) ? value.max : ''));
addTableRow('criticalHarmRate', 'Crit Damage', false, false, (t, value) => ((value !== null) ? value.max : ''));
addTableRow('armor', 'Armor', false, false, (t, value) => ((value !== null) ? value.max : ''));
addTableRow('armorPiercing', 'Armor Pen.', false, false, (t, value) => ((value !== null) ? value.max : ''));
addTableRow('nightview', 'NightView', false, false, (t, value) => ((value !== null) ? value.max : ''));


class EquipTable extends Component {
  render() {
    const {
      equips,
      onClick,
    } = this.props;

    return (
      <DictTable
        headRows={headRows}
        list={equips.map(equip => ({
          id: equip.id,
          sprite: getEquipIconUrl(equip.codename),
          name: equip.name,
          company: equip.company,
          category: equip.category,
          rank: equip.rank,
          buildTime: equip.buildTime,
          pow: equip.stats.pow || null,
          hit: equip.stats.hit || null,
          rate: equip.stats.rate || null,
          dodge: equip.stats.dodge || null,
          criticalPercent: equip.stats.criticalPercent || null,
          criticalHarmRate: equip.stats.criticalHarmRate || null,
          armor: equip.stats.armor || null,
          armorPiercing: equip.stats.armorPiercing || null,
          nightview: equip.stats.nightview || null,
        }))}
        onClick={onClick}
      />
    );
  }
}

export default EquipTable;
