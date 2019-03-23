<template>
  <div>
    <message :msg="msg"></message>
    <span id="toggle-message" @click="toggleMessage">Change message</span>
  </div>
</template>

<script>
import Message from '@/components/Message.vue'
export default {
  name: 'message-toggle',
  data: () => ({
    msg: null
  }),
  methods: {
    toggleMessage() {
      this.msg = this.msg === 'message' ? 'toggled message' : 'message'
    }
  },
  components: {
    Message
  }
}
</script>
