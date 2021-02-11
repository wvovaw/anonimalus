<template>
<div class="container">
  <form
    name="message"
    method="post"
    v-on:submit.prevent="handleSubmit"
    action="/send"
  >
    <div class="grid">
      <div class="radio-wrapper">
        <label>Channel<input type="radio" name="target" value="Channel" v-model="formData.target"></label>
        <br />
        <label>User<input type="radio" name="target" value="User" v-model="formData.target"></label>

      </div>
      <div class="input-wrapper">
        <label>{{ formData.target }} ID</label>
        <input type="text" v-model="formData.clientId">
      </div>
      <div class="input-wrapper">
        <label for="message">Message</label>
        <textarea rows=3 name="message" v-model="formData.message"></textarea>
      </div>

      <button
        :disabled="formData.message.length < 1 || formData.clientId.length < 18"
        type="submit"
      >Send</button>
    </div>
  </form>
</div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      formData: {
        clientId: null,
        message: '',
        target: 'Channel'
      }
    }
  },
  methods: {
    async handleSubmit(e) {
      const d = new FormData();
      d.append('clientId', this.formData.clientId);
      d.append('message', this.formData.message);
      d.append('target', this.formData.target.toLowerCase());
      axios({
        method: 'post',
        headers: {'Content-Type': 'multipart/form-data' },
        url: 'https://anonimalus.herokuapp.com/send',
        // url: 'http://localhost:3000/send',
        data: d
      })
        .then(r =>  {
          alert(r.data);
          if (r.data.includes('Success!')) this.formData.message = '';
        })
        .catch(e => console.error(e));
    }
  }
}
</script>

<style lang="css" scoped>
.container {
  border: white 1px solid;
  padding: 10px;
}
.input-wrapper {
  display: grid;
  margin-top: 5px;
}
button {
  margin-top: 20px;
  font-size: 1.1em;
  background-color: black;
  color: white;
}
button:disabled {
  color: grey;
}
input[type=text], textarea {
  border: 2px solid white;
  border-radius: 4px;
  background-color: black;
  color: green;
  font-size: 1em;
}
input[type=radio] {
  background-color: green;
  color: red;
}
</style>
