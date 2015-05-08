class Api::CommentsController < ApplicationController

  def create
    @comment = Comment.new(comments_params)
    if @comment.save
      render json: @comment, status: :created, root: false
    else
      render json: @comment.errors, status: :unprocessable_entity
    end
  end

  def index
    @comments = Comment.all
    if pid = params[:post_id] 
      @comments = Comment.where(post_id: pid)
    end
    render json: @comments
  end

  private

    def comments_params
      params.permit(:user_id, :post_id, :message)
    end

end