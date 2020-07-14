<template>
	<div class="editable">
		<div v-if="isEditing">
			<a-input style="width:80%"
				type="text"
				v-model="newVal" />
		</div>
		<p v-else>{{value}}</p>
		<button @click="edit"
			:class="{'active':isEditing}">{{isEditing?'保存':'编辑'}}</button>
	</div>
</template>

<script>
import Vue from 'vue'
import { editNPP } from '@/api/businessAuth'
export default {
  props: ['value', 'type'],
  data () {
    return {
      isEditing: false,
      newVal: ''
    }
  },
  methods: {
    edit (type) {
      if (!this.isEditing) {
        this.isEditing = true
      } else {
        this.blur()
      }
    },
    async save (type) {
      this.$emit('editSave', { type, val: this.newVal })
      this.isEditing = false
    },
    blur () {
      const strategies = {
        name: '请输入名字',
        position: '请输入职位',
        phone: '请输入手机号'
      }
      if (this.newVal === '') {
        this.$notification.error({
          message: strategies[this.type]
        })
        return
      }
      this.save(this.type)
    }
  }
}
</script>
