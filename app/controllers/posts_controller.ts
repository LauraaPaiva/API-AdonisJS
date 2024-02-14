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
}
