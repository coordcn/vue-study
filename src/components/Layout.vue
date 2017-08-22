<template lang="pug">
  v-app(style="height:100%;")
    v-navigation-drawer(
      v-model="drawer"
      persistent
      class="teal"
      dark
      :mini-variant.sync="mini"
      style="margin-top:0 !important;max-height:none;overflow-y:auto !important;"
    )
      v-list(
        style="box-shadow: 0 2px 4px -1px rgba(0,0,0,.2),0 4px 5px rgba(0,0,0,.14),0 1px 10px rgba(0,0,0,.12);margin-bottom:10px"
      )
        v-list-item
          v-list-tile(
            avatar tag="div" 
            style="padding-right:6px"
          )
            v-list-tile-avatar
              img(
                src="/static/v.png"
                style="border-radius: 0 !important"
              )
            v-list-tile-content.show-overflow
              router-link(to="/" style="text-decoration:none;")
                span.title(style="color:white;") 经纬互联
            v-list-tile-action
              v-btn(icon light v-on:click.native.stop="mini = !mini" title="收缩左侧导航栏")
                v-icon(medium) dashboard
      v-list
        template(v-for="item in items")
          v-list-group(
            v-if="item.items" 
            v-bind:group="item.group"
          )
            v-list-tile(slot="item" ripple)
              v-list-tile-action
                v-icon(light style="color:white;") {{ item.action }}
              v-list-tile-content
                v-list-tile-title {{ item.title }}
              v-list-tile-action(v-if="item.tasks")
                span(class="orange darken-4" style="padding:0 4px;height:22px;min-width:22px;border-radius:45%;text-align:center;") {{ item.tasks }}
            v-list-item(v-for="subItem in item.items" v-bind:key="subItem")
              v-list-tile(
                :href="subItem.href"
                v-bind:router="!subItem.target"
                ripple
                v-bind:disabled="subItem.disabled"
                v-bind:target="subItem.target"
              )
                v-list-tile-content
                  v-list-tile-title(style="color:white;") {{ subItem.title }}
                v-list-tile-action(v-if="subItem.action")
                  v-icon(light style="color:white;") {{ subItem.action }}
          v-list-item(v-else)
            v-list-tile(:href="item.href" router ripple v-bind:disabled="item.disabled")
              v-list-tile-action
                v-icon(light) {{ item.action }}
              v-list-tile-content
                v-list-tile-title {{ item.title }}
    main(style="height:100%;")
      router-view
</template>

<script>
  export default {
    data () {
      return {
        mini: false,
        drawer: true,
        items: [
          {
            title: '行业',
            action: 'language',
            group: 'motion',
            tasks: 999,
            items: [
              { href: '/motion/table', title: '常用网址' },
              { href: '/motion/table', title: '行业新闻' },
            ]
          },
          {
            title: '任务',
            action: 'work',
            group: 'equip',
            tasks: 6,
            items: [
              { href: '/equip/table', title: '所有设备' }
            ]
          },
          {
            title: '项目',
            action: 'dashboard',
            group: 'equip',
            items: [
              { href: '/equip/table', title: '所有设备' }
            ]
          },
          {
            title: '团队',
            action: 'group',
            group: 'equip',
            items: [
              { href: '/equip/table', title: '所有设备' }
            ]
          },
          {
            title: '客户',
            action: 'public',
            group: 'equip',
            items: [
              { href: '/equip/table', title: '所有设备' }
            ]
          },
          {
            title: '供应商',
            action: 'pages',
            group: 'equip',
            items: [
              { href: '/equip/table', title: '所有设备' }
            ]
          },
          {
            title: '产品',
            action: 'widgets',
            group: 'equip',
            items: [
              { href: '/equip/table', title: '所有设备' }
            ]
          },
          {
            title: '设备',
            action: 'move_to_inbox',
            group: 'settings',
            items: [
              { href: '/settings/user', title: '个人设置' },
              { href: '/settings/msg', title: '消息管理' },
              { href: '/settings/apps', title: '应用管理' }
            ]
          },
          {
            title: '生产',
            action: 'laptop_chromebook',
            group: 'settings',
            items: [
              { href: '/settings/user', title: '个人设置' },
              { href: '/settings/msg', title: '消息管理' },
              { href: '/settings/apps', title: '应用管理' }
            ]
          },
          {
            title: '库存',
            action: 'dns',
            group: 'settings',
            items: [
              { href: '/settings/user', title: '个人设置' },
              { href: '/settings/msg', title: '消息管理' },
              { href: '/settings/apps', title: '应用管理' }
            ]
          },
          {
            title: '财务',
            action: 'archive',
            group: 'settings',
            items: [
              { href: '/settings/user', title: '个人设置' },
              { href: '/settings/msg', title: '消息管理' },
              { href: '/settings/apps', title: '应用管理' }
            ]
          },
          {
            title: '设置',
            action: 'settings',
            group: 'settings',
            items: [
              { href: '/settings/user', title: '个人设置' },
              { href: '/settings/msg', title: '消息管理' },
              { href: '/settings/apps', title: '应用管理' }
            ]
          },
        ]
      }
    }
  }
</script>
