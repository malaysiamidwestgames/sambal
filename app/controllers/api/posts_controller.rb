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

  def userlike
    if userid = params[:user_id]
      @posts = Post.all
      list = []
      @posts.each do |post|
        if post.likes.where("user_id = " + userid) === []
          list << false
        else
          list << true
        end
      end
      render json: list
    end
  end

  private

    def posts_params
      params.permit(:user_id, :message)
    end
    
end