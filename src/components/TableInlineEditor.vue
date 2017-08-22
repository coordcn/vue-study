<template>
  <div>
    <div v-if="!editing" @dblclick="toggleEditable" class="table_editable_field">
      {{ this.item[this.column] }}
    </div>
    <div v-else-if="editing">
      <v-text-field
        slot="input"
        v-bind:value="datavalue"
        v-on:change="val => datavalue = val"
        single-line
        hide-details
        append-icon="check"
        :append-icon-cb="saveThis"
        v-click-outside="cancelThis"
      ></v-text-field>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['item', 'column'],
      data: function () {
          return {
            editing: false,
            datavalue: this.item[this.column],
          }
      },
      watch: {
        editing (val) {
          val && this.$nextTick(this.focus)
        }
      },
      methods: {
        saveThis: function() {
          this.item[this.column] = this.datavalue;
          this.editing=!this.editing;
        },
        cancelThis: function() {
          this.datavalue = this.item[this.column]
          this.editing=!this.editing;
        },
        toggleEditable: function () {
          this.datavalue = this.item[this.column]
          this.editing=!this.editing;
        },
        focus: function() {
          const input = this.$el.querySelector('input')
          if (input) {
            var len = input.value.length;
            this.setSelectionRange(input, len, len);
          }
        },
        setSelectionRange: function(input, start, end) {
          if (input.setSelectionRange) {  
              input.focus();  
              input.setSelectionRange(start, end);  
          } else if (input.createTextRange) {  
              var range = input.createTextRange();  
              range.collapse(true);  
              range.moveEnd('character', end);  
              range.moveStart('character', start);  
              range.select();  
          }  
        }
      }
  }
</script>

<style>
  .table_editable_field {
    cursor:pointer;
  }
</style>
