module AuthorizationHelper
  def signed_in_user
    if not authenticated?
      render json: { message: 'Please log in' }, status: :forbidden
    end
  end

  def correct_user
    if not current_user?(@user) and not current_user.admin?
      render json: { message: 'Wrong User' }, status: :forbidden
    end
  end

  def admin_user
    if !authenticated? || !current_user.admin?
      render json: { message: 'Admin only' }, status: :forbidden
    end
  end
end
