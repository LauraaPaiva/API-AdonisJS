import type { HttpContext } from '@adonisjs/core/http'
import Blog from '#models/blog'
import Comment from '#models/comment'

export default class CommentsController {
  public async store({ request, response, params }: HttpContext) {
    const body = request.body()
    const blogId = params.blogId

    await Blog.findOrFail(blogId)

    body.blogId = blogId

    const comment = await Comment.create(body)

    response.status(201)

    return {
      message: 'Comentário adicionado com sucesso!',
      data: comment,
    }
  }
}
