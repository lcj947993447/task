<!-- profile -->
<template>
  <div class="profile-page">

    <div class="user-info">
      <div class="container">
        <div class="row">

          <div class="col-xs-12 col-md-10 offset-md-1">
            <img :src="profile.image"
                 class="user-img" />
            <h4>{{profile.username}}</h4>
            <p>
              {{profile.bio}}
            </p>
            <button class="btn btn-sm btn-outline-secondary action-btn"
                    :class="{active: profile.following}"
                    :disabled="profile.onFollowDisabled"
                    @click="onFollow">
              <i class="ion-plus-round"></i>
              &nbsp;
              {{ profile.following ? "unFollow" : "Follow"}} {{profile.username}}
            </button>
          </div>

        </div>
      </div>
    </div>

    <div class="container">
      <div class="row">

        <div class="col-xs-12 col-md-10 offset-md-1">
          <!-- 文章 tab -->
          <div class="articles-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item">
                <nuxt-link class="nav-link"
                           :class="{
                             active: tab === 'my_articles'
                            }"
                           exact
                           :to="{
                             name: 'profile',
                             params:{
                               username: profile.username
                             }
                           }">My Articles</nuxt-link>
              </li>
              <li class="nav-item">
                <nuxt-link class="nav-link"
                           :class="{
                             active: tab === 'favorited_articles'
                             }"
                           exact
                           :to="{
                             name: 'profile',
                             params:{
                               username: profile.username
                             },
                             query: {
                                tab: 'favorited_articles'
                             }
                           }">Favorited Articles</nuxt-link>
              </li>
            </ul>
          </div>
          <!-- 文章 list -->
          <div class="article-preview"
               v-for="article in articles"
               :key="article.slug">
            <div class="article-meta">
              <nuxt-link :to="{
                              name: 'profile',
                              params:{
                                username: article.author.username
                              }
                            }
                          ">
                <img :src="article.author.image" />
              </nuxt-link>
              <div class="info">
                <nuxt-link class="author"
                           :to="{
                              name: 'profile',
                              params:{
                                username: article.author.username
                              }
                            }
                          ">{{article.author.username}}</nuxt-link>
                <span class="date">{{ article.createdAt | date('MMM DD, YYYY') }}</span>
              </div>
              <button class="btn btn-outline-primary btn-sm pull-xs-right"
                      v-if="article.author.username !== profile.username"
                      :class="{
                        active: article.favorited
                      }"
                      @click="onFavorite(article)"
                      :disabled='article.favoriteDisabled'>
                <i class="ion-heart"></i> {{ article.favoritesCount }}
              </button>
            </div>
            <nuxt-link class="preview-link"
                       :to="{
                        name: 'article',
                        params: {
                          slug: article.slug
                        }
                      }">
              <h1>{{ article.title }}</h1>
              <p>{{ article.description}}</p>
              <span>Read more...</span>
            </nuxt-link>
          </div>
          <!-- 分页 -->
          <nav>
            <ul class="pagination">
              <li class="page-item"
                  :class="{active: item === page}"
                  v-for="item in totalPage"
                  :key="item">
                <nuxt-link class="page-link"
                           :to="{
                            name: 'profile',
                            params: {
                              username: profile.username
                            },
                            query: {
                              page: item,
                              tab: tab
                            }
                           }">
                  {{ item }}
                </nuxt-link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { getProfile, followUser, unFollowUser } from '@/api/profile'
import { getArticles, addFavorite, deleteFavorite } from '@/api/article'
export default {
  middleware: 'authenticated',
  name: 'ProfileIndex',
  async asyncData ({ query, params }) {
    const page = Number.parseInt(query.page || 1)
    const limit = 10
    const tab = query.tab || 'my_articles'
    const type = tab === 'my_articles'
    const [profileRes, articleRes] = await Promise.all([
      getProfile(params.username),
      getArticles({
        limit,
        offset: (page - 1) * limit,
        author: type ? params.username : '',
        favorited: type ? '' : params.username
      })
    ])

    const { profile } = profileRes.data
    const { articles, articlesCount } = articleRes.data
    profile.onFollowDisabled = false
    articles.forEach(article => {
      article.favoriteDisabled = false
    })
    return {
      profile, // 作者信息
      tab, // tab 选项卡
      articles, // 文章列表
      articlesCount, // 文章页码
      page, // 页码
      limit // 每页数据条数
    }
  },
  watchQuery: ['page', 'tab'],
  computed: {
    totalPage () {
      return Math.ceil(this.articlesCount / this.limit)
    }
  },
  methods: {
    async onFollow () {
      this.profile.onFollowDisabled = true
      if (this.profile.following)
      {
        await unFollowUser(this.profile.username)
        this.profile.following = false
      } else
      {
        await followUser(this.profile.username)
        this.profile.following = true
      }
      this.profile.onFollowDisabled = false
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