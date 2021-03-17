import './main.css';
import vegaEmbed from 'vega-embed';
import {select} from 'd3-selection';
import CostaChart from './charts/costa-chart';
import SelvaChart from './charts/selva-chart';
import SierraChart from './charts/sierra-chart';
import LineChart from './charts/line-chart';
import PeruChart from './charts/peru-chart';

fetch('./data/cars.json')
  .then(x => x.json())
  .then(main);

function renderVegaChart(chart) {
  vegaEmbed('#slide-content', chart, {actions: false, theme: 'quartz', renderer:'svg', width: 1});
}

const str_description = 'CunaMas is one of the five national social programs in Peru under the jurisdiction of the Ministry of Inclusion and Social Development (MIDIS). It was created in 2008 and its in charge of early childhood development by giving free childcare services to children between 0-5 years and family assistance services where mothers learn about nutrition, upbringing, etc. \n \n By using a targeting mechanism based on statistical indicators, the program targets districts for attention. However, by 2019, the program has not yet covered all the targeted district.'

const slides = [
  {
    title: 'The CunaMas Social Program in Peru',
    content: str_description + '\n\n Contents: \
     \n\u22C4 cunaMas national coverage \
     \n\u22C4 Coverage in the Coast  \
     \n\u22C4 Coverage in the Highlands \
     \n\u22C4 Coverage in the Jungle \
     \n\u22C4 Outcomes evolution 2008-2019 \
     \n \n \
     \n Data Sources: CunaMas Admin. Records & Peruvian DHS 2008-19 \
     \n \n  Special thanks to the DataViz W21 cohort & our incredible instructor Andrew McNutt',
    render: (data) => console.log(),
  },
  {
    title: 'Peru, 2009 vs. 2019 \n Targeted and Attended districts',
    content:
      'The most recent ministerial resolutions define the targeting criteria as a combination of socioeconomic indicators (poverty) and categorical criteria (rurality, undernourishment, and cash transfers allocation). \n \n Additionally, the program classifies as targeted the districts with indigenous populations in the jungle, the one on the country´s border, the VRAEM, and Huallaga zones. Previously targeted districts that may not classify to be attended by the new targeting scheme are also included. \n \n With these criteria, the total targeted areas add up to 1327, being this the 71% of districts in the country. The chart shows the program almost duplicated the districts attended during the last decade, expanding from 297 in 2009 to 578 in 2019. \n \n As good as this expansion may sound, more than half of the targeted districts still lack the CunaMas services. It is important to observe this indicator in levels, since the expansion of the program requires coordination with local authorities \n\n ',
    render: () => renderVegaChart(PeruChart),
  },
  {
    title: 'The Coast: Big disparities in coverage',
    content:
      'The coastal area is the one that presents the most significant disparities in attention. The graph shows that the number of targeted districts varies considerably from one region to another. An example of this heterogeneity is visible between La Libertad and Moquegua, for instance. While the former has nearly 87% of its districts targeted to receive the program, only 15% of them have been prioritized in the latter region. However, this situation contrast with the effective attention since all targeted districts in Moquegua already receive the program benefits, while only 26% of them have been attended by 2019 in La Libertad. \n \n Two crucial elements should be highlighted:\n \n \u22C4 The coast is the only area that has regions that are fully covered by 2019. These are Arequipa, Callao, Ica, and Tumbes \n \u22C4 The Arequipa and Ica regions attend more districts than the one targeted by the program. This scenario may be revealing a political decision since both of these regions are considered important in the country. Alternatively, this may be a mistake in the administrative records of the program \n\n',
    render: () => renderVegaChart(CostaChart),
  },
  {
    title: 'Highlands: still a long way to go',
    content:
      'The most significant gaps in the program coverage are concentrated in the highland area. As the graph shows, none of the eleven regions located in this area have yet fully covered the targeted districts. It is important to highlight that the highlands area clusters the country´s historical poorest regions as Cajamarca, Ayacucho, and Huancavelica. \n \n It is possible to observe three types of regions according to the coverage evolution in the last decade: \n \n \u22C4 Regions with the highest coverage in the area where the number of attended districts almost doubled in the previous decade. For example, Junin and Pasco \n \u22C4 Regions with an intermediate level of attention where the number of districts receiving the CunaMas services increased notably. For instance, Apurimac and Ayacucho \n \u22C4 Regions with the lowest coverage in the area where almost no expansion in the program´s coverage occurred in the last decade. For example, Amazonas and Cajamarca. \n \n',
    render: () => renderVegaChart(SierraChart),
  },
  {
    title: 'Jungle Region: Universal Treatment',
    content:
      'The situation of the jungle area is considerably different from the coast or highlands. The CunaMas program has targeted all the districts in the three regions, given the indigenous populations´ targeting criterion. Nevertheless, the reach of the program as of 2019 is still very heterogeneous. It is important to highlight that the jungle region in Peru has considerably high teenage pregnancy levels, where the program may have a significant impact. \n \n In the case of Loreto, which has 53 districts, CunaMas has only attended 11 of them. The program expansion in this region in the last decade has been minuscule since the number of attended districts has only increased by three. A contrasting case is the one of Madre de Dios. Even though CunaMas targeted all of its 11 districts, by 2009, none of them received attention. The program expansion in a decade is almost non-existent since only one district receives the early childhood services as of 2019. Finally, in Ucayali, with 17 targeted districts, the program nearly doubled the number of districts with early childhood attention. \n\n',
    render: () => renderVegaChart(SelvaChart),
  },
  {
    title: 'CunaMas Impact on Health and Labor',
    content: 'An important aspect highlighted in the implementation of CunaMas was that daycare services may allow more women to work during the day. Moreover, given the services provided to pregnant women, it is expected that the program has certain impact in the birth conditions, particularly in the presence of a physician during the process. Finally, the family assistance services has as one of its objective the improvement of nourishment in childrens.  \n \n In the following chart, it is possible to compare the evolution of key outcomes in these dimensions. Even though it is not an impact evaluation and we cannot derive a causal link so easily, this descriptive exercise helps to explore potential effects of the program in the last decade.',
    render: () => renderVegaChart(LineChart),
  },
];

function main(data) {
  // state
  let currentSlideIdx = 0;
  const updateState = newIdx => {
    currentSlideIdx = newIdx;
    renderSlide();
    drawProgress();
  };

  // configuration stuff
  const header = select('#slide-detail h2');
  const body = select('#slide-detail p');

  select('#prev').on('click', () =>
    updateState(currentSlideIdx ? currentSlideIdx - 1 : slides.length - 1),
  );
  select('#next').on('click', () =>
    updateState((currentSlideIdx + 1) % slides.length),
  );
  select('#last').on('click', () =>
    updateState(slides.length - 1),
  );

  function drawProgress() {
    const numData = [...new Array(slides.length)].map((_, idx) => idx);
    select('#progress')
      .selectAll('.progress-dot')
      .data(numData)
      .join('div')
      .classed('progress-dot', true)
      .classed('current-dot', idx => idx === currentSlideIdx)
      .style('background-color', idx =>
        currentSlideIdx < idx ? 'gray' : 'darkred',
      );
  }

  // "draw loop"
  function renderSlide() {
    const currentSlide = slides[currentSlideIdx];
    header.text(currentSlide.title);
    body.text(currentSlide.content);
    currentSlide.render(data);
  }
  renderSlide();
  drawProgress();
}
