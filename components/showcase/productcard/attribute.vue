<template>
  <div :class="$style.option" :data-disabled="disabled" :data-active="active" @click="clickOption">
    <div v-if="attribute_code === 'color'" :style="{background: value.value}" :class="$style.color" />
    <div v-else :class="$style.size">
      {{value.label}}
    </div>
  </div>    
</template>

<script>
export default {
  name: "ProductcardAttribute",
  props: {
    activeAttributes: { type: Array, required: true },
    disabledAttributes: { type: Array, required: true },
    value: {required: true, type: Object},
    attribute_code: {required: true, type: String},
  },
  methods: {
    clickOption() {
      if (this.disabled) return;
      const attr = {
        code: this.attribute_code,
        value_index: this.value.value_index
      }
      this.$emit("click", attr)
    }
  },
  computed: {
    active() {
      return Boolean(this.activeAttributes.find(({code, value_index}) => code === this.attribute_code && this.value.value_index === value_index))
    },
    disabled(){
      return Boolean(this.disabledAttributes.find(({code, value_index}) => code === this.attribute_code && this.value.value_index === value_index))
    }
  }
}
</script>

<style lang="css" module>
.option {
  --product-card-optionvalue-border-color: #fff;
  width: 40px;
  height: 20px;
  text-align: center;
  position: relative;
  border: 2px solid var(--product-card-optionvalue-border-color);
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}
[data-disabled].option {
  cursor: default;
}
[data-disabled].option::before, [data-disabled].option::after {
  content: "";
  position: absolute;
  top: 0;
  width: 38px;
  height: 0;
  border: 2px solid gray;
  background-color: transparent;
  z-index: 1;
}
[data-disabled].option::before {
  left: 0;
  transform: rotate(24deg) translate(-1px, 6px);
}
[data-disabled].option::after {
  right: 0;
  transform: rotate(-24deg) translate(1px, 6px);
}
[data-active].option:not([data-disabled]) {
  --product-card-optionvalue-border-color: #009900;
}
.option .color {
  position: absolute;
  width: 100%;
  top: 0;
  bottom: 0;
  z-index: 0;
}
.option .size {
  line-height: 1;
  font-size: 10px;
  width: 100%;
  text-align: center;
}
</style>