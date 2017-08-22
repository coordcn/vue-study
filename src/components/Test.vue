<template>
  <v-card>
    <v-card-row>
    <v-card-title>
        <v-btn light class="blue-grey">
          <v-icon left light>add_to_queue</v-icon>
          新增
        </v-btn>
        <v-btn light class="blue-grey">
          <v-icon left light>remove_from_queue</v-icon>
          删除
        </v-btn>
    <v-dialog v-model="hideColumn" scrollable width="960">
        <v-btn light class="blue-grey" slot="activator">
          隐藏列
        </v-btn>
      <v-card>
        <v-card-row>
        <v-card-title>显示或隐藏列</v-card-title>
        </v-card-row>
        <v-divider></v-divider>
        <v-card-row>
      <v-card-title>
        <v-layout row wrap>
          <v-flex xs2 v-for="header in headers" :key="header.name">
            <v-checkbox :label="header.text" v-model="ex1" dark :title="header.text"></v-checkbox>
          </v-flex>
        </v-layout>
      </v-card-title>
        </v-card-row>
        <v-divider></v-divider>
        <v-card-row actions>
          <v-btn class="blue--text darken-1" flat @click.native="hideColumn = false">取消</v-btn>
          <v-btn class="blue--text darken-1" flat @click.native="hideColumn = false">确认</v-btn>
        </v-card-row>
      </v-card>
    </v-dialog>
    <v-dialog v-model="filter" scrollable width="960">
      <v-btn light class="blue-grey" slot="activator">高级搜索</v-btn>
      <v-card>
        <v-card-row>
        <v-card-title>高级搜索</v-card-title>
        </v-card-row>
        <v-divider></v-divider>
        <v-card-row>
  <v-data-table
      v-bind:headers="filterHeaders"
      :items="filterItems"
      hide-actions
      selected-key="name"
      select-all="selectall"
    >
    <template slot="items" scope="props">
        <td style="width:72px;">
          <v-checkbox
            hide-details
            v-model="props.selected"
          ></v-checkbox>
        </td>
      <td style="width:25%">{{ props.item.column }}</td>
      <td class="text-xs-right" style="width:160px;">            
            <v-select
              v-bind:items="methods"
              v-model="props.item.method"
              item-text="text"
              item-value="value"
              dark
              single-line
              auto
            ></v-select></td>
      <td class="text-xs-right" style="width:25%">
          <c-table-inline-editor
            :item="props.item"
            column="c1"
          ></c-table-inline-editor>
      </td>
      <td class="text-xs-right" style="width:25%">
          <c-table-inline-editor
            :item="props.item"
            column="c2"
          ></c-table-inline-editor>
      </td>
    </template>
  </v-data-table>
        </v-card-row>
        <v-divider></v-divider>
        <v-card-row actions>
          <v-btn class="blue--text darken-1" flat @click.native="filter = false">取消</v-btn>
          <v-btn class="blue--text darken-1" flat @click.native="filter = false">确认</v-btn>
        </v-card-row>
      </v-card>
    </v-dialog>
        <v-btn light class="blue-grey" slot="activator">导出</v-btn>
      <v-spacer></v-spacer>
      <v-text-field
        append-icon="search"
        single-line
        hide-details
        v-model="search"
        prefix="搜索："
      ></v-text-field>
    </v-card-title>
    </v-card-row>
      <v-data-table
        v-bind:headers="headers"
        v-bind:items="items"
        v-bind:search="search"
        v-model="selected"
        selected-key="name"
        select-all="selectall"
      >
        <template slot="headers" scope="props">
          <span v-tooltip:bottom="{ 'html': props.item.text }">
            {{ props.item.text }}
          </span>
        </template>
        <template slot="items" scope="props">
        <td style="width:64px;">
          <v-checkbox
            hide-details
            v-model="props.selected"
          ></v-checkbox>
        </td>
        <td>
          <c-table-inline-editor
            :item="props.item"
            column="name"
          ></c-table-inline-editor>
        </td>
        <td class="text-xs-right">{{ props.item.calories }}</td>
        <td class="text-xs-right">{{ props.item.fat }}</td>
        <td class="text-xs-right">{{ props.item.carbs }}</td>
        <td class="text-xs-right">{{ props.item.protein }}</td>
        <td class="text-xs-right">{{ props.item.sodium }}</td>
        <td class="text-xs-right">{{ props.item.calcium }}</td>
        <td>
          <c-edit-dialog
            style="width:80px;text-overflow:clip;word-break:keep-all;white-space:nowrap;"
            class="text-xs-right"
            @open="props.item._iron = props.item.iron"
            @cancel="props.item.iron = props.item._iron || props.item.iron"
            large
            cancelText="取消"
            saveText="保存"
          >
            <div class="text-xs-right">{{ props.item.iron }}</div>
            <div slot="input" class="mt-3 subheading">Update Iron</div>
            <v-text-field
              style="margin:10px 0;"
              slot="input"
              v-bind:value="props.item.iron"
              v-on:change="val => props.item.iron = val"
              single-line
              counter
              autofocus
            ></v-text-field>
          </c-edit-dialog>
        </td>
      </template>
      <template slot="pageText" scope="{ pageStart, pageStop }">
        From {{ pageStart }} to {{ pageStop }}
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
  import EditDialog from './EditDialog'
  import TableInlineEditor from './TableInlineEditor'

  export default {
    components: {
      'c-table-inline-editor': TableInlineEditor,
      "c-edit-dialog": EditDialog
    },
    data () {
      return {
        ex1: true,
        search: '',
        selected: [],
        pagination: {},
        selectall: true,
        hideColumn: false,
        filter: false,
        methods: [
          {text:'等于', value:'EQ'},
          {text:'不等于', value:'NEQ'},
          {text:'介于', value:'BT'},
          {text:'大于', value:'GT'},
          {text:'大于等于', value:'GE'},
          {text:'小于', value:'LT'},
          {text:'小于等于', value:'LE'},
        ],
        filterHeaders: [
          {
            text: '列名',
            left: true,
            sortable: false,
            value: 'column'
          },
          {
            text: '筛选方式',
            left: true,
            sortable: false,
            value: 'method'
          },
          {
            text: '筛选条件',
            sortable: false,
            value: 'c1'
          },
          {
            text: '筛选条件',
            sortable: false,
            value: 'c2'
          },
        ],
        filterItems: [
          {
            column: '产品分类编码',
            method: 'EQ',
            c1: 6.1,
            c2: 24.1,
          },
          {
            column: '产品名称',
            method: 'EQ',
            c1: 6.2,
            c2: 24.2,
          },
          {
            column: '产品型号',
            method: 'EQ',
            c1: 6.3,
            c2: 24.3,
          },
          {
            column: 'HS编码',
            method: 'EQ',
            c1: 6.4,
            c2: 24.4,
          },
          {
            column: '物料清单',
            method: 'EQ',
            c1: 6.5,
            c2: 24.5,
          },
          {
            column: '包装方式',
            method: 'EQ',
            c1: 6.6,
            c2: 24.6,
          },
          {
            column: '单价',
            method: 'EQ',
            c1: 6.7,
            c2: 24.7,
          },
          {
            column: '产品编码',
            method: 'EQ',
            c1: 6.8,
            c2: 24.8,
          },
        ],
        headers: [
          {
            text: '产品分类编码产品分类编码',
            left: true,
            sortable: false,
            value: 'name'
          },
          { text: '产品名称', value: 'fat' },
          { text: '产品型号', value: 'carbs' },
          { text: 'HS编码', value: 'protein' },
          { text: '物料清单', value: 'sodium' },
          { text: '包装方式', value: 'calcium' },
          { text: '单价', value: 'iron' },
          { text: '产品编码', value: 'calories' }
        ],
        items: [
          {
            value: false,
            name: 'Frozen Yogurt',
            calories: 159,
            fat: 6.0,
            carbs: 24,
            protein: 4.0,
            sodium: 87,
            calcium: '14%',
            iron: '1%'
          },
          {
            value: false,
            name: 'Ice cream sandwich',
            calories: 237,
            fat: 9.0,
            carbs: 37,
            protein: 4.3,
            sodium: 129,
            calcium: '8%',
            iron: '1%'
          },
          {
            value: false,
            name: 'Eclair',
            calories: 262,
            fat: 16.0,
            carbs: 23,
            protein: 6.0,
            sodium: 337,
            calcium: '6%',
            iron: '7%'
          },
          {
            value: false,
            name: 'Cupcake',
            calories: 305,
            fat: 3.7,
            carbs: 67,
            protein: 4.3,
            sodium: 413,
            calcium: '3%',
            iron: '8%'
          },
          {
            value: false,
            name: 'Gingerbread',
            calories: 356,
            fat: 16.0,
            carbs: 49,
            protein: 3.9,
            sodium: 327,
            calcium: '7%',
            iron: '16%'
          },
          {
            value: false,
            name: 'Jelly bean',
            calories: 375,
            fat: 0.0,
            carbs: 94,
            protein: 0.0,
            sodium: 50,
            calcium: '0%',
            iron: '0%'
          },
          {
            value: false,
            name: 'Lollipop',
            calories: 392,
            fat: 0.2,
            carbs: 98,
            protein: 0,
            sodium: 38,
            calcium: '0%',
            iron: '2%'
          },
          {
            value: false,
            name: 'Honeycomb',
            calories: 408,
            fat: 3.2,
            carbs: 87,
            protein: 6.5,
            sodium: 562,
            calcium: '0%',
            iron: '45%'
          },
          {
            value: false,
            name: 'Donut',
            calories: 452,
            fat: 25.0,
            carbs: 51,
            protein: 4.9,
            sodium: 326,
            calcium: '2%',
            iron: '22%'
          },
          {
            value: false,
            name: 'KitKat',
            calories: 518,
            fat: 26.0,
            carbs: 65,
            protein: 7,
            sodium: 54,
            calcium: '12%',
            iron: '6%'
          }
        ]
      }
    }
  }
</script>
