<template>
  <div class="article-meta">
    <nuxt-link :to="{
      name: 'profile',
      params: {
        username: article.author.username
      }
    }">
      <img :src="article.author.image" />
    </nuxt-link>
    <div class="info">
      <nuxt-link class="author"
                 :to="{
                   name: 'profile',
                   params: {
                     username: article.author.username
                   }
                 }">
        {{article.author.username}}
      </nuxt-link>
      <span class="date">{{article.createdAt | date('MMM DD, YYY')}}</span>
    </div>
    <template v-if="user.username === article.author.username">
      <nuxt-link class="btn btn-outline-secondary btn-sm"
                 :to="{
                  name: 'editor',
                  params: {
                    slug: article.slug
                  }
         }">
        <i class="ion-edit"></i> Edit Article
      </nuxt-link>
      <button class="btn btn-outline-danger btn-sm"
              @click="delArticle">
        <i class="ion-trash-a"></i> Delete Article
      </button>
    </template>
    <template v-else>
      <button class="btn btn-sm btn-outline-secondary"
              :class="{active: article.author.following}"
              :disabled="article.author.onFollowDisabled"
              @click="onFollow">
        <i class="ion-plus-round"></i>
        &nbsp;
        {{ article.author.following ? "unFollow" : "Follow"}} {{article.author.username}} <span class="counter">(10)</span>
      </button>
      &nbsp;&nbsp;
      <button class="btn btn-sm btn-outline-primary"
              :class="{active: article.favorited}"
              @click="onFavorite">
        <i class="ion-heart"></i>
        &nbsp;
        Favorite Post <span class="counter">({{article.favoritesCount}})</span>
      </button>
    </template>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { deleteArticle, addFavorite, deleteFavorite } from '@/api/article'
export default {
  name: 'ArticleMeta',
  props: {
    article: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapState(['user'])
  },
  methods: {
    async delArticle () {
      const { data } = await deleteArticle(this.article.slug)
      console.log(data)
      this.$router.push('/')
    },
    async onFollow () {
      this.article.author.onFollowDisabled = true
      if (this.article.author.following)
      {
        await unFollowUser(this.article.author.username)
        this.article.author.following = false
      } else
      {
        await followUser(this.article.author.username)
        this.article.author.following = true
      }
      this.article.author.onFollowDisabled = false
    },
    async onFavorite (article) {
      article.favoriteDisabled = true
      if (article.favorited)
      {
        // 取消点赞
        await deleteFavorite(article.slug)
        article.favorited = false
        article.favoritesCount += -1
      } else
      {
        // 添加点赞
        await addFavorite(article.slug)
        article.favorited = true
        article.favoritesCount += 1
      }
      article.favoriteDisabled = false
    }
  }
}
</script>

<style>
</style>