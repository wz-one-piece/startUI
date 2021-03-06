/*
  chart base on EchartsJS v3
*/
import PropTypes from 'prop-types';
import echarts from 'echarts';
import elementResizeEvent from 'element-resize-event';
import tools from 'src/utils/tools';

const COLORS = ['#64ea91', '#8fc9fb', '#d897eb', '#f69899', '#f8c82e', '#f797d6',  '#ca8622', '#bda29a', '#6e7074', '#546570', '#c4ccd3'];

class Chart {
  constructor(config) {
    this.config = config;
    this.container = config.container;
    
    this.init();
  }
   
  init() {
    const _this = this;
    if(_this.config.showMapName) {
      if(_this.config.showMapName == 'china') {
        // require("echarts/map/js/" + _this.config.showMapName + ".js")
      }
      else {
        // require("echarts/map/js/province/" + _this.config.showMapName + ".js")
      }      
      
      _this.renderChart();		
    }
    else {
      _this.renderChart();
    }
  }

  resize() {
    this.myChart.resize();
  }
  
  renderChart() {    
    var _this = this;

    const myChart = echarts.init(this.container);
    myChart.clear();
    this.myChart = myChart;
   
    if(this.config.options && !tools.emptyObj(this.config.options)) {
      this.config.options.color = this.config.options.color || COLORS;
      myChart.setOption(this.config.options);
    }

    this.config.onResize && this.config.onResize(myChart);

    elementResizeEvent(this.container, () => {
      _this.myChart.resize();
    });

    let key;
    for ( key in this.config) {
      if(/^on[a-zA-Z]*$/.test(key)) {
        const even = key.substring(2).toLowerCase();
        myChart.on(even, function (params) {
          _this.config[key] && _this.config[key](params);
        });
      }
    }  
  }
}

Chart.propTypes = {
  container: PropTypes.object,
  showMapName: PropTypes.string,
  options: PropTypes.object,
  type: PropTypes.string,
  customProp(props) {
    if(!props.options) {
      return new Error('You echarts chart need a options!');
    }
  }
};

export default Chart;
