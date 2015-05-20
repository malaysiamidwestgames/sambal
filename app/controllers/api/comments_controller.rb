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

  def show
    @comment = Comment.find(params[:id])
    render json: @comment
  end

  def update
    @comment = Comment.find(params[:id])

    if @comment.update_attributes(update_params)
      render json: @comment, status: :updated, root: false
    else
      render json: @comment.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @comment = Comment.find(params[:id])
    @comment.destroy
  end

  private

    def comments_params
      params.permit(:user_id, :post_id, :message)
    end

    def update_params
      params.permit(:message)
    end

end