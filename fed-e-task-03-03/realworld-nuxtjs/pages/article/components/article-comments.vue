<template>
  <div>
    <form class="card comment-form"
          @submit.prevent="onSubmit">
      <div class="card-block">
        <textarea class="form-control"
                  placeholder="Write a comment..."
                  rows="3"
                  v-model="comment.body"></textarea>
      </div>
      <div class="card-footer">
        <img class="comment-author-img"
             :src="user.image" />
        <button class="btn btn-sm btn-primary">
          Post Comment
        </button>
      </div>
    </form>

    <div class="card"
         v-for="comment in comments"
         :key="comment.id">
      <div class="card-block">
        <p class="card-text">{{ comment.body }}</p>
      </div>
      <div class="card-footer">
        <nuxt-link class="comment-author"
                   :to="{
             name: 'profile',
             params: {
               username: comment.author.username
             }
           }">
          <img class="comment-author-img"
               :src="comment.author.image" />
        </nuxt-link>
        &nbsp;
        <nuxt-link class="comment-author"
                   :to="{
                    name: 'profile',
                    params: {
                      username: comment.author.username
                    }
           }">
          {{ comment.author.username }}
        </nuxt-link>
        <span class="date-posted">{{ comment.ceratedAt | date('MMM DD, YYYY') }}</span>
      </div>
    </div>

  </div>
</template>

<script>
import { getComments, addComment } from '@/api/article'
import { mapState } from 'vuex'

export default {
  name: 'ArticleComments',
  props: {
    article: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      comments: [], // 评论列表
      comment: {
        body: ''
      }
    }
  },
  computed: {
    ...mapState(['user'])
  },
  async mounted () {
    const { data } = await getComments(this.article.slug)
    this.comments = data.comments
  },
  methods: {
    async onSubmit () {
      try
      {
        const { data } = await addComment(this.article.slug,
          {
            comment: this.comment
          })
        console.log(data)
      } catch (error)
      {
        console.log(error)
      }

    }
  }
}
</script>

<style>
</style>