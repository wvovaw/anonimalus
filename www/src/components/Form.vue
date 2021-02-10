<template>
  <form
    name="message"
    method="post"
    v-on:submit.prevent="handleSubmit"
    action="/send"
  >
    <div class="reciever-wrapper">
      <label>Channel</label>
      <input type="radio" name="target" value="channel" v-model="formData.target"><br />
      <label>User</label>
      <input type="radio" name="target" value="user" v-model="formData.target">
    </div>
    <div class="id-wrapper">
      <label>Channel ID</label>
      <input type="text" v-model="formData.clientId">
    </div>
    <div class="message-wrapper">
      <label for="message">Message</label>
      <textarea name="message" v-model="formData.message"></textarea>
    </div>

    <button
      :disabled="formData.message.length < 1 || formData.clientId.length < 18"
      type="submit"
    >Send</button>
  </form>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      formData: {
        clientId: null,
        message: '',
        target: 'channel'
      }
    }
  },
  methods: {
  encode(data) {
    return Object.keys(data)
      .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
      .join('&')
  },
  async handleSubmit(e) {
    const d = new FormData();
    d.append('clientId', this.formData.clientId);
    d.append('message', this.formData.message);
    d.append('target', this.formData.target);
    axios({
      method: 'post',
      headers: {'Content-Type': 'multipart/form-data' },
      url: 'https://anonimalus.herokuapp.com/send',
      // url: 'http://localhost:3000/send',
      data: d
    })
      .then(r => alert(r.data))
      .catch(e => console.error(e));
  }
}
}
</script>

<style>
</style>
