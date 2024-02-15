import type { HttpContext } from '@adonisjs/core/http'
import Blog from '#models/blog'

export default class PostsController {
  public async store({ request, response }: HttpContext) {
    const body = request.body()
    const post = await Blog.create(body)

    response.status(201)

    return {
      message: 'Post criado com sucesso!',
      data: post,
    }
  }

  public async index() {
    const posts = await Blog.query().preload('comments')

    return {
      data: posts,
    }
  }

  public async show({ params }: HttpContext) {
    const post = await Blog.findOrFail(params.id)

    await post.load('comments')

    return {
      data: post,
    }
  }

  public async destroy({ params }: HttpContext) {
    const post = await Blog.findOrFail(params.id)

    await post.delete()

    return {
      message: 'Post excluído com sucesso!',
      data: post,
    }
  }

  public async update({ params, request }: HttpContext) {
    const body = request.body()

    const post = await Blog.findOrFail(params.id)

    post.title = body.title
    post.description = body.description

    if (post.image != body.image) {
      post.image = !body.image ? post.image : body.image
    }

    await post.save()

    return {
      message: 'Post atualizado com sucesso!',
      data: post,
    }
  }

  public async deleteImage({ params }: HttpContext) {
    const post = await Blog.findOrFail(params.id)
    post.image = ''

    await post.save()

    return {
      message: 'Imagem deletada com sucesso!',
      data: post,
    }
  }
}
