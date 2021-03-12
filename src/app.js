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

const slides = [
{
    title: 'Slide 1: Targeted and Attended district, all the country',
    content:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
    render: () => renderVegaChart(PeruChart),
  },
  {
    title: 'Slide 2: Targeted and Attended district, the Coast',
    content:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
    render: () => renderVegaChart(CostaChart),
  },
  {
    title: 'Slide 3: Targeted and Attended district, the Highlands',
    content:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
    render: () => renderVegaChart(SierraChart),
  },
  {
    title: 'Slide 4: Targeted and Attended district, the Jungle',
    content:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
    render: () => renderVegaChart(SelvaChart),
  },
  {
    title: 'Slide 5: Health and Labor Outcomes Evolution 2008-19',
    content: `It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).`,
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
        currentSlideIdx < idx ? 'gray' : 'black',
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
