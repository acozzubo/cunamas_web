import {select} from 'd3-selection';
import {pie, arc} from 'd3-shape';
import {schemeTableau10} from 'd3-scale-chromatic';
import {transition} from 'd3-transition';

const width = 500;
const height = 500;
const radius = 200;

function prepData(data, sumKey) {
  return Object.entries(
    data.reduce((acc, row) => {
      acc[row.Origin] = (acc[row.Origin] || 0) + row[sumKey];
      return acc;
    }, {}),
  ).map(([country, val]) => ({country, val}));
}

export default function(data, sumKey) {
  if (select('#slide-content .pie-chart').empty()) {
    select('#slide-content').remove();
    select('#main-content')
      .append('div')
      .attr('id', 'slide-content')
      .append('svg')
      .attr('height', height)
      .attr('width', width)
      .append('g')
      .attr('transform', `translate(${radius}, ${radius})`)
      .attr('class', 'pie-chart');
  }
  const svg = select('#slide-content .pie-chart');

  const countedData = prepData(data, sumKey);
  const pieScale = pie()
    .value(d => d.val)
    .sort((a, b) => a.country.localeCompare(b.country));
  const arcs = pieScale(countedData);
  const arcScale = arc()
    .innerRadius(radius / 2)
    .outerRadius(radius);

  //1. make countries be in same order -> DONE~!
  //2. animate them
  svg
    .selectAll('.arc')
    .data(arcs)
    .join(
      enter => enter.append('path').attr('d', d => arcScale(d)),
      update =>
        update.call(el =>
          el.transition(transition().duration(300)).attr('d', d => arcScale(d)),
        ),
    )
    .attr('class', 'arc')

    .attr('stroke', 'white')
    .attr('fill', (_, idx) => schemeTableau10[idx]);
  svg
    .selectAll('.country-label')
    .data(arcs)
    .join('text')
    .attr('class', 'country-label')
    .attr('x', d => arcScale.centroid(d)[0])
    .attr('y', d => arcScale.centroid(d)[1])
    .text(({data: {country}}) => country);

  svg
    .selectAll('.center-label')
    .data([sumKey])
    .join('text')
    .attr('class', 'center-label')
    .attr('x', 0)
    .attr('y', 0)
    .attr('text-anchor', 'middle')
    .text(d => d);
}
