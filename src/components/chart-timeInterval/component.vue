<template>
  <div v-if="data.length">
    <v-chart :forceFit="true" height="400" :data="data" :padding="padding" :scale="scale" :animate="false">
      <v-tooltip :crosshairs="false" />

      <v-legend position="top-center" />
      
      <v-line position="time*cpu" :color="color" />
      
      <v-axis dataKey="time" :label="label" />

      <!-- <v-axis dataKey="cpu" :label="labelFormater" /> -->

    </v-chart>
    <!-- <v-plugin>
      <v-slider
        container='viser-slider-1'
        width="auto"
        height="26"
        :start="start"
        :end="end"
        xAxis="time"
        yAxis="cpu"
        :scales="scale1"
        :data="data"
        :backgroundChart="bg"
        :onChange="onChange"
      ></v-slider>
    </v-plugin> -->
  </div>
</template>

<script>
const DataSet = require('@antv/data-set');

export default {
  name: 'q7-chart-timeInterval',

  async mounted() {
    const data = jsonData
    this.$data.data = data;
    const { dv, ds } = this.getData();
    this.$data.dv = dv;
    this.$data.start = ds.state.start;
    this.$data.end = ds.state.end;
  },

  methods: {
    onChange(opts) {
      console.log(opts)
      this.dv = this.getData().dv;
      this.start = opts.startValue;
      this.end = opts.endValue;
    },

    getData() {
      const { data, start, end } = this;
      const ds = new DataSet({
        state: {
          start: new Date(start).getTime(),
          end: new Date(end).getTime()
        }
      });
      const dv = ds.createView('orgin').source(data);
      dv.transform({
        type: "map",
        callback: function callback(obj) {
          const time = new Date(obj.time).getTime(); // !注意：时间格式，建议转换为时间戳进行比较
          return time >= ds.state.start && time <= ds.state.end;
        }
      });
      return { dv, ds };
    }
  },

  data() {
    return {
      data: [],
      start: '00:00',
      end: '24:00',
      label: {
        textStyle: {
          fill: '#aaa'
        }
      },
      labelFormater: {
        textStyle: {
          fill: '#aaaaaa'
        },
        formatter: function formatter(text) {
          return text.replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
        }
      },
      padding:[40,40,40,80],
      scale: [
        {
          dataKey: "time",
          min: '00.00',
          max: '24.00'
        },
      ],
      scale1: {
        time: {
          type: 'time',
          mask: 'HH:mm'
        }
      },
      color:['date', ['#1890ff', '#ced4d9']],
      bg: { type:'line' },
    };
  }
};

const jsonData = [{
	"date": "yesterday",
	"time": "13.00",
	"cpu": 63.93
}, {
	"date": "yesterday",
	"time": "13.05",
	"cpu": 65.065
}, {
	"date": "yesterday",
	"time": "13.10",
	"cpu": 66.4271
}, {
	"date": "yesterday",
	"time": "13.15",
	"cpu": 63.06
}, {
	"date": "yesterday",
	"time": "13.20",
	"cpu": 64.0463
}, {
	"date": "yesterday",
	"time": "13.25",
	"cpu": 64.451
}, {
	"date": "yesterday",
	"time": "13.30",
	"cpu": 63.354
}, {
	"date": "yesterday",
	"time": "13.35",
	"cpu": 65.2969449309885
}, {
	"date": "yesterday",
	"time": "13.40",
	"cpu": 66.35014444552017
}, {
	"date": "yesterday",
	"time": "13.45",
	"cpu": 66.198378961063
}, {
	"date": "yesterday",
	"time": "13.50",
	"cpu": 66.85520134738813
}, {
	"date": "yesterday",
	"time": "13.55",
	"cpu": 65.05419984325125
}, {
	"date": "yesterday",
	"time": "14.00",
	"cpu": 66.62243229531435
}, {
	"date": "yesterday",
	"time": "14.05",
	"cpu": 66.77808066603122
}, {
	"date": "yesterday",
	"time": "14.10",
	"cpu": 66.9144977524293
}, {
	"date": "yesterday",
	"time": "14.15",
	"cpu": 65.05499508303669
}, {
	"date": "yesterday",
	"time": "14.20",
	"cpu": 66.36871158902638
}, {
	"date": "yesterday",
	"time": "14.25",
	"cpu": 63.973903073723044
}, {
	"date": "yesterday",
	"time": "14.30",
	"cpu": 64.92585536363889
}, {
	"date": "yesterday",
	"time": "14.35",
	"cpu": 65.17145801764055
}, {
	"date": "yesterday",
	"time": "14.40",
	"cpu": 64.42516834555609
}, {
	"date": "yesterday",
	"time": "14.45",
	"cpu": 63.701363912573775
}, {
	"date": "yesterday",
	"time": "14.50",
	"cpu": 66.11568649665543
}, {
	"date": "yesterday",
	"time": "14.55",
	"cpu": 64.0474592964878
}, {
	"date": "yesterday",
	"time": "15.00",
	"cpu": 64.25676632707459
}, {
	"date": "yesterday",
	"time": "15.00",
	"cpu": 65
}, {
	"time": "13.00",
	"cpu": 100,
	"date": "today"
}, {
	"time": "13.05",
	"cpu": 100,
	"date": "today"
}, {
	"time": "13.10",
	"cpu": 100,
	"date": "today"
}, {
	"time": "13.15",
	"cpu": 100,
	"date": "today"
}, {
	"time": "13.20",
	"cpu": 100,
	"date": "today"
}, {
	"time": "13.25",
	"cpu": 100,
	"date": "today"
}, {
	"time": "13.30",
	"cpu": 100,
	"date": "today"
}, {
	"time": "13.35",
	"cpu": 100,
	"date": "today"
}, {
	"time": "13.40",
	"cpu": 100,
	"date": "today"
}, {
	"time": "13.45",
	"cpu": 100,
	"date": "today"
}, {
	"time": "13.50",
	"cpu": 100,
	"date": "today"
}, {
	"time": "13.55",
	"cpu": 100,
	"date": "today"
}, {
	"time": "14.00",
	"cpu": 65,
	"date": "today"
}, {
	"time": "14.05",
	"cpu": 72.16886580736812,
	"date": "today"
}, {
	"time": "14.10",
	"cpu": 68.57230489482068,
	"date": "today"
}, {
	"time": "14.15",
	"cpu": 71.43150028596347,
	"date": "today"
}, {
	"time": "14.20",
	"cpu": 78.14636866352923,
	"date": "today"
}, {
	"time": "14.25",
	"cpu": 68.36883432160218,
	"date": "today"
}, {
	"time": "14.30",
	"cpu": 75.39521675212667,
	"date": "today"
}, {
	"time": "14.35",
	"cpu": 75.27433214647408,
	"date": "today"
}, {
	"time": "14.40",
	"cpu": 82.10189835378893,
	"date": "today"
}, {
	"time": "14.45",
	"cpu": 84.7261454369566,
	"date": "today"
}, {
	"time": "14.50",
	"cpu": 78.96269733695286,
	"date": "today"
}, {
	"time": "14.55",
	"cpu": 86.43607929073264,
	"date": "today"
}, {
	"time": "15.00",
	"cpu": 85,
	"date": "today"
}]


</script>