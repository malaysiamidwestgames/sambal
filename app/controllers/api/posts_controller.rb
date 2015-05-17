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
    @posts = Post.order(created_at: :desc)
    render json: @posts
  end

  def show
    @post = Post.find(params[:id])
    render json: @post
  end

  def update
    @post = Post.find(params[:id])

    if @post.update_attributes(update_params)
      render json: @post
    else
      render json: @post.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @post = Post.find(params[:id])
    @post.destroy
  end

  def userlike
    if userid = params[:user_id]
      @post = Post.last
      @posts = Post.all
      list = Array.new(@post.id + 1, false);
      @posts.each do |post|
        if post.likes.where("user_id = " + userid) != []
          list[post.id] = true
        end
      end
      render json: list
    end
  end

  def likedpost
    @post = Post.find(params[:id])

    if userid = params[:user_id]
      if @post.likes.where("user_id = " + userid) != []
        render json: true
      else
        render json: false
      end
    end
  end

  private

    def posts_params
      params.permit(:user_id, :message)
    end

    def update_params
      params.permit(:message)
    end
end