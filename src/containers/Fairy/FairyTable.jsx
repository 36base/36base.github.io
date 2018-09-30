import React, { Component } from 'react';

import DictTable from '../../components/dicttable/DictTable';

import SkillBase from '../../components/Skill/SkillBase';

const headRows = [];
function addTableRow(id, label, numeric, sortable, render) {
  headRows.push({
    id, label, numeric, sortable, render,
  });
}
addTableRow('name', 'Name', false, true, (t, value) => t(value));
addTableRow('category', 'Category', true, true, (t, value) => value);
addTableRow('buildTime', 'BuildTime', true, true, (t, value) => new Date(value * 1000).toISOString().substr(11, 8));
addTableRow('skill', 'Skill', false, false, (t, skill) => (
  <SkillBase
    codename={t(skill.codename)}
    name={t(skill.name)}
    description={t(skill.description)}
  />
));
addTableRow('pow', 'Pow', true, true, (t, value) => `${value}%`);
addTableRow('hit', 'Hit', true, true, (t, value) => `${value}%`);
addTableRow('dodge', 'Dodge', true, true, (t, value) => `${value}%`);
addTableRow('criticalHarmRate', 'Critical Damage', true, true, (t, value) => `${value}%`);
addTableRow('armor', 'Armor', true, true, (t, value) => `${value}%`);

class FairyTable extends Component {
  render() {
    const {
      fairies,
      orderBy,
      order,
      handleSortTable,
      onClick,
    } = this.props;

    return (
      <DictTable
        orderBy={orderBy}
        order={order}
        onSort={handleSortTable}
        headRows={headRows}
        list={fairies.map(fairy => ({
          id: fairy.id,
          name: fairy.name,
          category: fairy.category,
          buildTime: fairy.buildTime,
          skill: fairy.skill,
          pow: fairy.stats.pow || 0,
          hit: fairy.stats.hit || 0,
          dodge: fairy.stats.dodge || 0,
          criticalHarmRate: fairy.stats.criticalHarmRate || 0,
          armor: fairy.stats.armor || 0,
        }))}
        onClick={onClick}
      />
    );
  }
}

export default FairyTable;
