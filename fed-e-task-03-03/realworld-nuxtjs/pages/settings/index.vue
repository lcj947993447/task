<!-- settings -->
<template>
  <div class="settings-page">
    <div class="container page">
      <div class="row">

        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Your Settings</h1>

          <form @submit.prevent="onSubmit">
            <fieldset>
              <fieldset class="form-group">
                <input class="form-control"
                       type="text"
                       placeholder="URL of profile picture"
                       v-model="user.image">
              </fieldset>
              <fieldset class="form-group">
                <input class="form-control form-control-lg"
                       type="text"
                       placeholder="Your Name"
                       required
                       minlength="1"
                       maxlength="20"
                       v-model="user.username">
              </fieldset>
              <fieldset class="form-group">
                <textarea class="form-control form-control-lg"
                          rows="8"
                          placeholder="Short bio about you"
                          required
                          minlength="8"
                          maxlength="20"
                          v-model="user.bio"></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input class="form-control form-control-lg"
                       type="email"
                       placeholder="Email"
                       required
                       v-model="user.email">
              </fieldset>
              <fieldset class="form-group">
                <input class="form-control form-control-lg"
                       type="password"
                       placeholder="Password"
                       equired
                       minlength="8"
                       maxlength="20"
                       v-model="user.password">
              </fieldset>
              <button class="btn btn-lg btn-primary pull-xs-right">
                Update Settings
              </button>
            </fieldset>
          </form>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import { currentUser, updateUser } from '@/api/auth'
import { mapState } from 'vuex'
export default {
  middleware: 'authenticated',
  name: 'SettingsIndex',
  data () {
    return {
      user: {
        email: null,
        username: null,
        password: null,
        image: null,
        bio: null
      }
    }
  },
  async mounted () {
    const { data } = await currentUser()
    const { user } = data
    const { email, username, image, bio } = user
    console.log(data)
    this.user.email = email
    this.user.username = username
    this.user.image = image
    this.user.bio = bio
  },
  methods: {
    async onSubmit () {
      const { data } = await updateUser({
        user: this.user
      })
      console.log(data)
    }
  }
}
</script>
