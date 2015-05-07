class Api::PostsController < ApplicationController

  def create
    @post = Post.new(posts_params)
    if @post.save
      render json: @post, status: :created, root: false
    else
      render json: @post.errors, status: :unprocessable_entity
    end
  end

  def index
    @posts = Post.all
    render json: @posts
  end

  private

    def posts_params
      params.permit(:user_id, :message)
    end
end
