<!-- editor -->
<template>
  <div class="editor-page">
    <div class="container page">
      <div class="row">

        <div class="col-md-10 offset-md-1 col-xs-12">
          <form @submit.prevent="onSubmit">
            <fieldset>
              <fieldset class="form-group">
                <input type="text"
                       class="form-control form-control-lg"
                       placeholder="Article Title"
                       required
                       minlength="1"
                       maxlength="20"
                       v-model="article.title">
              </fieldset>
              <fieldset class="form-group">
                <input type="text"
                       class="form-control"
                       placeholder="What's this article about?"
                       required
                       minlength="1"
                       maxlength="20"
                       v-model="article.description">
              </fieldset>
              <fieldset class="form-group">
                <textarea class="form-control"
                          rows="8"
                          placeholder="Write your article (in markdown)"
                          required
                          minlength="1"
                          maxlength="20"
                          v-model="article.body"></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input type="text"
                       class="form-control"
                       placeholder="Enter tags"
                       v-model="tags">
                <div class="tag-list"></div>
              </fieldset>
              <button class="btn btn-lg pull-xs-right btn-primary"
                      type="submit"
                      :disabled="submitArticleDisabled">
                Publish Article
              </button>
            </fieldset>
          </form>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import { getArticle, createArticle, editorArticle } from '@/api/article'
export default {
  // 在路由匹配组件渲染之前会先执行中间件处理
  middleware: 'authenticated',
  name: 'EditorIndex',
  data () {
    return {
      article: {
        title: '',
        description: '',
        body: '',
        tagList: []
      },
      submitArticleDisabled: false,
      tags: ''
    }
  },
  async mounted () {
    if (this.$route.params.slug)
    {
      const { data } = await getArticle(this.$route.params.slug)
      const { article } = data
      this.tags = article.tagList.join(' ')
      this.article = article
    }
  },
  methods: {
    async onSubmit () {
      try
      {
        this.submitArticleDisabled = true
        this.article.tagList = this.tags.split(' ')
        const { data } = this.$route.query.slug
          ? await editorArticle(this.article.slug, {
            article: this.article
          })
          : await createArticle({
            article: this.article
          })
        this.submitArticleDisabled = false
        this.$router.push({
          path: `/article/${data.article.slug}`
        })
      } catch (error)
      {
        console.log(error)
      }

    }
  }
}
</script>
