<template>
  <form
    name="message"
    method="post"
    v-on:submit.prevent="handleSubmit"
    action="/send"
    data-netlify="true"
    data-netlify-honeypot="bot-field"
  >
    <p hidden>
      <label>
        Don’t fill this out: <input name="bot-field" />
      </label>
    </p>

    <div class="id-wrapper">
      <label>Channel ID</label>
      <input type="text" v-model="formData.channelID">
    </div>
    <div class="message-wrapper">
      <label for="message">Message</label>
      <textarea name="message" v-model="formData.message"></textarea>
    </div>

    <button type="submit">Submit form</button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      formData: {
        channelID: 0,
        message: ''
      }
    }
  },
  methods: {
  encode(data) {
    return Object.keys(data)
      .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
      .join('&')
  },
  handleSubmit(e) {
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: this.encode({
        'form-name': e.target.getAttribute('name'),
        ...this.formData,
      }),
    })
    .then(() => window.alert('Success'))
    .catch(error => alert(error))
  }
}
}
</script>

<style>
</style>
