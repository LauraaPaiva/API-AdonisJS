import type { HttpContext } from '@adonisjs/core/http'
import Blog from '#models/blog'
import Comment from '#models/comment'

export default class CommentsController {
  public async store({ request, response, params }: HttpContext) {
    const body = request.body()
    const postId = params.postId

    await Blog.findOrFail(postId)

    body.postId = postId

    const comment = await Comment.create(body)

    response.status(201)

    return {
      message: 'Comentário adicionado com sucesso!',
      data: comment,
    }
  }
}
