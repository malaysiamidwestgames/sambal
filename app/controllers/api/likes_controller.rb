class Api::LikesController < ApplicationController

  def create
    @like = Like.new(likes_params)
    if @like.save
      render json: @like, status: :created, root: false
    else
      render json: @like.errors, status: :unprocessable_entity
    end
  end

  def index
    @likes = Like.all
    if userid = params[:user_id]
      @likes = Like.where(user_id: userid)
    elsif postid = params[:post_id]
      @likes = Like.where(post_id: postid)
    end
    render json: @likes
  end

  def destroy
    @like = Like.where(likes_params)
    @like.destroy_all
  end

  private

    def likes_params
      params.permit(:user_id, :post_id)
    end

  end