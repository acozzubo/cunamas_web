export default {
  "$schema": "https://vega.github.io/schema/vega/v5.json",
  "background": "white",
  "padding": 5,
  "title": {
    "anchor": "end",
    "offset": 5,
    "orient": "none",
    "text": "Source: CunaMas Administrative Records",
    "baseline": "bottom",
    "dx": 375,
    "dy": 865,
    "fontSize": 10
  },
  "data": [
    {
      "name": "data-c27277dd0f5879bd3c60599eb0a4b7b6",
      "values": [
        {
          "dpto": "Ancash",
          "dpto_str": "Ancash",
          "targeted": 92,
          "upto_2019": 46,
          "upto2009": 24,
          "total_dist": 166,
          "region": "Costa"
        },
        {
          "dpto": "Arequipa",
          "dpto_str": "Arequipa",
          "targeted": 39,
          "upto_2019": 47,
          "upto2009": 35,
          "total_dist": 109,
          "region": "Costa"
        },
        {
          "dpto": "Callao",
          "dpto_str": "Callao",
          "targeted": 3,
          "upto_2019": 3,
          "upto2009": 2,
          "total_dist": 7,
          "region": "Costa"
        },
        {
          "dpto": "Ica",
          "dpto_str": "Ica",
          "targeted": 21,
          "upto_2019": 28,
          "upto2009": 13,
          "total_dist": 43,
          "region": "Costa"
        },
        {
          "dpto": "La Libertad",
          "dpto_str": "La Libertad",
          "targeted": 72,
          "upto_2019": 19,
          "upto2009": 4,
          "total_dist": 83,
          "region": "Costa"
        },
        {
          "dpto": "Lambayeque",
          "dpto_str": "Lambayeque",
          "targeted": 30,
          "upto_2019": 24,
          "upto2009": 5,
          "total_dist": 38,
          "region": "Costa"
        },
        {
          "dpto": "Lima",
          "dpto_str": "Lima",
          "targeted": 64,
          "upto_2019": 58,
          "upto2009": 37,
          "total_dist": 171,
          "region": "Costa"
        },
        {
          "dpto": "Moquegua",
          "dpto_str": "Moquegua",
          "targeted": 3,
          "upto_2019": 3,
          "upto2009": 3,
          "total_dist": 20,
          "region": "Costa"
        },
        {
          "dpto": "Piura",
          "dpto_str": "Piura",
          "targeted": 53,
          "upto_2019": 23,
          "upto2009": 10,
          "total_dist": 65,
          "region": "Costa"
        },
        {
          "dpto": "Tacna",
          "dpto_str": "Tacna",
          "targeted": 14,
          "upto_2019": 13,
          "upto2009": 4,
          "total_dist": 28,
          "region": "Costa"
        },
        {
          "dpto": "Tumbes",
          "dpto_str": "Tumbes",
          "targeted": 10,
          "upto_2019": 10,
          "upto2009": 0,
          "total_dist": 13,
          "region": "Costa"
        }
      ]
    },
    {
      "name": "data_0",
      "source": "data-c27277dd0f5879bd3c60599eb0a4b7b6",
      "transform": [
        {
          "type": "formula",
          "expr": "datum[\"measures\"] && datum[\"measures\"][\"0\"]",
          "as": "measures.0"
        },
        {
          "type": "formula",
          "expr": "datum[\"dpto_str\"]===\"Peru\" ? 0 : 1",
          "as": "row_dpto_str_sort_index"
        }
      ]
    },
    {
      "name": "concat_0_row_domain",
      "source": "data_0",
      "transform": [
        {
          "type": "aggregate",
          "groupby": ["dpto_str"],
          "fields": ["row_dpto_str_sort_index"],
          "ops": ["max"],
          "as": ["row_dpto_str_sort_index"]
        }
      ]
    },
    {
      "name": "data_3",
      "source": "data_0",
      "transform": [
        {
          "type": "filter",
          "expr": "isValid(datum[\"total_dist\"]) && isFinite(+datum[\"total_dist\"])"
        }
      ]
    },
    {
      "name": "data_4",
      "source": "data_0",
      "transform": [
        {
          "type": "filter",
          "expr": "isValid(datum[\"upto_2019\"]) && isFinite(+datum[\"upto_2019\"])"
        }
      ]
    },
    {
      "name": "data_5",
      "source": "data_0",
      "transform": [
        {
          "type": "filter",
          "expr": "isValid(datum[\"upto2009\"]) && isFinite(+datum[\"upto2009\"])"
        }
      ]
    },
    {
      "name": "data_6",
      "source": "data_0",
      "transform": [
        {
          "type": "filter",
          "expr": "isValid(datum[\"targeted\"]) && isFinite(+datum[\"targeted\"])"
        }
      ]
    }
  ],
  "signals": [
    {"name": "concat_0_child_width", "value": 350},
    {"name": "concat_0_child_height", "value": 30}
  ],
  "layout": {"padding": 20, "bounds": "full", "align": "each"},
  "marks": [
    {
      "type": "group",
      "name": "concat_0_group",
      "title": {
        "anchor": "middle",
        "offset": 5,
        "orient": "top",
        "text": [],
        "subtitle": ["", " ", ""],
        "color": "black",
        "subtitleColor": "black",
        "align": "center",
        "font": "LM Roman",
        "fontSize": 20,
        "fontWeight": "bold"
      },
      "layout": {"padding": 20, "columns": 1, "bounds": "full", "align": "all"},
      "marks": [
        {
          "name": "concat_0_row_header",
          "type": "group",
          "role": "row-header",
          "from": {"data": "concat_0_row_domain"},
          "sort": {
            "field": "datum[\"row_dpto_str_sort_index\"]",
            "order": "ascending"
          },
          "title": {
            "text": {"signal": "''+parent[\"dpto_str\"]"},
            "orient": "left",
            "style": "guide-label",
            "frame": "group",
            "offset": 10
          },
          "encode": {"update": {"height": {"signal": "concat_0_child_height"}}}
        },
        {
          "name": "concat_0_cell",
          "type": "group",
          "style": "cell",
          "from": {
            "facet": {
              "name": "concat_0_facet",
              "data": "data_0",
              "groupby": ["dpto_str"],
              "aggregate": {
                "fields": ["row_dpto_str_sort_index"],
                "ops": ["max"],
                "as": ["row_dpto_str_sort_index"]
              }
            }
          },
          "sort": {
            "field": ["datum[\"row_dpto_str_sort_index\"]"],
            "order": ["ascending"]
          },
          "data": [
            {
              "name": "data_1",
              "source": "concat_0_facet",
              "transform": [
                {
                  "type": "filter",
                  "expr": "isValid(datum[\"total_dist\"]) && isFinite(+datum[\"total_dist\"])"
                }
              ]
            },
            {
              "name": "data_2",
              "source": "concat_0_facet",
              "transform": [
                {
                  "type": "filter",
                  "expr": "isValid(datum[\"upto_2019\"]) && isFinite(+datum[\"upto_2019\"])"
                }
              ]
            },
            {
              "name": "data_3",
              "source": "concat_0_facet",
              "transform": [
                {
                  "type": "filter",
                  "expr": "isValid(datum[\"upto2009\"]) && isFinite(+datum[\"upto2009\"])"
                }
              ]
            },
            {
              "name": "data_4",
              "source": "concat_0_facet",
              "transform": [
                {
                  "type": "filter",
                  "expr": "isValid(datum[\"targeted\"]) && isFinite(+datum[\"targeted\"])"
                }
              ]
            }
          ],
          "encode": {
            "update": {
              "width": {"signal": "concat_0_child_width"},
              "height": {"signal": "concat_0_child_height"}
            }
          },
          "signals": [{"name": "height", "update": "concat_0_child_height"}],
          "marks": [
            {
              "name": "concat_0_child_layer_0_marks",
              "type": "rect",
              "style": ["bar"],
              "from": {"data": "data_1"},
              "encode": {
                "update": {
                  "fill": {"value": "#eee"},
                  "x": {"scale": "concat_0_child_x", "field": "total_dist"},
                  "x2": {"scale": "concat_0_child_x", "value": 0},
                  "yc": {"signal": "concat_0_child_height", "mult": 0.5},
                  "height": {"value": 18}
                }
              }
            },
            {
              "name": "concat_0_child_layer_1_marks",
              "type": "rect",
              "style": ["bar"],
              "from": {"data": "concat_0_facet"},
              "encode": {
                "update": {
                  "fill": {"scale": "color", "field": "measures\\.0"},
                  "x": {"field": {"group": "width"}},
                  "x2": {"value": 0},
                  "y": {"value": 0},
                  "y2": {"field": {"group": "height"}}
                }
              }
            },
            {
              "name": "concat_0_child_layer_2_marks",
              "type": "rect",
              "style": ["bar"],
              "from": {"data": "data_2"},
              "encode": {
                "update": {
                  "fill": {"value": "#ff9896"},
                  "x": {"scale": "concat_0_child_x", "field": "upto_2019"},
                  "x2": {"scale": "concat_0_child_x", "value": 0},
                  "yc": {"signal": "concat_0_child_height", "mult": 0.5},
                  "height": {"value": 10}
                }
              }
            },
            {
              "name": "concat_0_child_layer_3_marks",
              "type": "rect",
              "style": ["bar"],
              "from": {"data": "data_3"},
              "encode": {
                "update": {
                  "fill": {"value": "#d62728"},
                  "x": {"scale": "concat_0_child_x", "field": "upto2009"},
                  "x2": {"scale": "concat_0_child_x", "value": 0},
                  "yc": {"signal": "concat_0_child_height", "mult": 0.5},
                  "height": {"value": 10}
                }
              }
            },
            {
              "name": "concat_0_child_layer_4_marks",
              "type": "rect",
              "style": ["tick"],
              "from": {"data": "data_4"},
              "encode": {
                "update": {
                  "opacity": {"value": 0.7},
                  "fill": {"value": "black"},
                  "xc": {"scale": "concat_0_child_x", "field": "targeted"},
                  "yc": {"signal": "concat_0_child_height", "mult": 0.5},
                  "height": {"value": 15},
                  "width": {"value": 2}
                }
              }
            }
          ],
          "scales": [
            {
              "name": "concat_0_child_x",
              "type": "linear",
              "domain": {
                "fields": [
                  {"data": "data_1", "field": "total_dist"},
                  {"data": "data_2", "field": "upto_2019"},
                  {"data": "data_3", "field": "upto2009"},
                  {"data": "data_4", "field": "targeted"}
                ]
              },
              "range": [0, {"signal": "concat_0_child_width"}],
              "nice": false,
              "zero": true
            }
          ],
          "axes": [
            {
              "scale": "concat_0_child_x",
              "orient": "bottom",
              "grid": true,
              "tickCount": {"signal": "ceil(concat_0_child_width/40)"},
              "domain": false,
              "labels": false,
              "maxExtent": 0,
              "minExtent": 0,
              "ticks": false,
              "zindex": 0
            },
            {
              "scale": "concat_0_child_x",
              "orient": "bottom",
              "grid": false,
              "labelFlush": true,
              "labelOverlap": true,
              "tickCount": {"signal": "ceil(concat_0_child_width/40)"},
              "zindex": 0
            }
          ]
        }
      ]
    }
  ],
  "scales": [
    {
      "name": "color",
      "type": "ordinal",
      "domain": ["2009", "2019", "Targeted districts"],
      "range": ["#d62728", "#ff9896", "black"]
    }
  ],
  "legends": [{"fill": "color", "symbolType": "square"}],
  "config": {
    "legend": {
      "direction": "horizontal",
      "legendX": 75,
      "legendY": -35,
      "orient": "none",
      "padding": 5,
      "rowPadding": 5,
      "strokeColor": "Gray",
      "title": null
    },
    "style": {"group-title": {"fontSize": 20}}
  }
};